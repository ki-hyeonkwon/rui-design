---
title: AI-Optimized Design System 전환 전략 보고서
date: 2026-04-09
status: final
authors: Claude Opus 4.6 (병렬 에이전트 5기 분석 기반)
---

# AI-Optimized Design System 전환 전략 보고서

## 1. Executive Summary

RUI Design은 당근의 Seed Design에서 fork된 디자인 시스템으로, Figma 변수에서 React 컴포넌트까지 이어지는 자동화된 생성 파이프라인을 갖추고 있다. 77개 컴포넌트 스펙이 YAML로 정의되어 있고, MCP 서버 2종, llms.txt 엔드포인트, Claude 스킬 8개가 이미 구현되어 있어 AI 인프라의 기초는 상당히 성숙한 상태다. 그러나 현재 구조는 AI가 코드를 "읽고 따라가는" 데에는 적합하지만, "스스로 컴포넌트를 고르고 판단하는" 데 필요한 핵심 정보가 빠져 있다.

이 보고서는 Google Stitch의 design.md 포맷, Wanted Montage(WDS)의 JSDoc 밀도와 MCP 구조화, Daangn Seed Design의 rootage YAML 파이프라인, 그리고 RUI 내부에서 4개 AI 에이전트가 3차에 걸쳐 토론한 아키텍처 결정문을 교차 분석한 결과다. 다섯 소스에서 도출한 공통 결론은 명확하다. AI가 디자인 시스템을 잘 쓰려면 "무엇이 있는가"(Layer 0-1)보다 "언제 무엇을 써야 하는가"(Layer 2-3)가 구조화되어야 하며, 이 정보는 사람이 산문으로 쓰는 것이 아니라 기계가 파싱할 수 있는 YAML 메타데이터로 정의되고 파이프라인을 통해 자동 생성되어야 한다.

보고서는 이 결론을 바탕으로 7가지 AI 친화 원칙을 제시하고, RUI의 디렉토리 구조 변경안, manifest 스키마, 컴포넌트 문서화 템플릿, 토큰 계층 재정의안을 구체적으로 설계한다. 또한 "컴포넌트 우선 탐색 → 로컬 fallback 허용 → semantic token 강제"라는 단일 의사결정 플로우를 정의하여, AI 에이전트가 기획서를 입력받았을 때 최소 토큰으로 올바른 컴포넌트와 props 값까지 결정할 수 있는 구조를 제안한다.

이 전환의 비즈니스 정당성은 다음과 같다. 77개 컴포넌트의 ai-meta 작성에 컴포넌트당 평균 2시간, 총 약 154시간이 필요하나, variant description 자동 추출로 60%를 절감하면 실질 투자는 약 62시간(약 8인일)이다. 이 투자로 AI 에이전트가 기획서에서 컴포넌트를 자동 선택하고 props까지 결정하게 되면, 컴포넌트 선택-조사-결정에 소요되는 개발 시간(화면당 평균 30분 추정)이 대폭 줄어든다. RUI의 경쟁 우위는 rootage YAML이라는 기존 SSOT 위에 ai-meta를 자연스럽게 편입시킬 수 있는 구조적 이점, Figma sync → rootage → ai-meta → code generation으로 이어지는 end-to-end 자동화 가능성, 그리고 한국어 + 모바일 우선이라는 당근 특화 맥락에서의 AI 학습 데이터 우위에 있다.

마이그레이션은 4단계로 설계했다. Phase 1은 파일럿 3개 컴포넌트에 ai-meta YAML을 작성하고 수동 검증하는 것으로, 2주 안에 완료 가능하다. Phase 2는 77개 전체 컴포넌트로 확장하고 DESIGN.md 자동 생성 및 MCP 도구를 연결하는 단계(6-8주)다. Phase 3는 Generator/Evaluator 분리와 HARD-GATE를 도입하여 AI 생성 코드의 품질을 시스템적으로 보증하는 단계다. Phase 4는 Figma-to-code 전체 파이프라인 자동화와 자연어 → 프로토타입 생성이라는 장기 비전이다. 각 단계에서 가장 큰 리스크는 메타데이터 작성의 인적 비용이며, 이를 완화하기 위해 기존 Figma 문서와 variant description에서 자동 추출하는 전략을 함께 제안한다.

---

## 1-1. 현황 진단: 무엇이 문제이고 어떻게 해결하는가

이 섹션은 보고서의 기술적 분석을 비개발자도 따라갈 수 있도록 "현재 무엇이 문제인지 → 어떤 작업으로 고치는지 → 고치면 무엇이 달라지는지 → 왜 이 판단을 내렸는지"를 표로 정리한 것이다. 모든 수치는 코드베이스를 직접 검색(grep)하거나 5개 병렬 에이전트의 분석에서 실측한 값이다.

### 표 1. 문제 → 개선안 → 기대 효과 → 판단 근거

AI가 디자인 시스템을 사용하는 과정은 크게 네 단계(발견 → 선택 → 생성 → 검증)로 나뉜다. 각 단계에서 현재 RUI가 가진 문제와, 이 보고서가 제안하는 해법을 대응시킨다.

**발견 단계: "AI가 RUI의 존재를 알고, 어디서 시작해야 하는지 찾는 과정"**

| 문제 | 현황 수치 | 개선 작업 | 기대 효과 | 판단 근거 |
|------|----------|----------|----------|----------|
| AI가 RUI를 처음 만났을 때 읽을 진입점이 없다 | 프로젝트 루트에 DESIGN.md 0개 | ai-meta YAML에서 DESIGN.md를 자동 생성하여 루트에 배치 | AI가 첫 접근 시 ~500토큰으로 시스템 전체 규칙과 77개 컴포넌트 목록을 파악 | Google Stitch의 design.md가 업계 표준화 중(58개 브랜드 채택). Cursor, Copilot 등 MCP 미지원 환경에서도 즉시 읽힘 |
| 문서 검색 도구가 있지만 AI에게 연결되지 않았다 | docs-mcp 패키지 구현 완료, .mcp.json에 미등록 | .mcp.json에 1줄 추가로 등록 | AI 에이전트가 즉시 문서 검색, rootage 데이터 조회, 아이콘 검색 가능 | 구현은 이미 완료. 등록 누락은 단순 실수이므로 즉시 수정 가능(5분) |
| IDE에서 컴포넌트를 타이핑해도 용도 설명이 안 뜬다 | @rui/react 전체에서 JSDoc 어노테이션(@description, @see, @link) **0건** | 상위 10개 컴포넌트에 1줄짜리 @description + @see 추가 | Cursor, Copilot 등 MCP 없는 환경에서 자동완성 시 컴포넌트 용도가 바로 표시 | WDS(Wanted Design System)의 JSDoc 밀도가 AI 코드 정확도에 직접 기여한다는 분석(Agent C) |
| fork 이전 이름이 AI 출력을 오염시킨다 | @karrotmarket 참조 **116건, 36파일**. 도구명에 "Seed" 잔존 | 문자열 일괄 치환 + 도구명 리네이밍 | AI가 "@karrotmarket/icon"이나 "Seed Design"을 잘못된 맥락으로 출력하는 현상 제거 | 4개 에이전트 토론에서 "fork 잔여물은 AI 출력 품질의 전제 조건"으로 합의(Agent A) |

**선택 단계: "여러 컴포넌트 중 이 상황에 맞는 것을 고르는 과정"**

| 문제 | 현황 수치 | 개선 작업 | 기대 효과 | 판단 근거 |
|------|----------|----------|----------|----------|
| AI가 "언제 이 컴포넌트를 써야 하는가"를 알 수 없다 | whenToUse/whenNotToUse 어노테이션 **0건** (77개 컴포넌트 전체) | 각 컴포넌트에 ai-meta YAML 작성: whenToUse, whenNotToUse, alternatives, variantGuide | AI가 "버튼이 필요하다"는 요구에 ActionButton vs TextButton vs ToggleButton을 정확히 구분. 목표 일치율 80%+ | 세 레퍼런스 시스템(Seed, WDS, newDs) 모두에서 Layer 2(사용 맥락)가 가장 큰 공백으로 진단됨(Agent A~E 공통) |
| 유사 컴포넌트끼리 혼동된다 (chip 5종, button 4종 등) | 77개 중 혼동 가능 쌍에 대한 비교 정보 **7쌍만** 존재 | ai-meta의 alternatives 필드에 "A 대신 B를 쓸 조건"을 양방향 기록 | chip 계열(Chip, ActionChip, ControlChip, ChipTab, ControlChip) 같은 유사 그룹에서 AI가 올바른 것을 선택 | Agent D: "혼동 가능 쌍의 비교 정보 부재가 AI 오선택의 가장 직접적 원인" |
| 77개 전체 목록을 한 번에 파악할 방법이 없다 | 컴포넌트 인덱스/manifest **미존재** | _index.yaml 작성: id, name, purpose(1줄), category, tags, variants, sizes | AI가 ~500토큰으로 77개 전체를 훑고 후보 3~5개로 좁힘 (점진적 정보 공개) | ChatGPT의 "wide-to-narrow 전달 순서" 제안 + Stitch의 토큰 효율 원칙(Agent A, B) |

**생성 단계: "선택한 컴포넌트로 코드를 작성하거나, 없으면 새로 만드는 과정"**

| 문제 | 현황 수치 | 개선 작업 | 기대 효과 | 판단 근거 |
|------|----------|----------|----------|----------|
| 토큰 사용 규칙이 불일치한다 | 컴포넌트 YAML에서 $color.palette 직접 참조 **273건, 26파일**. hex 하드코딩 존재("#ffffff00" 등) | semantic-first 강제 규칙 + lint rule 도입. 예외(shadow, static-*)는 warning으로 분리 | AI가 새 코드를 작성할 때 palette 직접 참조나 hex 하드코딩을 학습하는 패턴 차단. 토큰 일관성 확보 | Agent D: "AI가 기존 코드에서 palette 직접 참조 패턴을 학습하면 새 컴포넌트에서도 동일하게 우회" |
| 기존에 없는 컴포넌트를 만들 때 규칙이 없다 | fallback 생성 가이드 **미문서화** | 의사결정 플로우에 "로컬 컴포넌트 생성 바운더리" 명시: 허용 5조건 + 금지 4조건 + semantic 토큰 강제 | AI가 임의로 Tailwind 클래스를 쓰거나 외부 라이브러리를 끌어오는 대신, RUI 패턴을 따르는 컴포넌트를 생성 | WDS의 Box+sx 패턴이 암묵적 fallback이지만 미문서화(Agent C). RUI는 이를 명시화하여 반면교사 |

**검증 단계: "생성된 코드가 디자인 시스템 규칙을 지키는지 확인하는 과정"**

| 문제 | 현황 수치 | 개선 작업 | 기대 효과 | 판단 근거 |
|------|----------|----------|----------|----------|
| AI가 만든 코드를 검증할 체계가 없다 | Evaluator 스킬 **0개** (현재 8개 스킬 모두 생성 목적) | Generator/Evaluator 분리 + HARD-GATE(whenNotToUse 위반, semantic 우회, constraint 위반 감지) | 디자인 시스템 위반 코드가 커밋되기 전에 자동 차단 | newDs의 Generator/Evaluator 분리 원칙 + Gemini의 HARD-GATE 제안(Agent A) |
| AI가 잘못 골랐을 때 되돌릴 경로가 없다 | 오선택 피드백/교정 메커니즘 **0건** | STEP 7 "사후 교정" 추가: alternatives 조회 도구 + rui report CLI + 피드백 → ai-meta 개선 사이클 | 오선택이 일회성 실수에 머물지 않고, 시스템 전체의 선택 정확도를 지속적으로 높이는 데이터로 환류 | DevEx 리뷰에서 피드백 루프 1/10(완전 부재)으로 최저 점수. 학습하지 않는 시스템은 정체됨 |

### 표 2. Before / After 한눈 비교

AI 에이전트가 "로그인 화면을 만들어줘"라는 요청을 받았을 때의 경험을 비교한다.

| 단계 | 현재 (Before) | 개선 후 (After) |
|------|--------------|----------------|
| 진입 | DESIGN.md 없음. AGENTS.md, TECH.md, 개별 문서를 돌아다니며 파악 (~3,000토큰 소비) | DESIGN.md 1개 파일로 시스템 원칙 + 컴포넌트 목록 즉시 파악 (~500토큰) |
| 검색 | node_modules의 .d.ts에서 export명만 보임. "ActionButton vs TextButton?" 판단 근거 없음 | _index.yaml에서 purpose/tags로 후보 필터. ai-meta에서 whenToUse 확인 |
| 선택 | variant(brandSolid? neutralSolid?)를 문서 사이트에서 찾아야 함. 오프라인이면 불가 | variantGuide에 "brandSolid = 페이지 주요 CTA, 한 화면 1개" 즉시 확인 |
| 토큰 | 원시값 직접 참조 273건, hex 하드코딩("#ffffff00") 존재. AI가 이 패턴을 학습하여 새 코드에도 복제 | "역할 이름" 토큰만 허용 ($color.fg.neutral 등). 맞는 토큰이 없으면 새 이름을 등록 후 사용. 원시값 참조와 hex 하드코딩은 lint가 자동 차단 |
| 검증 | 검증 없음. 잘못된 variant나 토큰이 그대로 커밋 | Evaluator가 whenNotToUse 위반, palette 직접 참조를 자동 감지하여 PR 반려 |
| 교정 | "잘못 골랐다"를 알아도 대안을 찾을 방법 없음 | alternatives 필드 + suggest_alternative 도구로 즉시 대안 제시. 오선택 보고 → 시스템 개선 |

### 표 3. 작업 우선순위 매트릭스

각 개선 작업을 "효과(세로)"와 "난이도(가로)"로 배치한다. 왼쪽 위가 가장 먼저 해야 할 작업이다.

|  | 난이도: 낮음 (1일 이내) | 난이도: 중간 (1-2주) | 난이도: 높음 (4주+) |
|--|----------------------|---------------------|-------------------|
| **효과: 높음** | docs-mcp 등록 (5분), fork 잔여물 리네이밍 (30분), JSDoc 10개 추가 (반나절) | ai-meta 파일럿 3개 + _index.yaml (2주), variant description 자동 추출 스크립트 (반나절) | ai-meta 77개 전체 작성 (6-8주), DESIGN.md 자동 생성 파이프라인 |
| **효과: 중간** | .cursorrules 템플릿 (1시간), @karrotmarket grep 목록화 (1시간) | recommend_component MCP 도구, suggest_alternative 도구 | JSDoc 자동 주입 파이프라인, llms.txt 선택 가이드 |
| **효과: 장기** | — | semantic-first lint rule, CI 검증 추가 | Evaluator + HARD-GATE, 소비자 프로젝트용 스킬, 피드백 수집 파이프라인 |

읽는 법: **왼쪽 위 칸부터 시작한다.** docs-mcp 등록(5분)과 JSDoc 추가(반나절)는 오늘이라도 할 수 있고, 효과가 즉각적이다. 반면 Evaluator나 피드백 파이프라인은 효과가 크지만 앞선 작업(ai-meta 작성)이 완료되어야 의미가 있으므로 오른쪽 아래에 위치한다.

---

## 2. 소스별 심층 분석 결과

### Agent A: 내부 문서 분석 (토론 보드, 아키텍처 결정문, 3개 AI 보고서)

RUI 내부에서 Claude, Codex, Gemini, ChatGPT 네 에이전트가 2차에 걸쳐 상호 비판하고 3차에서 각각 최종 입장을 정리한 토론 기록과, 이를 종합한 아키텍처 결정문을 분석했다. 이 토론의 가장 의미 있는 산출물은 네 에이전트가 서로 다른 관점에서 출발하면서도 결국 동일한 결론에 수렴했다는 사실이다.

수렴한 합의는 세 가지다. 첫째, YAML이 유일한 SSOT(Single Source of Truth)이고 나머지(DESIGN.md, JSDoc, llms.txt, MCP 응답)는 모두 자동 생성물이어야 한다. 둘째, AI가 컴포넌트를 올바르게 선택하기 위한 핵심 병목은 Layer 2(사용 맥락)의 부재이며, 이를 whenToUse, whenNotToUse, alternatives, variantGuide 필드로 구조화해야 한다. 셋째, 이 메타데이터는 독립화 웨이브가 완료되기 전까지 rootage core schema가 아닌 인접 계층(ai-meta/)에서 안정화해야 한다.

해소되지 않은 쟁점도 있었다. Claude는 fork 잔여물 정리나 docs-mcp 등록 같은 즉시 수정 가능한 결함을 메타데이터 설계와 병렬로 처리해야 한다고 주장했고, Gemini는 데이터 선행 원칙을 들어 메타데이터가 안정화되기 전에는 도구를 확장하지 말아야 한다고 반박했다. ChatGPT는 "정답층 선행 → 구조화 → 자동생성 → 도구 노출"의 순차 모델을 제안했다. 최종 결정문은 이를 3트랙 병렬(Track A: 즉시 결함 수정, Track B: 메타데이터 안정화, Track C: 품질 보증)로 절충했다.

5계층 정보 모델도 도출되었다. Layer 0(토큰 원시값), Layer 1(컴포넌트 메타데이터 — variant, slot, state), Layer 2(사용 맥락 — whenToUse, Do/Don't), Layer 3(결정 근거 — "왜 A가 아니라 B인가"), Layer 4(관계 그래프 — 대체, 조합, 포함 관계). 현재 RUI는 Layer 0-1이 강하고 Layer 2-4가 거의 비어 있다.

### Agent B: Google Stitch design.md 분석

Google Stitch의 design.md는 AI 에이전트가 일관된 UI를 생성하기 위해 프로젝트 루트에 두는 plain-text 마크다운 파일이다. Stitch는 사용자가 프롬프트를 입력하면 design.md의 전체 내용을 Gemini에게 컨텍스트로 전달하여, 디자인 규칙을 준수한 UI를 생성하게 한다. 이 접근법의 핵심은 "LLM이 가장 잘 읽는 포맷은 마크다운"이라는 전제에 있다.

design.md의 표준 구조는 9개 섹션으로 구성된다. Visual Theme & Atmosphere(분위기와 밀도), Color Palette & Roles(시맨틱 색상 이름 + hex + 기능적 역할), Typography Rules(폰트 패밀리, 계층 표, 무게, 행간), Component Stylings(버튼, 카드, 입력 필드의 상태별 스타일), Layout Principles(spacing scale, 그리드, 여백 철학), Depth & Elevation(그림자 시스템, 표면 계층), Do's and Don'ts(디자인 가드레일과 안티패턴), Responsive Behavior(브레이크포인트, 터치 타겟, 축소 전략), Agent Prompt Guide(빠른 색상 참조, 즉시 사용 가능한 프롬프트).

RUI 전환에 시사하는 바는 다음과 같다. 첫째, design.md는 토큰 수준의 값 명세에 집중하며 컴포넌트 내부 props 구조까지는 다루지 않는다. 이는 design.md가 "시스템 전체의 시각적 일관성"을 보장하는 데 최적화되어 있고, "개별 컴포넌트의 올바른 선택과 사용"은 별도 계층이 필요하다는 것을 의미한다. 둘째, "구체적인 값을 쓰라, 모호한 설명은 금지"라는 원칙은 RUI의 메타데이터 설계에도 그대로 적용되어야 한다. "#1A73E8"이지 "신뢰감을 주는 파란색"이 아니듯, whenToUse도 "중요한 액션에 사용"이 아니라 "폼 제출, 결제 확인, 다음 단계 진행 같은 되돌릴 수 없는 주요 동작을 트리거할 때"여야 한다. 셋째, Do's and Don'ts와 Responsive Behavior 섹션은 RUI의 ai-meta YAML에서 dos, donts, responsiveGuidance 필드로 직접 대응된다. 넷째, awesome-design-md 커뮤니티가 58개 브랜드의 DESIGN.md를 수집한 사실은, 이 포맷이 업계 표준으로 자리잡고 있음을 보여준다.

### Agent C: Wanted Montage (WDS) 분석

WDS(Wanted Design System)는 wds-theme → wds-engine → wds/wds-icon/wds-lottie → wds-nextjs의 4계층 웹 패키지와 Android, iOS 별도 저장소를 운영하는 멀티플랫폼 디자인 시스템이다. TypeScript 99% 기반 monorepo에 81개 컴포넌트가 존재하며, Emotion 런타임 엔진과 sx prop을 통한 CSS-in-JS 스타일링을 채택한다. Agent C는 실제 GitHub 저장소의 소스 코드를 직접 분석했다.

AI 관점에서 WDS의 가장 주목할 점은 @wanteddev/wds-mcp라는 전용 MCP 서버 패키지를 공식 제공한다는 사실이다. 이 서버는 9개 도구(list_components, get_component, list_tokens, wds_coding_guidelines, list_icons, get_color_usage, getting_started 등)를 통해 구조화된 API 접근을 제공한다. 특히 list_tokens는 XML 포맷으로 light/dark 두 테마의 resolved value를 동시에 노출하여 LLM이 토큰 이름과 실제 색상값을 한 번에 파악할 수 있다. get_component는 외부 문서 사이트의 HTML을 Cheerio + TurndownService로 파싱하여 마크다운으로 변환한 후 전달하는데, 비필수 DOM 요소(푸터, 데모 컨트롤)를 제거하여 토큰 효율성을 높인다.

Props 구조의 명시성도 높다. Button 컴포넌트를 예로 들면 ButtonVariant = 'solid' | 'outlined', ButtonColor = 'primary' | 'assistive', ButtonSize = 'small' | 'medium' | 'large'로 모든 variant가 string union type으로 완전 정의되어 있다. boolean prop은 상태(disabled, loading), 모드(iconOnly), 레이아웃(fullWidth) 용도가 명확히 구분된다. 다만 disableLoadingPreventEvents처럼 이중 부정 이름이 있어 LLM이 true/false 효과를 반대로 이해할 위험이 존재한다.

토큰 계층은 atomic → semantic 2계층이 명확하다. atomic 층에 13개 색상 팔레트 파일(neutral, blue, red, green 등)이 숫자 키 기반 밝기 스케일(neutral[5] = '#0F0F0F', neutral[99] = '#F7F7F7')로 정의되고, semantic 층에서 primary.normal = atomic.blue[50], label.neutral = atomic.coolNeutral[10]처럼 역할을 부여한다. as const 사용으로 TypeScript가 리터럴 타입을 추론하여 LLM 자동완성이 가능하다. 그러나 component-level 토큰이 별도로 존재하지 않아 컴포넌트 스타일 커스터마이징 지점이 불명확하다.

약점은 세 가지다. 첫째, MCP 서버가 외부 문서 사이트 HTML 크롤링에 의존하여 오프라인이나 사이트 다운 시 get_component 도구가 실패한다. 둘째, 81개 컴포넌트 문서를 한 번에 가져오는 벌크 로딩 도구가 없어 전체 스펙을 컨텍스트에 올리려면 개별 호출이 필요하다. 셋째, fallback 생성 규칙이 명시적으로 문서화되어 있지 않다. Box + sx prop 조합이 사실상의 fallback이지만, "컴포넌트가 없으면 Box로 대체하라"는 지침이 없어 LLM이 다른 라이브러리를 임의로 사용할 가능성이 있다.

RUI에 흡수할 것은 네 가지다. 첫째, WDS 수준의 string union type 명시성을 @rui/react의 public surface에 적용하는 것. 둘째, list_tokens의 resolved value XML 노출 패턴을 rootage 토큰에도 적용하는 것. 셋째, wds_coding_guidelines처럼 MCP 서버에 하드코딩된 가이드라인을 내장하여 외부 URL 의존 없이 항상 접근 가능하게 하는 것. 넷째, Montage의 미비점을 반면교사로 삼아 fallback 생성 규칙을 명시적으로 문서화하고, 벌크 컴포넌트 인덱스(_index.yaml)를 제공하는 것.

### Agent D: Daangn Seed Design 분석

Seed Design은 RUI의 원본 시스템으로, rootage YAML → qvism-preset → css → react의 생성 파이프라인을 공유한다. Agent D는 action-button.yaml 전문(약 300줄)을 깊이 분석하여 다음 핵심 발견을 도출했다.

variant 구조의 명시성은 A+ 수준이다. 모든 variant가 closed enum으로 완전 열거되어 있고, 각 값에 한국어 description이 붙어 있다. LLM이 "brandSolid는 브랜드의 핵심 가치를 전달하며 사용자 간 연결이 일어나는 서비스의 주요 기능에 사용"한다는 것을 스키마 하나만으로 파악할 수 있다. boolean props가 없고 상태(disabled, loading, pressed)를 definitions의 독립 키로 분리한 것도 LLM 친화적이다.

반면 토큰 계층의 일관성에는 문제가 발견되었다. definitions 섹션에서 semantic 토큰($color.fg.neutral)과 palette 직접 참조($color.palette.gray-500)가 혼재하고, hex 하드코딩("#ffffff00")과 px 하드코딩(14px)이 semantic 토큰을 우회한다. 이 불일치는 LLM이 "어느 계층의 토큰을 참조해야 하는가"를 학습할 때 혼란을 준다.

가장 중요한 발견은 constraint의 기계 파싱 불가능성이다. "ghost variant는 brandSolid, neutralSolid, criticalSolid와 함께 사용할 수 없다"는 규칙이 description 자연어에만 존재한다. mutuallyExclusive, requires, conflictsWith 같은 구조적 필드가 없어 LLM이 유효하지 않은 prop 조합을 생성할 수 있다.

또한 fallback 생성 규칙이 공식적으로 문서화되어 있지 않다. react-headless/react 분리 구조와 Primitive 패턴이 "스펙 없는 컴포넌트"의 기초를 제공하지만, AI가 어떤 계층(headless만, CSS만, full stack)을 생성해야 하는지 가이드가 없다.

### Agent E: rui-design-dev 현행 구조 파악

Agent E는 rui-design-dev의 전체 monorepo를 탐색하여 다음 현황을 확인했다.

구조적 규모. 22개 패키지, 77개 rootage 컴포넌트 YAML(토큰 5개 + 컴포넌트 72개), 71개 React styled 컴포넌트, 25개 headless 패키지, 79개 qvism-preset recipe, 11개 토큰 정의 파일(color, gradient, dimension, font-size, font-weight, line-height, radius, shadow, duration, timing-function, collections).

AI 인프라 현황. .mcp.json에 @rui/mcp(Figma 통합)와 playwright만 등록되어 있고, docs-mcp는 미등록이다. llms.txt 엔드포인트는 docs/app/ 내 4개 경로(ai-integration, react, docs 등)에 구현되어 있다. 스킬 8개(check-docs-consistency, create-component, deprecation, dev-figma-v3-migration-plugin, dev-react-headless, migrate-component-docs-from-figma, rui-cli, write-react-component-docs)가 모두 내부 개발용이다. DESIGN.md는 루트에 존재하지 않는다. packages/rootage/ai-meta/ 디렉토리도 아직 생성되지 않았다.

AI 소비 관점의 병목. 컴포넌트 인벤토리 manifest가 없어 AI가 77개 전체 목록을 한 번에 파악할 수 없다. whenToUse/whenNotToUse 어노테이션이 어디에도 없다. TypeScript 타입과 YAML 스키마 간 자동 동기화가 부재하여 드리프트 위험이 있다. variant description은 있지만 constraint가 자연어에만 존재한다. 토큰별 용도 설명이 없어 AI가 적절한 토큰을 선택하기 어렵다.

fork 아티팩트. @karrotmarket/icon-data, @karrotmarket/react-monochrome-icon, @karrotmarket/react-multicolor-icon이 docs와 docs-mcp에 남아 있다. discover_seed_docs라는 도구명에 "Seed"가 잔존한다. 이들은 AI 출력에 잘못된 패키지명을 유발할 수 있다.

---

## 3. AI 친화 디자인 시스템의 7가지 원칙

위 5개 소스의 분석을 교차하여, AI가 디자인 시스템을 정확하고 효율적으로 사용하기 위한 7가지 원칙을 도출한다.

**원칙 1. 단일 원본, 다중 산출물 (Single Source, Multiple Outputs)**

모든 정보의 원천은 하나여야 한다. RUI에서 그 원천은 rootage YAML이다. DESIGN.md, JSDoc, llms.txt, MCP 응답은 이 원천에서 bun generate:all을 통해 자동 생성되어야 한다. 사람이 직접 쓰는 순간 SSOT가 깨지고, 시간이 지나면 코드와 문서 사이에 drift가 발생한다. Google Stitch가 design.md를 "설정 파일처럼 다루라"고 권고하는 이유, WDS의 API JSON 자동 생성이 효과적인 이유, 내부 토론에서 4개 에이전트가 합의한 이유가 모두 이 원칙에 수렴한다.

**원칙 2. 선택 정보와 사용 정보의 분리 (Selection vs. Usage Separation)**

AI가 컴포넌트를 다루는 과정은 두 단계로 나뉜다. "어떤 컴포넌트를 쓸 것인가"(선택)와 "어떻게 쓸 것인가"(사용). 선택 정보(whenToUse, whenNotToUse, alternatives, tags)는 가볍고 검색 가능한 메타데이터여야 하며, 사용 정보(props API, 코드 예제, 접근성 규칙)는 선택이 완료된 후에만 전달되어야 한다. 이 분리가 토큰 소비를 최소화하면서 정확도를 높이는 핵심이다. newDs의 2-Layer 모델, ChatGPT의 "wide-to-narrow 전달 순서", Stitch의 "Component Stylings는 토큰만, 상세는 별도"가 모두 이 원칙의 변주다.

**원칙 3. 값은 구체적으로, 제약은 구조적으로 (Specific Values, Structural Constraints)**

Stitch가 "#1A73E8이지 신뢰감을 주는 파란색이 아니다"라고 강조하듯, 메타데이터의 모든 값은 구체적이어야 한다. whenToUse는 "중요한 액션"이 아니라 "폼 제출, 결제 확인, 다음 단계 진행"이어야 한다. 동시에 constraint("ghost는 brandSolid와 함께 쓸 수 없다")는 자연어가 아니라 기계 파싱 가능한 필드(mutuallyExclusive, requires, conflictsWith)로 표현되어야 한다. Agent D의 분석에서 발견된 바와 같이, description 텍스트에만 존재하는 제약은 LLM이 soft suggestion으로 해석하여 위반할 위험이 크다.

**원칙 4. 관계 그래프의 명시적 표현 (Explicit Relationship Graph)**

77개 컴포넌트 중 혼동 가능한 쌍(ActionButton vs TextButton vs ExtendedActionButton, Chip vs ActionChip vs ControlChip vs ChipTab)의 선택 기준이 각 컴포넌트의 alternatives 필드에 양방향으로 기록되어야 한다. 내부 보고서에서 "48개 컴포넌트 중 7쌍만 비교 정보가 있다"고 지적된 바와 같이, 관계 정보의 부재가 AI의 오선택을 유발하는 가장 직접적인 원인이다. 이 관계 그래프는 MCP의 recommend_component 도구가 "A 대신 B를 쓰세요, 왜냐하면..."이라고 응답하기 위한 데이터 기반이 된다.

**원칙 5. Semantic 토큰 강제, Primitive 직접 참조 금지 (Semantic Token Enforcement)**

Agent D의 분석에서 progressCircle.trackColor가 $color.palette.gray-500을 직접 참조하고, variant=ghost에서 "#ffffff00"이 하드코딩된 사례가 발견되었다. AI가 이런 패턴을 학습하면 새 컴포넌트 생성 시에도 primitive를 직접 박게 된다. semantic 토큰을 1순위로 사용하고, 없으면 기존 규칙에 맞는 새 semantic 토큰을 만든 후 그것을 사용하는 원칙을 enforce해야 한다. lint rule로 자동 검증하는 것이 이상적이다.

**원칙 6. 점진적 정보 공개 (Progressive Disclosure)**

AI에게 77개 컴포넌트의 YAML 전문을 한 번에 제공하면 수만 토큰이 소비된다. 대신 "컴포넌트 목록 + 1줄 정의"(약 500토큰) → "선택된 컴포넌트의 ai-meta"(약 200토큰) → "rootage 스펙 전문"(약 800토큰) → "코드 예제"(약 300토큰) 순서로 좁혀가야 한다. 이 순서는 MCP 도구의 recommend_component → get_component_meta → get_component_spec 호출 순서와 일치해야 한다.

**원칙 7. 생성 결과의 시스템적 검증 (Systematic Verification)**

AI가 컴포넌트를 선택하고 코드를 생성한 후, 그 결과가 디자인 시스템의 규칙을 준수하는지 검증하는 별도의 Evaluator가 필요하다. Generator와 Evaluator를 분리하고, "whenNotToUse 규칙 위반", "존재하지 않는 variant 사용", "semantic 토큰 우회" 같은 조건을 HARD-GATE로 강제하여 위반 시 커밋을 반려해야 한다. 이는 newDs의 Generator/Evaluator 분리 원칙과 Gemini가 제안한 HARD-GATE 패턴에서 착안한 것이다.

---

## 4. rui-design-dev에 적용할 구체적 변경안

### 4.1 디렉토리 구조 변경

현재(Before):
```
packages/rootage/
  components/           # 77개 ComponentSpec YAML
  color.yaml            # 토큰 정의
  dimension.yaml
  ...
```

변경 후(After):
```
packages/rootage/
  components/           # 77개 ComponentSpec YAML (기존 유지)
  ai-meta/              # [신규] 컴포넌트 선택 메타데이터
    action-button.yaml
    checkbox.yaml
    dialog.yaml
    ...
    _index.yaml         # [신규] 전체 컴포넌트 인덱스
  color.yaml
  dimension.yaml
  ...
```

프로젝트 루트:
```
rui-design-dev/
  DESIGN.md             # [신규, 자동 생성] AI 진입점 요약본
  ...
```

### 4.2 추가해야 할 manifest/index 파일의 스키마

**_index.yaml (컴포넌트 인덱스)**

이 파일은 AI가 77개 컴포넌트 중 후보를 좁히기 위해 가장 먼저 읽는 인덱스다. 최소 토큰으로 최대 정보를 전달하는 것이 목적이다.

```yaml
kind: ComponentIndex
metadata:
  id: component-index
  name: RUI Component Index
  version: "1.0.0"
  generatedAt: "2026-04-09T00:00:00Z"
data:
  components:
    - id: action-button
      name: Action Button
      purpose: "사용자가 즉각적인 동작을 실행할 때 쓰는 버튼"
      category: action
      tags: [action, cta, form, submit]
      variants: [brandSolid, neutralSolid, neutralWeak, criticalSolid, neutralOutline, brandOutline, ghost]
      sizes: [xsmall, small, medium, large]
      hasHeadless: false

    - id: text-button
      name: Text Button
      purpose: "시각적 강조 없이 텍스트만으로 보조 액션을 표현하는 버튼"
      category: action
      tags: [action, secondary, link-like]
      variants: [brand, neutral, critical, neutralSubtle]
      sizes: [small, medium, large]
      hasHeadless: false

    - id: checkbox
      name: Checkbox
      purpose: "사용자가 하나 이상의 선택지를 켜거나 끌 때 쓰는 컨트롤"
      category: selection
      tags: [selection, toggle, form, multiple-choice]
      variants: [square, round]
      sizes: [small, medium, large]
      hasHeadless: true

    # ... 77개 전체
```

**ai-meta/{component-id}.yaml (컴포넌트 선택 메타데이터)**

아키텍처 결정문에서 합의된 스키마를 기반으로, Agent D의 constraint 분석과 Stitch의 Do's/Don'ts 패턴을 반영하여 확장한다.

```yaml
kind: ComponentAIMeta
metadata:
  id: action-button
  name: Action Button
data:
  whenToUse:
    - "폼 제출, 결제 확인, 다음 단계 진행 같은 되돌릴 수 없는 주요 동작을 트리거할 때"
    - "페이지에서 가장 중요한 행동(CTA)을 시각적으로 강조할 때"
  whenNotToUse:
    - "단순 페이지 이동에는 TextButton 또는 LinkContent 사용"
    - "토글 동작에는 ToggleButton 사용"
    - "선택지 제시에는 ActionChip 또는 ControlChip 사용"
  alternatives:
    - component: text-button
      when: "시각적 강조가 필요 없는 보조 액션"
    - component: extended-action-button
      when: "아이콘과 부가 설명이 함께 필요한 액션"
    - component: fab
      when: "화면 위에 떠 있는 주요 플로팅 액션"
  dos:
    - "한 화면에 brandSolid variant는 최대 1개만 사용한다"
    - "layout=iconOnly 사용 시 반드시 aria-label을 제공한다"
    - "비활성 상태에서는 disabled prop을 명시적으로 설정한다"
  donts:
    - "CTA가 아닌 보조 액션에 brandSolid를 사용하지 않는다"
    - "ghost variant를 brandSolid, criticalSolid와 나란히 배치하지 않는다"
    - "xsmall size에 긴 텍스트를 넣지 않는다"
  variantGuide:
    variant:
      brandSolid: "페이지의 주요 행동(CTA). 한 화면에 1개만 권장. 브랜드 색상으로 강하게 강조"
      neutralSolid: "대부분의 화면에서 기본 CTA. brandSolid보다 시각적 무게가 낮음"
      neutralWeak: "보조 행동. CTA 옆에 배치하여 계층 구분"
      criticalSolid: "삭제, 초기화 같은 파괴적 동작. 빨간색 경고 의미"
      neutralOutline: "테두리만 있는 보조 버튼. neutralWeak보다 더 경량"
      brandOutline: "브랜드 색상 테두리. brandSolid의 보조 버전"
      ghost: "배경 없는 투명 버튼. 리스트 항목 내부 등 최소 시각 무게가 필요한 곳"
    size:
      xsmall: "매우 좁은 공간. 인라인 액션, 테이블 셀 내부"
      small: "보조 액션, 모달 내부 버튼"
      medium: "모바일 기본 사이즈. 대부분의 경우 이 사이즈 사용"
      large: "데스크톱에서 허용. 페이지 주요 CTA에 한정"
  constraints:
    mutuallyExclusive:
      - variants: [neutralOutline, brandOutline]
        withVariants: [brandSolid, neutralSolid, criticalSolid]
        context: "동일 컨테이너 내 시각적 무게 충돌"
        severity: warning
    requires:
      - condition: "layout=iconOnly"
        requirement: "aria-label 필수"
        severity: error
  responsiveGuidance:
    mobile: "size=medium 기본. brandSolid CTA는 화면 하단 고정(sticky) 권장"
    tablet: "size=medium 유지. 가로 모드에서 버튼 그룹 좌우 정렬 허용"
    desktop: "size=large 허용. 버튼 그룹은 우측 정렬"
    foldable: "inner 화면은 desktop 규칙, outer 화면은 mobile 규칙 적용"
    breakpoints:
      sm: "0-599px (모바일)"
      md: "600-1023px (태블릿)"
      lg: "1024px+ (데스크톱)"
  motionGuidance:
    enterAnimation: "duration.color-transition 사용. opacity 0→1 + translateY 8→0"
    exitAnimation: "duration.color-transition 사용. opacity 1→0"
    reducedMotion: "prefers-reduced-motion 시 모든 애니메이션 비활성화. opacity 전환만 유지"
  contrastNotes:
    brandSolid: "bg.brand-solid 위 static-white 텍스트. WCAG AA 4.5:1 이상 보장"
    criticalSolid: "bg.critical-solid 위 static-white 텍스트. 동일 기준"
    ghost: "투명 배경이므로 부모 컨테이너의 배경색에 따라 대비 검증 필요"
  darkModeTokenRule: "theme-light 값과 theme-dark 값이 동일 semantic 역할을 유지해야 함. brand-solid는 양쪽 테마에서 모두 가장 강한 CTA 배경이어야 한다"
  a11yNotes:
    - "최소 터치 타겟: 44x44px (xsmall size는 패딩으로 보정)"
    - "색상 대비: WCAG AA 4.5:1 이상"
    - "로딩 상태에서 aria-busy=true 설정"
    - "disabled 상태에서 aria-disabled=true, tabIndex=-1"
```

### 4.3 컴포넌트 문서화 템플릿 (LLM-readable format)

자동 생성되는 DESIGN.md의 컴포넌트 섹션 형식:

```markdown
### Action Button

사용자가 즉각적인 동작을 실행할 때 쓰는 버튼.

**사용 시점**: 폼 제출, 결제 확인, 다음 단계 진행 같은 주요 동작 트리거.
**비사용 시점**: 단순 페이지 이동(→ TextButton), 토글(→ ToggleButton), 선택지 제시(→ ActionChip).

| Variant | 용도 | 제한 |
|---------|------|------|
| brandSolid | 페이지 주요 CTA | 한 화면 1개 |
| neutralSolid | 일반 CTA | - |
| neutralWeak | 보조 액션 | CTA 옆 배치 |
| criticalSolid | 파괴적 동작 | 삭제/초기화 한정 |
| ghost | 최소 무게 | brandSolid 옆 금지 |

Size: xsmall, small, **medium**(기본), large(데스크톱).
Layout: withText(기본), iconOnly(aria-label 필수).
```

### 4.4 토큰 계층 재정의안

현재 RUI의 토큰 계층에서 발견된 불일치를 해소하기 위한 규칙:

**계층 정의**

```
Primitive (참조 금지)     → $color.palette.*, $dimension.x*의 raw 값
Semantic (1순위 사용)     → $color.fg.*, $color.bg.*, $color.stroke.*
                          → $radius.*, $shadow.*, $duration.*, $timing-function.*
Component (자동 생성)     → ComponentSpec definitions에서 semantic 토큰을 참조
```

**강제 규칙**

1. ComponentSpec definitions에서 $color.palette.* 직접 참조 금지. 적절한 semantic 토큰이 없으면 새로 정의한 후 참조한다.
2. hex 하드코딩("#ffffff00" 등) 금지. $color.bg.transparent 같은 semantic 토큰으로 대체한다.
3. px 하드코딩(14px, 22px 등) 금지. $dimension.x* 또는 새 dimension 토큰으로 대체한다.
4. 새 semantic 토큰 생성 시 기존 네이밍 규칙을 따른다: $color.{category}.{semantic-name}[-{state}].

**허용되는 예외 (severity: warning)**

다음 경우는 lint rule에서 error가 아닌 warning으로 처리한다. 팀 리뷰를 거쳐 예외 사유를 주석으로 남긴다.

- shadow 토큰 정의 내부의 rgba hex: $shadow.* 토큰 자체가 primitive 수준이므로 내부 hex 참조를 허용한다.
- $color.palette.static-* 계열: static-white, static-black은 테마 불변 값이므로 semantic 매핑 없이 직접 참조를 허용한다.
- opacity 변형: $color.palette.*-alpha-* 계열은 semantic 토큰이 아직 정의되지 않은 경우 직접 참조를 허용하되, semantic 토큰 생성을 권장한다.

---

## 5. AI Agent가 따라야 할 의사결정 플로우

다음은 R1(컴포넌트 우선, 로컬 fallback 허용), R2(최소 토큰으로 정확한 컴포넌트 선정), R3(UX 보존을 위한 신규 UI 생성 룰), R4(Semantic-first 토큰 사용 원칙)을 포괄하는 단일 통합 플로우다.

```
[기획서/요구사항 입력]
        │
        ▼
┌─────────────────────────────────┐
│  STEP 1. 컴포넌트 인덱스 조회   │  ← _index.yaml 읽기 (~500 토큰)
│  purpose, tags로 후보 3~5개 필터 │
└───────────────┬─────────────────┘
                │
        ┌───────┴───────┐
        │               │
   후보 있음         후보 없음
        │               │
        ▼               ▼
┌───────────────┐  ┌────────────────────────────┐
│ STEP 2.       │  │ STEP 2-F. Fallback 판단     │
│ ai-meta 조회  │  │                              │
│ (~200토큰/개) │  │ Q: 기존 컴포넌트의 조합으로  │
│ whenToUse,    │  │    해결 가능한가?             │
│ alternatives  │  │                              │
│ 확인          │  │ YES → 컴포넌트 조합으로 구현  │
│               │  │ NO  → STEP 2-F-NEW로 이동    │
└───────┬───────┘  └──────────────┬─────────────┘
        │                         │
        ▼                         ▼
┌───────────────┐  ┌────────────────────────────┐
│ STEP 3.       │  │ STEP 2-F-NEW.               │
│ 최적 컴포넌트 │  │ 로컬 컴포넌트 생성 바운더리  │
│ 확정          │  │                              │
│               │  │ 허용 조건 (모두 충족):        │
│ whenNotToUse  │  │ ① 기존 77개 중 대체 불가     │
│ 에 해당하면   │  │ ② react-headless + Primitive │
│ 대안으로 교체 │  │   패턴을 따름                 │
│               │  │ ③ semantic 토큰만 사용        │
│               │  │ ④ 네이밍이 기존 kebab-case    │
│               │  │   + 형용사-명사 패턴 준수     │
│               │  │ ⑤ AGENTS.md의 "Ask first:     │
│               │  │   새 패키지 추가"에 해당하므로 │
│               │  │   사전 승인 필요              │
│               │  │                              │
│               │  │ 금지 조건 (하나라도 해당):     │
│               │  │ ✗ primitive 토큰 직접 사용    │
│               │  │ ✗ hex/px 하드코딩             │
│               │  │ ✗ 기존 컴포넌트와 기능 중복   │
│               │  │ ✗ rootage YAML 스펙 없이 구현 │
└───────┬───────┘  └──────────────┬─────────────┘
        │                         │
        ▼                         ▼
┌─────────────────────────────────────────────────┐
│  STEP 4. Variant/Props 결정                      │
│                                                   │
│  rootage ComponentSpec의 variants 섹션에서        │
│  ai-meta의 variantGuide를 참조하여:               │
│  ① 기획서의 맥락(CTA? 보조? 파괴적?)으로          │
│     variant 결정                                  │
│  ② 디바이스(모바일/데스크톱)로 size 결정           │
│  ③ 콘텐츠 유무로 layout 결정                      │
│  ④ constraints 위반 여부 검증                     │
└───────────────────────┬─────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│  STEP 5. 토큰 결정 (R4 Semantic-first)           │
│                                                   │
│  ┌─────────────────────────────────────┐          │
│  │ 필요한 스타일 값이 있는가?          │          │
│  └──────────┬──────────────────────────┘          │
│        ┌────┴────┐                                │
│   기존 semantic  기존 semantic                     │
│   토큰 존재      토큰 없음                         │
│        │              │                           │
│        ▼              ▼                           │
│   그 토큰 사용   ┌──────────────────┐             │
│                  │ primitive 토큰에서│             │
│                  │ 새 semantic 토큰  │             │
│                  │ 정의 후 사용     │             │
│                  │                  │             │
│                  │ 규칙:            │             │
│                  │ ① 기존 $color.   │             │
│                  │   {cat}.{name}   │             │
│                  │   네이밍 준수    │             │
│                  │ ② theme-light,   │             │
│                  │   theme-dark 값  │             │
│                  │   모두 정의      │             │
│                  │ ③ rootage YAML에 │             │
│                  │   등록 후        │             │
│                  │   generate:all   │             │
│                  └──────────────────┘             │
│                                                   │
│  ※ primitive 직접 참조 절대 금지                   │
│  ※ hex/px 하드코딩 절대 금지                       │
└───────────────────────┬─────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│  STEP 6. UX 적합성 검증 (R3)                     │
│                                                   │
│  "UX에 어긋나는 상황"의 판단 기준:                │
│  ① 터치 타겟 44px 미만                            │
│  ② WCAG AA 색상 대비 미달                         │
│  ③ 모바일에서 large size 강제 사용                │
│  ④ 한 화면에 동일 시각 무게의 CTA 3개 이상        │
│  ⑤ 파괴적 동작에 비파괴적 variant 사용            │
│  ⑥ 컴포넌트의 원래 용도와 맥락 불일치             │
│                                                   │
│  위반 시 허용되는 대응:                            │
│  A. 다른 variant/size로 교체                      │
│  B. 다른 기존 컴포넌트로 교체                     │
│  C. 기존 컴포넌트를 조합하여 해결                 │
│  D. [최후 수단] 로컬 컴포넌트 생성                │
│     (STEP 2-F-NEW의 바운더리 준수)                │
│                                                   │
│  ※ "새 디자인이 필요하다"는 판단 자체를           │
│     Evaluator가 검증해야 한다                     │
└───────────────────────┬─────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│  STEP 7. 사후 교정 및 피드백 (Post-correction)   │
│                                                   │
│  AI 또는 개발자가 선택 오류를 인지한 경우:        │
│                                                   │
│  ① alternatives 조회                              │
│     → ai-meta의 alternatives 필드에서             │
│       "이 컴포넌트 대신 쓸 수 있는 것" 확인       │
│     → MCP: suggest_alternative(component_id)     │
│                                                   │
│  ② 오선택 보고                                    │
│     → `rui report wrong-component` CLI 명령      │
│     → GitHub issue 템플릿 (ds-feedback label)    │
│     → 보고 데이터: 시나리오, 선택된 컴포넌트,     │
│       올바른 컴포넌트, 판단 근거                  │
│                                                   │
│  ③ 피드백 → ai-meta 개선 사이클                   │
│     → 월 1회 오선택 보고를 집계하여                │
│       whenToUse/whenNotToUse/alternatives를       │
│       개선한다                                    │
│     → 반복 오선택 패턴이 발견되면 해당            │
│       컴포넌트의 ai-meta를 즉시 업데이트          │
│                                                   │
│  ※ 피드백 루프가 없으면 ai-meta는 정적 문서에     │
│     머물고, 실제 사용 패턴과 괴리가 벌어진다      │
└─────────────────────────────────────────────────┘
```

**R3에서 "허용 가능한 신규 UI의 형태"**

AI가 디자인 시스템 외부에서 새 UI를 생성할 때 지켜야 하는 형태적 제약은 다음과 같다.

첫째, 구조적 제약. react-headless 패키지가 제공하는 로직 훅(useControllableState, useCheckbox, useDialog 등)을 우선 사용한다. headless 로직이 없는 단순 레이아웃 컴포넌트는 Primitive 기반으로 만든다. forwardRef와 displayName을 반드시 설정한다.

둘째, 스타일 제약. 모든 색상은 $color.fg.*, $color.bg.*, $color.stroke.* 계열의 semantic 토큰으로 표현한다. spacing은 $dimension.x* 토큰을 사용한다. radius, shadow, duration, timing-function도 기존 토큰을 참조한다. 새 토큰이 필요하면 rootage YAML에 추가하고 generate:all을 실행한 후 사용한다.

셋째, 네이밍 제약. 파일명은 kebab-case, 컴포넌트명은 PascalCase. 기존 컴포넌트와 기능이 겹치면 생성하지 않는다.

**R4 토큰 의사결정 트리 (의사코드)**

```
function resolveToken(needed_style):
    semantic = findSemanticToken(needed_style)
    if semantic exists:
        return semantic                    # 1순위: 기존 semantic 토큰

    primitive = findPrimitiveToken(needed_style)
    if primitive exists:
        new_semantic = createSemanticToken(
            name = deriveSemanticName(needed_style),
            value_light = primitive.theme_light,
            value_dark = primitive.theme_dark,
            naming_rule = "$color.{category}.{semantic-name}"
        )
        registerInRootageYAML(new_semantic)
        run("bun generate:all")
        return new_semantic                # 2순위: primitive → 새 semantic 생성

    ERROR("primitive 토큰으로도 표현 불가. 디자인 재검토 필요")
    # ※ primitive 직접 사용은 어떤 경우에도 금지
```

---

## 6. 단계별 마이그레이션 로드맵

### Phase 1: 파일럿 검증 (2주)

목표: ai-meta 스키마의 현실성을 3개 컴포넌트로 검증하고, variant description 자동 추출 스크립트를 만든다.

산출물:
- packages/rootage/ai-meta/action-button.yaml, checkbox.yaml, dialog.yaml (수동 작성)
- packages/rootage/ai-meta/_index.yaml (파일럿 3개만 포함)
- variant description → variantGuide 자동 추출 스크립트 (Phase 2 가속용)
- 수동 작성한 DESIGN.md 초안 (자동 생성은 Phase 2로 이동)

병렬 작업 (Track A):
- docs-mcp를 .mcp.json에 등록
- discover_seed_docs → discover_rui_docs 리네이밍
- @karrotmarket/* 참조 정리 (36개 파일)
- llms.txt 배포 검증 테스트 추가
- .cursorrules 템플릿 작성 (Non-MCP 환경 즉시 지원)

복합 컴포넌트 전략: 부모 컴포넌트(예: checkbox, dialog)만 ai-meta를 작성한다. 하위 파트(checkbox-group, dialog 내부 서브컴포넌트)는 부모 ai-meta의 관련 섹션에서 참조하며, 독립 ai-meta를 작성하지 않는다. 77개 YAML 중 실제 ai-meta 작성 대상은 부모 컴포넌트 약 45-50개로 추정된다.

검증 방법:
- 고정 시나리오 3개(로그인 폼, 설정 토글, 확인 모달)를 정의하고, AI 에이전트에 temperature=0으로 3회 반복 실행한다.
- 파일럿 3개 컴포넌트가 올바르게 선택되고 variant가 지정되는지 golden file과 비교한다.
- 같은 시나리오를 ai-meta 없이 실행한 baseline 결과와 A/B 비교한다.

### Phase 2: 전체 확장 + 자동 생성 + MCP 연결 (6~8주)

목표: 전체 컴포넌트의 ai-meta를 작성하고, 자동 생성 파이프라인과 MCP 도구를 연결한다. 비용 추정: 약 45-50개 부모 컴포넌트 x 2시간 = 90-100시간. Phase 1의 자동 추출 스크립트로 variantGuide 초안을 일괄 생성하면 실질 투자는 약 40-50시간(~6인일)으로 절감된다.

산출물:
- packages/rootage/ai-meta/ 에 45-50개 부모 컴포넌트 YAML 완성
- _index.yaml에 77개 전체 인덱스 (부모+하위 모두 포함)
- bun generate:all에 ai-meta → DESIGN.md 자동 생성 스텝 추가
- @rui/react JSDoc에 whenToUse/whenNotToUse 자동 주입
- llms.txt 선택 가이드 섹션 자동 생성
- docs-mcp에 recommend_component, get_component_guidance, suggest_alternative 도구 추가
- 기존 스킬 업데이트: create-component 스킬이 새 컴포넌트 생성 시 ai-meta도 함께 생성하도록 수정. deprecation 스킬이 ai-meta에 deprecated 플래그를 추가하도록 수정.

메타데이터 작성 가속 전략:
- Phase 1에서 만든 자동 추출 스크립트로 variantGuide 초안을 77개 일괄 생성한다.
- Figma 문서 레이어에서 Do/Don't 이미지의 캡션을 추출하여 dos/donts 초안으로 활용한다.
- 유사 컴포넌트 쌍(button 계열 5개, chip 계열 4개, sheet 계열 3개)을 그룹으로 묶어 alternatives를 일괄 작성한다.

검증 방법:
- 10가지 UI 시나리오(로그인, 설정, 리스트, 폼, 모달, 바텀시트, 검색, 프로필, 알림, 에러)를 golden file로 정의한다.
- 각 시나리오를 temperature=0으로 3회 반복 실행하여 컴포넌트 선택 재현성을 확인한다.
- RUI 팀 디자이너 2명 + 프론트엔드 개발자 2명으로 구성된 4인 패널이 10가지 시나리오의 "정답"을 사전 합의한다. AI 선택과의 일치율 80% 이상을 목표로 한다.
- MCP 도구의 응답 시간이 500ms 이하인지 확인한다.

### Phase 3: 품질 보증 체계 (4주)

목표: AI 생성 코드의 디자인 시스템 준수를 시스템적으로 보장한다.

산출물:
- Evaluator 스킬: whenNotToUse 위반 감지, semantic 토큰 우회 감지, constraint 위반 감지
- HARD-GATE: "rootage 스펙 없이 컴포넌트 생성 금지", "테스트 미통과 시 PR 생성 금지"
- 소비자 프로젝트용 스킬: "@rui/* 컴포넌트로 화면 구성하기"
- lint rule: ComponentSpec definitions에서 primitive 직접 참조 시 에러 (static-*, shadow 내부 hex는 warning)
- CI 파이프라인에 ai-meta YAML ↔ DESIGN.md 일치 검증 추가
- 오선택 피드백 수집 파이프라인: rui report CLI + GitHub issue 자동 분류

검증 방법:
- 의도적으로 규칙을 위반하는 코드 10건을 생성하고 Evaluator가 모두 감지하는지 확인한다.
- 소비자 프로젝트에서 AI 에이전트가 RUI 컴포넌트를 사용하여 화면을 구성하는 end-to-end 시나리오를 실행한다.

### Phase 4: End-to-End 비전 (장기)

목표: Figma 디자인에서 프로덕션 코드까지 AI가 자동 생성하는 전체 파이프라인을 완성한다.

비전:
- Figma sync → rootage YAML 갱신 → ai-meta 자동 업데이트 트리거 → DESIGN.md/JSDoc/llms.txt 재생성의 완전 자동화
- PM이 자연어로 "장바구니에서 결제까지의 플로우를 만들어줘"라고 하면 AI가 RUI 컴포넌트를 조합한 작동하는 프로토타입을 생성
- Lynx 프레임워크 지원 (llms.txt config에 이미 lynx 섹션이 존재)
- 화면 유형별 컴포지션 레시피 라이브러리 (리스트, 폼, 모달, 프로필 등)
- ai-meta 스키마가 업계 표준으로 확산되어 다른 디자인 시스템도 채택

이 단계는 Phase 1-3의 결과를 관찰한 후 구체적 일정과 범위를 결정한다.

### 운영 프로세스

ai-meta 77개 파일의 지속적 유지보수를 위한 프로세스를 정의한다.

소유권: 각 ai-meta 파일의 소유자는 해당 컴포넌트의 디자인 담당자와 프론트엔드 담당자가 공동으로 맡는다. 소유자가 불명확한 컴포넌트는 디자인 시스템 팀이 기본 소유자가 된다.

업데이트 트리거:
- rootage ComponentSpec에 variant가 추가/제거되면, CI가 해당 ai-meta의 variantGuide가 동기화되었는지 검증한다. 미동기화 시 PR에 warning 코멘트를 자동 추가한다.
- bun figma:sync 실행 후 rootage YAML이 변경되면, 변경된 컴포넌트의 ai-meta 검토를 담당자에게 자동 알림한다.
- 분기 1회 오선택 피드백 데이터를 집계하여 whenToUse/whenNotToUse를 개선한다.

디자이너 입력 방식: 디자이너가 YAML을 직접 작성하는 것은 비현실적이다. 대신 다음 경로를 제공한다.
- 단기: 스프레드시트(whenToUse, whenNotToUse, dos, donts 칼럼) → YAML 변환 스크립트
- 중기: Figma 플러그인에서 컴포넌트 문서 레이어의 "When to use" 섹션을 ai-meta로 자동 추출
- 장기: 웹 대시보드에서 컴포넌트별 메타데이터를 편집하고 PR을 자동 생성

Core schema 편입 기준: Phase 2 완료 후, 다음 조건을 모두 충족하면 ai-meta를 rootage core schema에 편입한다. (1) ai-meta 스키마 필드에 6개월간 breaking change가 없었을 것, (2) 독립화 웨이브가 완료되었을 것, (3) 생성 파이프라인이 안정적으로 동작할 것.

---

## 7. 리스크 및 트레이드오프

**리스크 1: 메타데이터 작성의 인적 비용.** 77개 컴포넌트 각각에 whenToUse, whenNotToUse, alternatives, variantGuide, dos, donts, constraints, responsiveGuidance, a11yNotes를 작성하는 것은 상당한 노동이다. variant description에서 자동 추출하는 전략으로 완화할 수 있지만, 최종 검수는 디자이너와 개발자가 해야 한다. 이 비용을 과소평가하면 Phase 2가 지연된다.

**리스크 2: 메타데이터 drift.** ai-meta YAML이 별도 파일로 존재하므로, rootage core schema가 변경될 때 ai-meta를 함께 업데이트하지 않으면 불일치가 발생한다. 이를 완화하기 위해 CI에서 ai-meta의 component id가 rootage components/에 존재하는지 검증하는 테스트를 추가해야 한다. 장기적으로는 독립화 완료 후 core schema에 편입하여 단일 파일로 관리하는 것이 이상적이다.

**리스크 3: 과도한 구조화의 역효과.** constraint를 너무 세밀하게 정의하면 AI의 창의적 조합이 불필요하게 제한될 수 있다. "ghost는 brandSolid 옆에 놓지 마라"는 규칙이 특정 맥락에서는 오히려 의도된 디자인일 수 있다. constraint의 강도를 error(절대 금지)와 warning(권장하지 않음)으로 분리하는 것이 필요하다.

**리스크 4: DESIGN.md 자동 생성의 품질.** YAML에서 마크다운으로 변환할 때 자연어의 자연스러움이 떨어질 수 있다. 생성 템플릿의 품질에 투자해야 하며, 초기에는 생성 결과를 사람이 검토하여 템플릿을 개선하는 피드백 루프가 필요하다.

**리스크 5: 독립화 미완료와의 충돌.** RUI는 Seed Design에서 fork한 후 독립화 웨이브가 진행 중이다. ai-meta 작업이 독립화 작업과 병렬로 진행되면서 merge conflict가 발생할 수 있다. ai-meta는 components/ 디렉토리와 별도 경로(ai-meta/)에 있으므로 물리적 충돌은 낮지만, 컴포넌트 이름 변경이나 삭제 시 동기화가 필요하다.

**트레이드오프: 인접 계층 vs core schema.** ai-meta를 rootage core schema에 즉시 넣으면 SSOT가 완벽하지만 독립화 리스크가 증가한다. 인접 계층에 두면 drift 리스크가 있지만 실험 비용이 낮다. 현재 상황에서는 인접 계층이 올바른 선택이며, Phase 2 완료 후 편입 여부를 재판단해야 한다.

**리스크 6: 과도기 DX 열위.** Phase 1-2가 완료되기 전까지(최대 10주) 소비자 개발자의 AI 경험은 현재 수준에 머문다. 현재 @rui/react 전체에서 @description, @see, @link 같은 JSDoc 어노테이션이 거의 없고, DESIGN.md도 존재하지 않으며, docs-mcp도 미등록이다. 이 과도기 동안 shadcn/ui(학습 데이터에 대량 존재)나 Chakra UI(풍부한 문서) 대비 RUI의 AI DX가 열등하다는 사실을 인정하고, Quick Wins로 과도기 DX를 최대한 끌어올려야 한다.

**리스크 7: 오프라인 의존성.** docs-mcp의 fetch.ts가 https://rui-design.io에 HTTP 요청으로 데이터를 가져오는 구조다. 오프라인이거나 사이트가 다운되면 MCP 도구 전체가 실패한다. WDS에 대해 동일한 약점을 지적했으면서 RUI 자체도 같은 문제를 갖고 있다. 패키지 내 정적 메타데이터 번들(오프라인 fallback)을 Phase 2에서 검토해야 한다.

**트레이드오프: 즉시 수정 vs 데이터 선행.** fork 잔여물 정리와 docs-mcp 등록은 메타데이터 설계와 무관한 즉시 수정 가능한 결함이다. Gemini의 "데이터 선행" 원칙은 맥락에 따라 옳지만, 코드 한 줄로 끝나는 결함 수정을 대규모 콘텐츠 작성 완료까지 대기시키는 것은 비합리적이다. 본 보고서는 Track A(즉시 수정)와 Track B(메타데이터)의 병렬 진행을 권장한다.

---

## 8. 즉시 실행 가능한 Quick Wins 5가지

**Quick Win 1: docs-mcp를 .mcp.json에 등록 (소요: 5분)**

.mcp.json에 docs-mcp 엔트리를 추가하면 AI 에이전트가 즉시 문서 검색, rootage 데이터 조회, 아이콘 검색 도구에 접근할 수 있다. 현재 이 패키지는 구현이 완료되어 있지만 등록만 빠져 있는 상태다.

**Quick Win 2: discover_seed_docs → discover_rui_docs 리네이밍 (소요: 30분)**

packages/docs-mcp/src/tools/discover.ts의 도구명에 "Seed"가 잔존한다. AI가 이 이름을 학습하여 "Seed Design"이라는 잘못된 맥락을 출력할 수 있다. 도구명, 설명문, 관련 참조를 "RUI"로 일괄 변경한다.

**Quick Win 3: _index.yaml 파일럿 3개 작성 (소요: 2시간)**

action-button, checkbox, dialog 3개에 대해 id, name, purpose, category, tags, variants, sizes, hasHeadless 필드를 가진 인덱스 파일을 만든다. 이것만으로도 AI가 "버튼이 필요하다"는 요구에 대해 3개 후보를 즉시 좁힐 수 있다.

**Quick Win 4: 기존 variant description에서 variantGuide 초안 자동 추출 (소요: 반나절)**

rootage/components/*.yaml의 variants.variant.values.*.description 필드를 파싱하여 ai-meta의 variantGuide 초안을 자동 생성하는 스크립트를 만든다. 77개 컴포넌트의 variantGuide 초안을 한 번에 생성할 수 있다.

**Quick Win 5: @karrotmarket/* 참조 grep 및 정리 계획 수립 (소요: 1시간)**

프로젝트 전역에서 @karrotmarket 문자열을 grep하여 잔존 위치를 목록화한다(현재 36개 파일). 아이콘 라이브러리(@karrotmarket/icon-data 등)는 격리되어 있어 즉시 대체가 가능하지 않지만, 참조 위치를 파악하는 것만으로도 fork 정리의 범위를 확정할 수 있다.

**Quick Win 6: @rui/react 주요 컴포넌트에 JSDoc 밀도 즉시 향상 (소요: 반나절)**

현재 @rui/react 전체에서 @description, @see, @link 어노테이션이 거의 없다. 상위 10개 사용 빈도 컴포넌트(ActionButton, TextField, Checkbox, Dialog, BottomSheet, Tabs, Avatar, Badge, Switch, Select)의 export에 1줄짜리 @description과 @see(문서 링크)를 추가한다. 이것만으로도 IDE 자동완성에서 컴포넌트 용도가 노출되어, MCP 없는 환경(Cursor, Copilot)의 AI DX가 즉시 개선된다.

**Quick Win 7: .cursorrules 템플릿 작성 (소요: 1시간)**

Non-MCP 환경인 Cursor 사용자를 위해 .cursorrules 파일 템플릿을 제공한다. 내용: "@rui/react 컴포넌트를 우선 사용할 것, 토큰은 semantic만 사용할 것, 새 컴포넌트 생성 시 Primitive 패턴을 따를 것, DESIGN.md를 참조할 것" 같은 핵심 규칙을 마크다운으로 정리한다. Copilot custom instructions 예시도 함께 제공한다.

---

## 9. 4개 관점 리뷰 결과 및 반영

본 보고서는 작성 후 CEO/Founder, Designer, Eng Manager, DevEx 4개 관점에서 Opus 모델 기반 병렬 리뷰를 받았다. 초판 평균 점수 4.6/10에서 지적된 Critical 7건과 Major 10건을 반영하여 현재 버전으로 개정했다.

| 리뷰어 | 초판 평균 | 최저 차원 | 핵심 지적 | 반영 |
|--------|----------|-----------|----------|------|
| CEO/Founder | 5.1 | 경쟁 해자 3 | ROI 미정량화, 10-star 비전 부재, table stakes | Executive Summary에 ROI 추정 + 경쟁 우위 추가, Phase 4 비전 신설 |
| Designer | 4.75 | 반응형 3 | constraint 사실 오류, 모션/대비/다크모드 누락, 디자이너 워크플로우 비현실적 | constraint 교정(ghost→neutralOutline/brandOutline), motionGuidance/contrastNotes/darkModeTokenRule 필드 추가, breakpoint 확장, 디자이너 입력 방식 3단계 로드맵 |
| Eng Manager | 5.3 | 테스트 전략 3 | Phase 1 scope 과대, generator 복잡도 과소추정, 유지보수 소유권 부재, 복합 컴포넌트 미처리 | Phase 1에서 DESIGN.md 자동 생성 제거, Phase 2 기간 6-8주로 상향, 운영 프로세스 섹션 신설, 복합 컴포넌트 전략 명시, 재현 가능 테스트 프레임워크 정의 |
| DevEx | 3.4 | 피드백 루프 1 | 에러 복구 경로 부재, Non-MCP 전략 빈약, 과도기 DX 열위 미인정, 오프라인 의존 | STEP 7 사후 교정 + 피드백 루프 추가, .cursorrules 템플릿(Quick Win 7), JSDoc 밀도 향상(Quick Win 6), 리스크 6-7 추가 |

반영하지 않은 주요 지적과 그 이유:

CEO 리뷰의 "77개 컴포넌트가 정말 77개여야 하는지(통폐합 가능성)"는 타당한 질문이나, 본 보고서의 범위(AI 최적화 전환 전략)를 넘어서는 디자인 시스템 자체의 아키텍처 결정이다. 별도 의제로 다루어야 한다.

Design 리뷰의 "화면 유형별 컴포지션 레시피"는 Phase 4 비전에 포함했으나, 당장 ai-meta 스키마에 넣기에는 복잡도가 과도하다. 컴포넌트 단위 메타데이터가 안정화된 후 도입하는 것이 적절하다.

Design 리뷰의 "각 variant의 시각적 무게(visual weight) 수치화"는 매력적이나 현 단계에서 수치화 기준을 합의하기 어렵다. variantGuide에 상대적 무게(강→약 순서)를 서술로 포함하는 것으로 대체한다.

---

## 부록: R1~R4 요구사항 매핑 자기검증

| 요구사항 | 보고서 섹션 | 구체적 위치 |
|----------|------------|------------|
| R1. 컴포넌트 우선, 로컬 fallback 허용 | 5장 (의사결정 플로우) | STEP 1~2-F-NEW, "로컬 컴포넌트 생성 바운더리" 5개 허용 조건 + 4개 금지 조건 |
| R2. 최소 토큰으로 정확한 컴포넌트 선정 | 4.2장 (manifest 스키마) + 5장 | _index.yaml 스키마, ai-meta YAML 스키마, STEP 1~4의 점진적 정보 공개 |
| R3. UX 보존을 위한 신규 UI 생성 룰 | 5장 | STEP 6 "UX 적합성 검증" 6가지 위반 기준 + 4가지 허용 대응, STEP 7 "사후 교정 및 피드백" |
| R4. Semantic-first 토큰 사용 원칙 | 4.4장 + 5장 | 토큰 계층 재정의안 4개 강제 규칙 + 3가지 허용 예외, STEP 5 토큰 결정 플로우, resolveToken 의사코드 |

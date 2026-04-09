# RUI 디자인 시스템의 AI 활용 구조 제안 리포트

## 서론

RUI는 이미 디자인 토큰에서 React까지 이어지는 생성 파이프라인과 에이전트용 기본 문서를 갖추고 있다. 다만 이번 조사 결과를 합치면, 현재 구조는 AI가 "찾아 읽고 사용하는 것"에는 적합하지만, "스스로 컴포넌트를 고르고 판단하는 것"에 필요한 번역층과 선택 규칙층은 아직 약하다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/TECH.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/AGENTS.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/docs/app/llms.txt/route.ts, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md, /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 20-23)

---

## 세 레퍼런스 시스템 구조 비교

### Seed

- Seed는 `rootage(YAML) → qvism-preset → css → react-headless → react`의 생성형 파이프라인이 분명하고, 문서도 `docs`, `react`, `ai-integration`으로 분리되어 있다. 여기에 `llms.txt`, `_llms` 정규화, MCP 문서까지 있어 AI 접근 경로를 별도로 제공한다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/TECH.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/docs/app/llms.txt/route.ts, /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/docs/content/ai-integration/index.mdx)

### WDS

- WDS는 `wds-theme → wds-engine → wds / wds-icon / wds-lottie → wds-nextjs`의 웹 계층과 Android/iOS 별도 저장소를 함께 운영하는 멀티레포 구조다. 공통 브랜드와 문서 사이트는 공유하지만 구현과 배포는 플랫폼별로 나뉜다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/wanted_clone/README.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/wanted_clone/packages/wds/README.md, https://github.com/wanteddev/montage-web, https://github.com/wanteddev/montage-android, https://github.com/wanteddev/montage-ios)

### newDs

- newDs는 `tokens → css → react-headless → react / react-native → admin`의 단방향 의존 구조를 명시하고, YAML을 source of truth로 두며, AI용 메타데이터와 MCP를 별도 단계로 설계한다. 문서보다 구조화를 먼저 고정하는 접근이다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/AGENTS.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/CLAUDE.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md)

### 비교 요약

- 정리하면 Seed는 문서와 AI 접근 경로가 강하고, WDS는 플랫폼 분리와 진입점 안내가 강하며, newDs는 선택 메타데이터와 전달 구조를 구조적으로 설계하는 데 가장 집중돼 있다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/docs/content/ai-integration/(mcp)/docs-mcp.mdx, /Users/kihyeonkwon/Documents/projects/active/ds_clone/wanted_clone/README.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/ARCHITECTURE.md)

---

## AI 활용 관점에서 각 시스템 평가

### Seed

- Seed는 AI가 문서를 접근, 요약, 사용하기에는 가장 준비가 잘 된 편이다. `llms.txt`, `_llms` 변환, MCP 문서가 모두 있어 AI 친화적 진입점이 명확하다. 다만 토큰과 컴포넌트를 어떤 기준으로 선택해야 하는지에 대한 단일 판단 규칙은 분산돼 있다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/docs/app/llms.txt/route.ts, /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/docs/app/_llms/get-llm-text.ts, /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/docs/content/docs/foundation/color/color-role.mdx)

### WDS

- WDS는 AI가 어디서 시작해야 하는지는 빠르게 알 수 있지만, 디자인 판단에 필요한 규칙 문서는 약하다. 설치와 연동 예제는 분명하지만 토큰 의미, 상태 규칙, 패리티 기준, 마이그레이션 판단이 한곳에 모여 있지 않다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/wanted_clone/README.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/wanted_clone/packages/wds/README.md, https://github.com/wanteddev/montage-android, https://github.com/wanteddev/montage-ios)

### newDs

- newDs는 현재 완성도보다 방향성이 중요하다. `선택용 메타데이터`와 `사용용 JSDoc`을 분리하고 이후 MCP 도구로 연결하는 계획이 있어, AI 친화 조건과 가장 직접적으로 맞닿아 있다. 다만 조사 시점 기준으로는 아직 계획 단계가 포함돼 있다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/ROADMAP.md)

### 종합 평가

- AI 문서 요건 기준으로 보면 세 시스템 모두 사람용 문서는 잘 갖췄지만, AI가 바로 판단할 수 있는 루트 레벨 번역층과 `언제 쓰는지 / 언제 쓰지 않는지 / Do & Don't / 반응형 규칙 / 프롬프트 가이드`는 충분히 압축돼 있지 않다. Seed는 접근층이 강하고, WDS는 시작점 안내가 강하며, newDs는 앞으로 필요한 구조를 가장 선명하게 정의했다. (근거: /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 128-159, 167-176, /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/docs/content/ai-integration/index.mdx, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md)

---

## AI가 디자인 시스템을 잘 활용하기 위해 필요한 것

### 문서 계층

- 사람용 원본 문서와 별도로, 프로젝트 루트에서 바로 읽을 수 있는 단일 AI 실행 규격층 `DESIGN.md`가 필요하다. 이 문서는 Visual Theme, Color Palette, Typography, Component Stylings, Layout Principles를 plain-text Markdown으로 압축해 제공해야 한다. (근거: /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 20-23, 31-36, 44-46)

### 컴포넌트 판단 정보

- AI가 컴포넌트를 고르려면 "무엇인가"보다 "언제 쓰는가 / 언제 쓰지 않는가"가 먼저 필요하다. semantic name, 기능 역할, 상태별 변화, 반례와 금지 규칙이 함께 있어야 한다. (근거: /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 58-77, 94-122, 148-159)
- `Do's and Don'ts`, `Responsive Behavior`, `Agent Prompt Guide`, `preview.html` 같은 AI 전용 보조 계층이 있어야 오용 방지와 검증이 가능하다. (근거: /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 128-136, https://github.com/VoltAgent/awesome-design-md/tree/main)

### 구조 원칙

- 문서만으로는 부족하고, 선택 메타데이터와 사용 설명을 분리한 구조가 필요하다. newDs가 제안한 YAML 메타데이터와 props JSDoc의 2계층은 이 요구와 직접 맞는다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md, /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 167-176)

---

## RUI에 구축해야 할 구조 제안

### 지금 당장

- 지금 당장: 루트 `DESIGN.md`를 신설해 `AGENTS.md`, `TECH.md`, 기존 컴포넌트 문서에서 AI가 바로 써야 할 핵심 규칙만 압축한다. RUI는 이미 파이프라인과 기본 에이전트 문서를 갖고 있으므로, 가장 먼저 부족한 것은 구조 자체보다 "AI용 단일 진입점"이다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/AGENTS.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/TECH.md, /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 20-23)
- 지금 당장: 컴포넌트별 선택 규칙을 구조화한다. 각 컴포넌트에 대해 `whenToUse`, `whenNotToUse`, 관련 컴포넌트, 상태 규칙, 반응형 규칙, Do/Don't를 명시해야 한다. (근거: /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 148-159, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md)

### 다음 단계

- 다음 단계: 선택 메타데이터를 YAML source of truth로 분리하고, generated TS 같은 소비층으로 내보내는 구조를 붙인다. RUI는 이미 `Figma → rootage YAML → qvism-preset → css → react` 흐름이 있으므로, 이 메타데이터를 기존 파이프라인에 연결하는 방식이 자연스럽다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/TECH.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/ARCHITECTURE.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md)
- 다음 단계: AI 도구 진입점을 문서뿐 아니라 구조화된 호출로 확장한다. newDs의 `recommend_component`, `get_component_meta` 같은 방식은 RUI의 `@rui/mcp` 방향과 맞물린다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/README.md)

### 현실 제약

- 현실 제약: Figma/MCP 소유권 완전 이전과 후속 독립화 웨이브가 아직 남아 있으므로, AI 전달 구조는 먼저 문서 계층부터 정리하고 도구 계층은 독립화 진행과 맞춰 확장하는 편이 적절하다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/docs/plans/2026-04-08-rui-phase-1-release-checklist.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/docs/plans/2026-04-08-rui-design-system-fork-plan.md)

---

## 한눈에 보는 결론

RUI는 기술 구조만 보면 이미 AI 친화 구조로 갈 수 있는 기반이 있다. 하지만 지금 상태는 "AI가 읽고 따라가는 구조"에 가깝고, "AI가 스스로 선택하고 판단하는 구조"는 아직 약하다. 우선순위는 새로운 시스템을 더 만드는 것이 아니라, 기존 문서를 `DESIGN.md + 컴포넌트 선택 메타데이터 + Do/Don't + 반응형 규칙 + 프롬프트 가이드`로 재구성하는 일이다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/TECH.md, /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 128-159, /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md)

---

## 추천 먼저 읽기 순서

1. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/AGENTS.md`: 작업 규칙과 문서 역할 분리를 먼저 이해한다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/AGENTS.md)
2. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/TECH.md`: Figma부터 React까지의 생성 파이프라인을 이해한다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/TECH.md)
3. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/README.md`: 현재 공개 패키지와 외부 소비 표면을 확인한다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/README.md)
4. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/docs/plans/2026-04-08-rui-phase-1-release-checklist.md`: 지금 가능한 것과 아직 남은 것을 구분한다. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/docs/plans/2026-04-08-rui-phase-1-release-checklist.md)
5. `/Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md`: AI 전달 문서 형식의 기준을 잡는다. (근거: /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 20-23)

---

## AI 전달 패키지 권장안

1. `AGENTS.md`: 저장소 규칙과 문서 역할 정의. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/AGENTS.md)
2. `DESIGN.md`: AI용 단일 실행 규격층. 루트 진입점으로 신설이 필요하다. (근거: /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 20-23, 31-36)
3. `컴포넌트 메타데이터 묶음`: `whenToUse`, `whenNotToUse`, related, status, a11y, responsive, Do/Don't. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md, /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 128-159)
4. `사용 설명 층`: props JSDoc, 설치/예제, 구현 사용법. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/docs/content/react/components/action-button.mdx)
5. `검증 보조물`: `preview.html`, `preview-dark.html`, Agent Prompt Guide. (근거: /Users/kihyeonkwon/Documents/AI docs/DESIGN_MD_에이전트_요약본.md 128-136, https://github.com/VoltAgent/awesome-design-md/tree/main)
6. `MCP 진입점`: 이후 `recommend_component`, `get_component_meta`류 구조화 도구로 확장. (근거: /Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md, /Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/README.md)

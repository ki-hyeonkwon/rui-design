# RUI 디자인 시스템 AI 활용 구조 제안

> Role: Analysis Report
> Purpose: 세 개의 레퍼런스 디자인 시스템(Seed, WDS, newDs)을 비교하고, RUI에 AI가 효과적으로 활용될 수 있는 구조를 제안한다
> Read this when: RUI의 AI 통합 전략을 수립하거나, 컴포넌트 문서의 AI 소비 가능성을 개선할 때
> Canonical: No
> Related docs: `2026-04-08-rui-design-system-fork-plan.md`, `TECH.md`

## 서론

이 리포트는 세 디자인 시스템(Seed Design, Wanted Design System, newDs)의 AI 활용 구조를 조사하고, RUI의 현재 상태와 교차 분석하여 "AI가 RUI를 잘 활용하기 위해 무엇이 필요한가"에 대한 구조 제안을 도출한다. 핵심 질문은 두 가지다: (1) AI가 컴포넌트를 정확히 **선택**할 수 있는가, (2) AI가 선택한 컴포넌트를 정확히 **사용**할 수 있는가.

---

## 1. 세 레퍼런스 시스템 구조 비교

### 기술 파이프라인

| 항목 | Seed Design | WDS | newDs |
|------|-------------|-----|-------|
| 패키지 관리 | Bun 모노레포 | Lerna + Nx + pnpm | pnpm + Turborepo |
| 토큰 원천 | YAML (rootage) | TypeScript (3계층) | YAML (rootage) |
| 스타일 시스템 | CSS Variables + Recipe | Emotion 엔진 | CSS Variables + Recipe |
| 컴포넌트 구조 | headless + styled 분리 | Polymorphic (`as` prop) | headless + styled 분리 |
| 코드 생성 | rootage -> qvism -> css | 수동 | rootage -> css |
| 멀티플랫폼 | 단일 리포 | Web/Android/iOS 별도 리포, 문서만 통합 | React + React Native |

(근거: Seed -- `/Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/package.json`, WDS -- Agent B 조사, newDs -- Agent C 조사)

### 문서 인프라

| 항목 | Seed Design | WDS | newDs |
|------|-------------|-----|-------|
| 문서 플랫폼 | Next.js + Fumadocs | Next.js | 미상 |
| AGENTS.md 수 | 19개 | 1개 (루트만) | 다수 (계층적) |
| llms.txt 변환 | MDX AST 기반 8개 룰 | 없음 | 없음 |
| MCP 서버 | 2개 (Figma + Docs) | 1개 (wds-mcp) | 계획만 (빈 파일) |
| Claude 스킬 | 8개 | 없음 | 7개 |
| API 자동 생성 | 없음 | JSON 자동 생성 | 없음 |

### AI 관련 고유 특징

| 시스템 | 고유 특징 |
|--------|-----------|
| Seed | Figma MCP(REST+WebSocket 이중 경로), ComponentHandler 매핑, llms.txt 변환 파이프라인 |
| WDS | MCP 도구 8개에 코딩 가이드라인 구조화, HTTP/OAuth 원격 접근, codemod 성숙 |
| newDs | 두 레이어 AI 메타데이터 모델(선택+사용), HARD-GATE 스킬, Generator/Evaluator 분리, 하네스 시스템 |

---

## 2. AI 활용 관점에서 각 시스템 평가

AI가 디자인 시스템을 활용하려면 다섯 계층의 정보가 필요하다:

- **Layer 0**: 토큰/값 수준 명세 -- hex 색상값, 타이포그래피 스케일, 스페이싱 등 원시 값
- **Layer 1**: 컴포넌트 메타데이터 -- variant/size/state, props API, 슬롯 구조
- **Layer 2**: 사용 맥락 -- "언제 이 variant를 쓰는가", Do/Don't 가이드라인
- **Layer 3**: 결정 근거 -- "왜 A가 아니라 B인가", 안티패턴
- **Layer 4**: 관계 그래프 -- 컴포넌트 간 대체/조합/포함 관계

(근거: Agent E 조사 -- AI 문서 요건 분석)

### 평가 매트릭스

| 계층 | Seed Design | WDS | newDs | 비고 |
|------|:-----------:|:---:|:-----:|------|
| Layer 0 (토큰) | **강함** | **강함** | **강함** | 세 시스템 모두 토큰이 구조화되어 있어 기계적 추출 가능 |
| Layer 1 (메타데이터) | **강함** | **강함** | **강함** | Seed는 YAML 스펙, WDS는 TS 타입+API JSON, newDs는 YAML 스펙 |
| Layer 2 (사용 맥락) | **약함** | **약함** | **계획됨** | 세 시스템 모두 "언제 쓰는가" 정보가 이미지에 묻혀 있거나 비구조화 |
| Layer 3 (결정 근거) | **없음** | **없음** | **없음** | 어떤 시스템도 "왜" 정보를 AI 소비 가능 형태로 제공하지 않음 |
| Layer 4 (관계 그래프) | **부분** | **없음** | **계획됨** | Seed는 rootage YAML에 일부 관계 정보, newDs는 relatedComponents 필드 계획 |

### 시스템별 종합 판단

**Seed Design**: AI 전달 인프라가 가장 성숙하다. 4중 접근 레이어(llms.txt, Figma MCP, Docs MCP, 스킬)를 갖추고 있고, rootage YAML의 시맨틱 정보(variant별 한국어 description)가 풍부하다. 그러나 AI가 컴포넌트를 "선택"하는 데 필요한 Layer 2-3 정보는 부족하다. (근거: Agent A -- Seed 조사, rootage YAML 78개 컴포넌트 스펙)

**WDS**: MCP 서버에 코딩 가이드라인을 구조화한 점이 독특하다. API 문서의 JSON 자동 생성은 Layer 1 전달에 효과적이다. 그러나 MCP가 외부 문서 사이트의 HTML 크롤링에 의존하여 안정성이 낮고, 디자인 의도가 이미지에 묻혀 있어 AI 접근이 불가능하다. (근거: Agent B -- WDS 조사)

**newDs**: 아직 구현 초기 단계이지만, AI 메타데이터 전략의 설계가 가장 정교하다. "선택"과 "사용"을 명시적으로 분리한 두 레이어 모델, HARD-GATE가 있는 스킬 패턴, Generator/Evaluator 분리 원칙은 AI 품질 보증에 직접 기여하는 구조다. (근거: Agent C -- newDs 조사)

---

## 3. AI가 디자인 시스템을 잘 활용하기 위해 필요한 것

### 가장 큰 공백: Layer 2 (사용 맥락)

Layer 0-1은 코드에서 기계적으로 추출할 수 있다. 타입 정의를 읽으면 props를 알 수 있고, 토큰 파일을 읽으면 색상값을 알 수 있다. AI가 실제로 실수하는 지점은 **"어떤 컴포넌트/variant를 선택해야 하는가"** 판단이다.

현재 세 시스템 모두에서 이 정보는 다음 형태로 존재한다:
- Figma 디자인 파일의 이미지 레이어 (AI가 읽을 수 없음)
- MDX 문서의 산문 텍스트 (구조화되지 않아 일관된 추출 불가)
- 개발자 머릿속의 암묵지 (어디에도 기록되지 않음)

(근거: Agent E -- AI 문서 요건, "26개 파일에 산재, 독립 섹션 없음")

### 컴포넌트 판단에 필요한 5가지 정보

1. **컴포넌트 목적 1줄 정의** -- 기능 중심의 짧은 설명. "사용자가 하나의 선택지를 고를 때 쓰는 컨트롤"
2. **When to Use / When Not to Use** -- 이 컴포넌트를 써야 할 때와 쓰지 말아야 할 때를 명시적으로 분리
3. **유사 컴포넌트 비교** -- "ActionButton vs Button vs ExtendedActionButton" 같은 혼동 가능 쌍의 선택 기준
4. **Variant 선택 기준** -- 각 variant가 어떤 맥락에서 적합한지 표 형태로 정리
5. **조합 규칙** -- "이 컴포넌트는 X 안에서만 쓴다", "Y와 함께 쓰지 않는다"

(근거: Agent E -- 컴포넌트 판단 요건 분석)

---

## 4. RUI에 구축해야 할 구조 제안

### RUI 현재 상태 요약

RUI는 Seed Design에서 fork되었으며 동일한 파이프라인(`rootage -> qvism-preset -> css -> react`)을 사용한다. AI 인프라는 이미 상당히 성숙한 상태다:

- llms.txt 변환 시스템 (MDX AST 기반 8개 룰) (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/docs/app/_llms/rules/`)
- Figma MCP 서버 (`.mcp.json`에 등록) (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/.mcp.json`)
- Docs MCP 서버 (패키지 존재하나 `.mcp.json`에 미등록) (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/packages/docs-mcp/`)
- Claude 스킬 8개 (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/skills/`)
- AGENTS.md 19개 계층 체계 (근거: 실측 19개)
- rootage YAML 78개 컴포넌트 스펙 + 88개 YAML 파일 (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/packages/rootage/`)

### 우선순위 1: 지금 당장 (기존 인프라 정비)

이 단계는 새로운 시스템을 만드는 것이 아니라 이미 있는 것을 올바르게 연결하는 작업이다.

#### 1-1. Docs MCP를 `.mcp.json`에 등록

현재 `docs-mcp` 패키지가 존재하지만 `.mcp.json`에 등록되지 않아 AI 에이전트가 접근할 수 없다. 등록만으로 Docs MCP의 문서 접근, rootage 데이터, 아이콘 검색 도구가 활성화된다.

(근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/.mcp.json` -- `rui`와 `playwright`만 등록, `docs-mcp` 미등록)

#### 1-2. Fork 잔여 문자열 정리

SEED, `@karrotmarket/*` 등 fork 이전 문자열이 AI 출력에 잔존할 위험이 있다. AI가 코드를 생성할 때 이 잔여물을 학습하여 잘못된 패키지명이나 네이밍을 출력할 수 있다. Fork Wave 2-6 완료가 AI 품질의 전제 조건이다.

(근거: Agent D -- "Fork 잔여물이 AI 출력 품질에 위험 초래")

#### 1-3. llms.txt 배포 검증 테스트 추가

llms.txt 변환 파이프라인이 존재하지만 배포 후 실제 접근 가능 여부를 검증하는 테스트가 없다. 변환은 되지만 소비가 안 되는 상황을 방지해야 한다.

(근거: Agent D -- "llms.txt 배포 검증 테스트 없음")

### 우선순위 2: 다음 단계 (Layer 2 구조화)

이 단계는 AI가 컴포넌트를 "선택"하는 능력을 부여하는 핵심 작업이다.

#### 2-1. 컴포넌트 메타 YAML 도입

rootage YAML에 이미 variant, slot, state 정보가 풍부하다. 여기에 AI 선택용 메타데이터를 추가한다. newDs의 두 레이어 모델을 참고하되, RUI의 기존 rootage 파이프라인을 확장하는 형태가 적합하다.

추가할 필드:

```yaml
# 예시: rootage/components/action-button.yaml 에 추가
ai:
  purpose: "사용자가 즉각적인 동작을 실행할 때 쓰는 버튼"
  whenToUse:
    - "폼 제출, 확인, 다음 단계 진행 등 명확한 동작이 있을 때"
    - "페이지에서 가장 중요한 행동을 강조할 때"
  whenNotToUse:
    - "단순 페이지 이동에는 LinkButton 사용"
    - "토글 동작에는 ToggleButton 사용"
  relatedComponents:
    - id: link-button
      relation: alternative
      criterion: "동작이 아니라 탐색(navigation)이면 LinkButton"
    - id: extended-action-button
      relation: alternative
      criterion: "부가 정보(아이콘+설명)가 필요하면 ExtendedActionButton"
  variantGuide:
    variant:
      brandSolid: "페이지의 주요 행동(CTA). 한 화면에 1개만 권장"
      neutralWeak: "보조 행동. CTA 옆에 배치"
  tags:
    - action
    - cta
    - form
```

이 구조의 장점:
- 기존 rootage YAML 파이프라인과 동일한 authoring 경험
- 디자이너가 YAML 파일을 직접 검수할 수 있음 (newDs 접근법과 동일)
- `bun generate:all`로 llms.txt, MCP 도구에 자동 전파 가능

(근거: Agent C -- newDs의 두 레이어 모델, Agent E -- 컴포넌트 판단 요건)

#### 2-2. 유사 컴포넌트 비교표 생성

78개 컴포넌트 중 혼동 가능한 쌍을 식별하고, 각 쌍에 대해 선택 기준을 명시한 비교표를 만든다. 이 비교표는 독립 문서보다 메타 YAML의 `relatedComponents` 필드로 분산 저장하는 것이 유지보수에 유리하다.

(근거: Agent E -- "48개 중 7쌍만 비교 정보")

#### 2-3. Docs MCP에 `recommend_component` 도구 추가

메타 YAML이 도입되면, "이런 상황에서 어떤 컴포넌트를 쓸까?"라는 질의에 응답하는 MCP 도구를 만들 수 있다. newDs가 계획만 세운 것(빈 파일 상태)을 RUI가 실제 구현하는 기회다.

(근거: Agent C -- "MCP 서버 계획: recommend_component, get_component_meta (현재 빈 파일)")

### 우선순위 3: 장기 (AI 품질 보증 체계)

#### 3-1. Generator/Evaluator 분리 패턴 적용

AI가 코드를 생성하는 스킬(Generator)과 생성 결과를 검증하는 스킬(Evaluator)을 분리한다. 현재 RUI의 8개 스킬은 모두 생성 목적이다. newDs의 Generator/Evaluator 분리 원칙과 스타일 검증 3회전 패턴을 참고한다.

(근거: Agent C -- "Generator/Evaluator 분리 원칙", "스타일 검증 3회전 패턴")

#### 3-2. 소비자 프로젝트용 스킬 추가

현재 8개 스킬은 모두 RUI 내부 개발용이다. `@rui/*`를 사용하는 외부 프로젝트의 AI 에이전트가 활용할 수 있는 스킬이 없다. "RUI 컴포넌트로 화면 구성하기" 같은 소비자 관점 스킬이 필요하다.

(근거: Agent D -- "소비자 프로젝트용 스킬 없음 (현재 8개 모두 내부 개발용)")

#### 3-3. HARD-GATE 스킬 패턴 도입

스킬 실행 중 특정 조건을 만족하지 않으면 진행을 차단하는 게이트를 둔다. "rootage 스펙 없이 컴포넌트 생성 금지", "테스트 미통과 시 PR 생성 금지" 같은 불변 조건을 스킬에 내장한다.

(근거: Agent C -- "HARD-GATE 4개가 있는 create-component 스킬")

---

## 5. 한눈에 보는 결론

| 우선순위 | 작업 | 효과 | 난이도 |
|:--------:|------|------|:------:|
| **1-1** | Docs MCP `.mcp.json` 등록 | AI 에이전트의 문서 접근 즉시 활성화 | 낮음 |
| **1-2** | Fork 잔여 문자열 정리 | AI 출력 품질의 전제 조건 확보 | 중간 (Wave 2-6) |
| **1-3** | llms.txt 배포 검증 테스트 | 변환-소비 파이프라인 신뢰성 확보 | 낮음 |
| **2-1** | 컴포넌트 메타 YAML 도입 | AI의 컴포넌트 선택 능력 부여 (핵심) | 중간 |
| **2-2** | 유사 컴포넌트 비교표 | 혼동 가능 쌍의 오선택 방지 | 중간 |
| **2-3** | `recommend_component` MCP 도구 | 외부 AI 에이전트의 컴포넌트 추천 지원 | 중간 |
| **3-1** | Generator/Evaluator 분리 | AI 생성 코드의 품질 보증 | 높음 |
| **3-2** | 소비자 프로젝트용 스킬 | RUI 사용자의 AI 경험 완성 | 높음 |
| **3-3** | HARD-GATE 스킬 패턴 | 스킬 실행의 안전성 강화 | 중간 |

핵심 결론: **RUI의 AI 인프라(Layer 0-1 전달)는 이미 강력하다. 가장 큰 투자 대비 효과는 Layer 2(사용 맥락)의 구조화에 있다.** 이를 위해 기존 rootage YAML 파이프라인을 확장하는 것이 가장 적합한 경로다. 새로운 시스템을 만들 필요 없이, 이미 있는 파이프라인에 `ai:` 필드를 추가하고, 이를 llms.txt와 MCP 도구로 자동 전파하면 된다.

---

## 6. 추천 먼저 읽기 순서 (RUI 신규 에이전트 기준)

RUI에 처음 투입되는 AI 에이전트가 프로젝트를 이해하기 위해 읽어야 할 문서 순서:

1. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/CLAUDE.md` -- 프로젝트 진입점, 핵심 문서 링크
2. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/AGENTS.md` -- AI 에이전트 행동 규칙, 문서 역할 분리, Boundaries
3. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/TECH.md` -- 기술 스택, 아키텍처, 생성 파이프라인, 주요 명령어
4. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/packages/AGENTS.md` -- 패키지 간 관계와 역할
5. 작업 대상 패키지의 `AGENTS.md` -- 해당 폴더 컨벤션

---

## 7. AI 전달 패키지 권장안

AI가 RUI 컴포넌트를 정확히 선택하고 사용하기 위해, 다음 순서로 정보를 전달한다:

1. **컴포넌트 목록 + 목적 1줄 정의** -- 전체 78개 컴포넌트를 한 번에 전달하여 AI가 후보를 좁히게 함
2. **선택된 컴포넌트의 메타 YAML** -- whenToUse, whenNotToUse, relatedComponents, variantGuide
3. **선택된 컴포넌트의 rootage 스펙** -- slots, variants, definitions (정확한 props와 값)
4. **선택된 컴포넌트의 코드 예제** -- 실제 사용 패턴 (import 경로, recipe 적용, ref 전달)
5. **토큰 참조** -- 컴포넌트가 사용하는 시맨틱 토큰의 실제 값 (color, dimension, radius 등)

이 순서는 "넓은 범위에서 좁은 범위로"(wide-to-narrow) 전달하여 AI의 토큰 소비를 최소화하면서 정확도를 높이는 구조다. MCP 도구의 `recommend_component` -> `get_component_meta` -> `get_component_spec` 순서와 일치시킨다.

# RUI 디자인 시스템에 AI가 효과적으로 활용될 수 있는 구조 제안을 위한 조사 리포트

### 짧은 서론
본 리포트는 RUI 디자인 시스템에 AI 에이전트가 얼마나 효과적으로 코드를 탐색하고 작성할 수 있는지 최적의 구조를 제안하기 위해 작성되었습니다. Wave 1에서 Seed, WDS, newDs 디자인 시스템 및 AI 문서론, RUI 현재 인프라 상태를 조사하여 비교·분석하였고 이 결과를 통해 RUI에 당장 필요한 체계와 나아가야 할 AI 친화적 방향성을 도출했습니다. 

---

### 세 레퍼런스 시스템 구조 비교 (Seed / WDS / newDs)
- **Seed Design**: Figma 변수를 `rootage(YAML)` → `qvism-preset(Recipe)` → `css` → `react` 컴포넌트로 전환하는 고도의 빌드 타임 생성 파이프라인을 갖추고 있습니다. (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/seed-design-dev/TECH.md`)
- **WDS**: Tightly coupled된 런타임 플랫폼(Web/Android/iOS 각각 별도 관리) 관리에 중심을 두며, `wds-theme`과 Emotion 런타임 엔진 기반으로 구축되어 있습니다. 컴포넌트 문서화는 `design.mdx`와 `config.js`를 활용하며 TS JSDoc 기반으로 돕습니다. (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/wanted_clone/AGENTS.md`)
- **newDs**: Seed의 "구조화된 YAML 기반 생성 파이프라인"을 채택하되 WDS가 갖춘 "높은 JSDoc 밀도"의 장점을 결합하여 설계되었습니다. 가장 눈에 띄게 차별화되는 점은 `CLAUDE.md`, `.harness` 폴더 체계처럼 에이전트 구동 컨텍스트를 계층적으로 분류하여 사용하고 있다는 것입니다. (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/ARCHITECTURE.md`)

---

### AI 활용 관점에서 각 시스템 평가
- **Seed Design** 
  - **강점**: YAML과 MDX 형식으로 이루어져 있고, Figma/MCP 생태계가 묶여있어 소스코드 가독성이 LLM에 매우 친화적입니다.
  - **부족한 것**: AI가 컴포넌트를 골라 써야 할 때 그 맥락이 되는 '자연어 메타데이터(언제 써야 하는가 등)'가 상대적으로 빈약하여 AI 판단력에 기대어야 하는 제약이 존재합니다.
- **WDS**
  - **강점**: 컴포넌트 Props에 달린 인라인 JSDoc이나 변형 옵션 활용도를 구체적인 코드 예시로 확인할 수 있어 코드 생성 작업에서 정확도가 뛰어납니다. 
  - **부족한 것**: 메타데이터들이 `design.mdx`나 `config.js`로 분산되어 있고, 아키텍처와 런타임이 무거워 빌드 과정을 수행하지 않고는 추상적 메타 정보를 획득하기 어렵습니다. 
- **newDs**
  - **강점**: LLM의 의사결정을 돕는 2-Layer(Layer 1: 컴포넌트 선택형 YAML, Layer 2: 컴포넌트 사용형 JSDoc) 전략을 갖춰 AI와 인간 모드가 모두 최적화되어 있습니다. (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/newds/docs/plans/ai-component-metadata-strategy.md`)
  - **평가 요약**: 현존하는 클론 대상들 중 AI가 시스템을 가장 온전히 컨트롤하고 스스로의 환각(Hallucination) 없이 문맥을 파악할 수 있는 최적의 구조입니다.

---

### AI가 디자인 시스템을 잘 활용하기 위해 필요한 것
- **AI가 읽기 위한 문서 계층 구조**:
  1. 최고 수준 원칙 (시스템의 제약과 글로벌 디자인 가이드를 제시하는 `DESIGN.md` 급 문서)
  2. 컴포넌트 **선택**을 위한 메타데이터 요건들 (마크다운, YAML 등 가벼운 형식)
  3. 컴포넌트 **사용**을 위한 Props 밀도 (자연어화된 인라인 JSDoc)
- **가장 중요한 요소와 컴포넌트 판단 정보**: 컴포넌트 파악을 위해 `category`, `whenToUse`(권장 케이스), `whenNotToUse`(제한 케이스), `relatedComponents`(연관관계)와 같은 **상황 판단 메타데이터**가 가장 절실하게 요구됩니다.
- **현재 디자인 시스템들의 공통 공백**: Seed는 "생성"에 치우치고 WDS는 "런타임/Props"에 치우쳐 있어, AI가 컴포넌트들 중 **"A가 아니라 B를 써야 하는 이유 (When to use)"**를 사전에 추론하고 정당화하여 제안할 수 있는 데이터가 소스 레벨에 존재하지 않습니다. 이를 Awesome Design.md의 원칙에 따라 하나의 파일(`DESIGN.md` 등)로 명세하거나, 단일 컴포넌트 YAML에 구조화해 주어야 합니다. (근거: 메타데이터 전략 파일 및 `awesome_design_md_review.md` 리포트)

---

### RUI에 구축해야 할 구조 제안 (우선순위 포함)
- **RUI의 현재 상태 (진행 상태)**: 
  - 완료 상태: `bun phase1:validate` 등 기본 툴체인 구축 완료, `@rui/react`, `@rui/css` 등 Phase 1 퍼블릭 패키지 테스트 완료 (근거: `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/docs/plans/2026-04-08-rui-phase-1-release-checklist.md`)
  - 미착수 상태: AI가 직접 RUI 컴포넌트 목록을 필터링해 찾아 쓸 수 있는 컴포넌트 메타데이터와 전체 문맥(Context) 조율용 `DESIGN.md`/`llms.txt`의 구체화 미도입.
  
- **RUI 구조 구축 제안 및 우선순위**: 
  1. **(지금 당장) Zero-Configuration 마크다운 문서 제공 및 2-Layer 메타데이터 구조 수립**: 
     - **Layer 1 구축**: RUI의 `packages/rootage` 단계에 있는 컴포넌트 스키마(YAML)에 AI 추천 용도인 `whatToUse`, `whenNotToUse` 등 메타데이터 필드를 확장합니다.  
     - **Layer 2 보완**: `@rui/react` 등의 핵심 패키지에 들어갈 때 Headless API에 WDS 수준의 JSDoc을 엄밀하게 작성합니다.
     - 소비자를 위해 빌드된 패키지 외에도 `DESIGN.md` 형태의 압축 단일 가이드를 제공하여, 외부 개발 환경의 AI(Cursor 등)가 즉각 학습하도록 지원해야 합니다.
  2. **(다음 단계) 메타데이터 파이프라인 자동화 및 인프라 완성 (LLMs.txt & MCP)**: 
     - Rootage의 YAML을 확장하여 문서 산출물(`llms.txt`)과 타입스크립트, MCP 추천 시스템에 자동으로 공급될 수 있는 파이프라인을 스크립팅합니다.

---

### 한눈에 보는 결론
RUI 디자인 시스템의 현재 빌드 파이프라인과 생성형 코드 기술은 매우 우수하나, **"AI의 디자인 방향성 선택을 돕는 메타데이터와 상황적 맥락"**이 소스 자산에 빈칸으로 남아있습니다. 이 빈칸을 해결하기 위해 Rootage YAML 내 메타데이터 정보(`whenToUse`, `category` 등)를 강제하고, 해당 정보를 취합한 AI 단일 명세서(`DESIGN.md` 및 `llms.txt`)를 최종 산출물로 연결하는 것이 최선입니다.

---

### 추천 먼저 읽기 순서 (RUI 신규 에이전트 기준)
새로운 에이전트가 RUI 환경에 진입할 때 문맥을 잃지 않는 최적의 로컬 문서 열람 순서는 다음과 같습니다.
1. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/README.md` (플랫폼과 사용자 맥락 파악)
2. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/TECH.md` (자동 생성 파이프라인 개념 확립)
3. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/docs/plans/2026-04-08-rui-design-system-fork-plan.md` 및 Phase 1 문서 (현재 개발 진척상황 동기화)
4. `/Users/kihyeonkwon/Documents/projects/active/ds_clone/rui-design-dev/AGENTS.md` (제약사항의 숙지)

---

### AI 전달 패키지 권장안
AI 에이전트의 불필요한 비용(Token) 소모 및 할루시네이션(환각)을 막기 위한 최적의 컨텍스트 제공 패키지로 아래 3계층 번들을 권장합니다.

1. **상황 및 목적 설정 (`CLAUDE.md` 또는 `DESIGN.md`)**: 시스템의 최종 목표 파악 공간 (WHY)
2. **법칙 및 파이프라인 (`AGENTS.md` + `TECH.md`)**: Never/Always 중심 제약사항 확인 (HOW/WHO)
3. **컴포넌트 인프라스트럭처 (`llms.txt` + JSDoc / YAML source)**: AI가 특정 코드로 실제 제안을 할 때 참조하는 실무적 메타데이터 (WHAT)

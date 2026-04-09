---
title: RUI AI Architecture Decision
date: 2026-04-09
status: confirmed
---

# RUI AI 아키텍처 의사결정 메모

## 1. 최종 결정

컴포넌트 선택 메타데이터를 `packages/rootage/ai-meta/*.yaml`에 SSOT로 두고, `bun generate:all` 파이프라인을 통해 DESIGN.md, JSDoc, llms.txt, MCP 응답을 자동 생성하는 단일 원본 → 다중 산출물 구조를 채택한다.

## 2. 이유

1. **SSOT 보장**: rootage YAML이 이미 디자인 토큰과 컴포넌트 스키마의 단일 원본이다. 선택 메타데이터도 같은 원칙 아래 관리해야 drift가 발생하지 않는다.
2. **독립화 과도기 대응**: 현재 Wave 2-6 독립화가 진행 중이므로 core schema(`packages/rootage/components/*.yaml`)에 실험 필드를 바로 섞으면 마이그레이션 비용이 증가한다. 인접 계층 분리로 리스크를 격리한다.
3. **수기 관리 제거**: DESIGN.md를 사람이 직접 쓰면 코드-문서 간 불일치가 반드시 발생한다. 자동 생성으로 전환하면 유지보수 부담이 0이 된다.

## 3. 하지 않기로 한 것

| 배제한 대안 | 배제 이유 |
|---|---|
| DESIGN.md를 수기 SSOT로 유지 (v1) | 시간이 지나면 코드, 메타데이터와 drift 발생이 불가피 |
| `ai:` 필드를 rootage core schema에 즉시 추가 (v2) | 독립화 미완료 상태에서 스키마 변경 시 ai 필드까지 마이그레이션 필요 |
| 메타데이터 설계 완료까지 모든 인프라 수정 대기 (순차 모델) | fork 잔여물(`@karrotmarket/*`, `discoverSeedDocsTool`) 같은 즉시 수정 가능한 결함까지 블로킹하는 것은 비합리적 |
| MCP 도구를 먼저 확장하고 메타데이터는 나중에 (도구 우선) | 구조화된 원본 없이 도구만 늘리면 노이즈 확대 |

## 4. 실행 스펙

### Source of Truth

| 항목 | 경로 |
|---|---|
| 컴포넌트 스키마 (기존) | `packages/rootage/components/*.yaml` |
| 선택 메타데이터 (신규) | `packages/rootage/ai-meta/{component-id}.yaml` |
| 토큰 정의 (기존) | `packages/rootage/*.yaml` (color, dimension 등) |

### ai-meta YAML 스키마 필드

```yaml
kind: ComponentAIMeta
metadata:
  id: action-button          # rootage component id와 1:1 매칭
  name: Action Button
data:
  whenToUse:                  # 이 컴포넌트를 써야 하는 상황
    - "사용자 행동을 유도하는 주요 CTA"
  whenNotToUse:               # 이 컴포넌트 대신 다른 것을 써야 하는 상황
    - "텍스트 링크로 충분한 경우 → TextButton"
  dos:                        # 올바른 사용법
    - "한 화면에 primary variant는 하나만"
  donts:                      # 잘못된 사용법
    - "아이콘 없이 icon-only size 사용 금지"
  alternatives:               # 유사 컴포넌트와 선택 기준
    - component: text-button
      when: "시각적 강조가 필요 없는 보조 액션"
    - component: fab
      when: "화면 위에 떠 있는 주요 액션"
  responsiveGuidance:         # 반응형 가이드
    mobile: "size=medium 기본"
    desktop: "size=large 허용"
```

### 생성 대상 산출물

| 산출물 | 생성 위치 | 소비자 |
|---|---|---|
| `DESIGN.md` (루트 요약본) | 프로젝트 루트 | MCP 없는 AI (Cursor, Copilot 등) |
| `@rui/react` JSDoc | 각 컴포넌트 export | 코드 에디터 autocomplete |
| `llms.txt` 선택 가이드 섹션 | `docs/app/llms.txt/route.ts` | 웹 브라우징 AI |
| docs-mcp 응답 | `packages/docs-mcp` | MCP 지원 에이전트 |

### 파이프라인 연결

```
packages/rootage/ai-meta/*.yaml
    ↓ bun generate:all (신규 생성 스텝 추가)
    ├─→ DESIGN.md (자동 생성)
    ├─→ @rui/react JSDoc 주입
    ├─→ llms.txt 선택 가이드 섹션
    └─→ docs-mcp get_component_guidance 응답 데이터
```

### 즉시 수정 (메타데이터 설계와 독립)

| 수정 사항 | 대상 파일 |
|---|---|
| docs-mcp를 `.mcp.json`에 등록 | `.mcp.json` |
| fork 잔여물 `discoverSeedDocsTool` → `discoverRuiDocsTool` 리네이밍 | `packages/docs-mcp/src/tools/discover.ts`, `packages/docs-mcp/src/tools/index.ts` |
| `@karrotmarket/*` 참조 정리 | 프로젝트 전역 grep 후 개별 수정 |
| llms.txt 배포 검증 테스트 추가 | `docs/` 테스트 영역 |

## 5. 1차 적용 범위

### 파일럿 대상

- **컴포넌트 3개**: `action-button`, `checkbox`, `dialog`
  - 이유: 단일 컴포넌트(action-button), 복합 컴포넌트(checkbox), 오버레이 패턴(dialog)을 각각 대표
- **ai-meta 파일 3개**: `packages/rootage/ai-meta/action-button.yaml`, `checkbox.yaml`, `dialog.yaml`
- **생성 산출물 검증**: 파일럿 3개에 대해 DESIGN.md 섹션 + JSDoc이 정확히 생성되는지 확인

### 이번 단계에서 하지 않을 것

- 76개 전체 컴포넌트의 ai-meta 작성 (파일럿 검증 후 확장)
- rootage core schema 변경 (독립화 완료 전까지 보류)
- MCP `recommend_component` 같은 추론형 도구 (메타데이터 안정화 후)
- Generator/Evaluator 분리, HARD-GATE (트랙 C, 후행)

## 6. 검증 기준

### 완료 조건

- [ ] `packages/rootage/ai-meta/` 에 파일럿 3개 YAML 작성 완료
- [ ] `bun generate:all` 실행 시 ai-meta에서 DESIGN.md 자동 생성
- [ ] 생성된 DESIGN.md의 whenToUse/whenNotToUse가 ai-meta YAML과 정확히 일치
- [ ] `.mcp.json`에 docs-mcp 등록 완료, fork 잔여물 제거 완료
- [ ] llms.txt 엔드포인트 응답 검증 테스트 1개 이상 통과

### 실패 조건

- ai-meta YAML 수정 후 `bun generate:all` 없이 DESIGN.md가 수동 편집됨
- 생성된 산출물과 ai-meta YAML 사이에 내용 불일치 발생
- 파일럿 3개 컴포넌트에서 스키마 필드 구조가 안정되지 않아 2회 이상 breaking change

### 수기 관리 금지 규칙

**DESIGN.md, JSDoc 선택 가이드, llms.txt 선택 섹션은 직접 편집 금지.** 수정이 필요하면 반드시 `packages/rootage/ai-meta/*.yaml`을 수정한 뒤 `bun generate:all`을 실행한다. 이 규칙은 AGENTS.md의 "생성 파일 직접 수정 금지" 규칙과 동일한 수준으로 적용한다.

## 7. 다음 단계

| 순서 | 작업 | 선행 조건 |
|---|---|---|
| 1 | 파일럿 3개 컴포넌트 ai-meta 작성 + 생성 스크립트 구현 | 없음 (즉시 시작) |
| 2 | 즉시 수정 항목 처리 (docs-mcp 등록, fork 잔여물, llms.txt 검증) | 없음 (1과 병렬) |
| 3 | 파일럿 검증 → ai-meta 스키마 필드 확정 | 1 완료 |
| 4 | 전체 76개 컴포넌트 ai-meta 확장 | 3 완료 |
| 5 | JSDoc 자동 주입, llms.txt 선택 가이드 생성 연결 | 4 완료 |
| 6 | docs-mcp에 `get_component_guidance` 도구 추가 | 5 완료 |
| 7 | ai-meta 필드 안정화 확인 → rootage core schema 편입 검토 | 독립화 Wave 완료 + 6 완료 |

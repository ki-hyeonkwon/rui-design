---
name: write-component-guideline
description: Write or update component guideline docs in docs/content/docs/components using rootage-derived props, standardized image naming, and RUI MDX patterns. Use when creating new guideline pages or revising existing design guidance.
---

# Write Component Guideline

이 스킬은 RUI Design System의 컴포넌트 가이드라인 문서를 생성합니다. Action Button과 같은 고품질 디자인 가이드라인 문서를 작성할 수 있도록 돕습니다.

## Quick Start

1. `component-id`와 문서 타입(`simple|comprehensive`)을 확정합니다.
2. Rootage YAML에서 props/slots/definitions를 추출해 문서 구조를 구성합니다.
3. 이미지 경로 규칙과 MDX 컴포넌트(`<PlatformStatusTable>`, `<ComponentSpecBlock>`)를 적용합니다.
4. 체크리스트로 일관성을 검증하고 필요 시 예시 문서를 참고합니다.

## 목차

- 입력/추출: `### 1. 사용자 입력 받기`, `### 2. Rootage YAML 파일 읽기`
- 문서 구성: `### 3. Props 테이블 생성`, `### 4. 문서 구조 생성`
- 자산/작성 규칙: `### 5. 이미지 경로 규칙`, `### 6. 한국어 작성 가이드라인`, `### 7. 컴포넌트 참조`
- 검증/예시: `### 8. 참조 자료`, `### 9. 체크리스트`, `## 사용 예시`

## 목적

- 일관된 구조의 컴포넌트 가이드라인 문서 생성
- Rootage YAML 스펙과 연동된 Props 정보 자동 추출
- 한국어 기반의 상세한 디자인 원칙과 사용 가이드 작성
- 표준화된 이미지 경로와 컴포넌트 참조 생성

## 사용 시나리오

1. 새로운 컴포넌트의 가이드라인 문서를 처음 작성할 때
2. 기존 컴포넌트의 가이드라인을 업데이트할 때
3. V2에서 V3로 마이그레이션 가이드를 추가할 때

## 작업 흐름

### 1. 사용자 입력 받기

사용자에게 다음 정보를 요청합니다:

**필수 정보**:

- **Component ID**: 예) `action-button`, `checkbox`, `badge`
  - 이 ID는 Rootage YAML 파일명과 동일해야 합니다
  - `/packages/rootage/components/{component-id}.yaml` 파일이 존재해야 합니다

**선택 정보**:

- **Documentation Type**: `simple` 또는 `comprehensive`
  - `simple`: 기본적인 Props와 Spec만 포함 (예: checkbox, badge)
  - `comprehensive`: Anatomy, Guidelines, Comparison 등 전체 섹션 포함 (예: action-button)

- **Custom Sections** (comprehensive인 경우):
  - Anatomy: 컴포넌트 구조도 포함 여부
  - Guidelines Topics: 작성할 가이드라인 주제 목록
    - 예) Hierarchy, Variant Usage, Brand Color Usage, Multiple Buttons, Long Label, With Icon
  - Comparison: 비교할 다른 컴포넌트 (예: "Action Button vs Chip")
  - V2 Differences: V2와의 차이점 설명 포함 여부

### 2. Rootage YAML 파일 읽기

`/packages/rootage/components/{component-id}.yaml` 파일을 읽어서 다음 정보를 추출합니다:

**YAML 구조 이해**:

```yaml
kind: ComponentSpec
metadata:
  id: action-button
  name: Action Button
data:
  schema:
    slots:
      root:
        properties:
          backgroundColor: { type: color }
          borderRadius: { type: dimension }
      label:
        properties:
          color: { type: color }
          fontSize: { type: dimension }
  definitions:
    base:
      enabled: { ... }
      pressed: { ... }
      disabled: { ... }
    variant=brandSolid:
      enabled: { ... }
    size=medium:
      enabled: { ... }
    variant=brandSolid, size=medium:
      enabled: { ... }
```

**추출할 정보**:

1. **Component Name**: `metadata.name`
2. **Component ID**: `metadata.id`
3. **Available Props**:
   - Variants: `definitions`에서 `variant=` 로 시작하는 키 추출
   - Sizes: `definitions`에서 `size=` 로 시작하는 키 추출
   - States: `definitions.base`의 키들
   - Layout: 컨텍스트나 관례를 통해 파악
4. **Slots**: `schema.slots`의 키들

### 3. Props 테이블 생성

YAML에서 추출한 정보로 Props 테이블을 생성합니다.

```markdown
## Props

| 속성        | 값                     | 기본값    |
| ----------- | ---------------------- | --------- |
| size        | {extracted sizes}      | {default} |
| variant     | {extracted variants}   |           |
| layout      | {inferred or provided} | {default} |
| disabled    | true, false            | false     |
| loading     | true, false            | false     |
| prefix icon | icon                   |           |
| suffix icon | icon                   |           |
```

### 4. 문서 구조 생성

#### Simple 타입 문서 구조

```markdown
---
title: { Component Name }
description: { 한국어 설명 }
---

<PlatformStatusTable componentId="{component-id}" />

## 개요

{컴포넌트 소개}

### 옵션 테이블

{Props 테이블}

## 스펙

<ComponentSpecBlock id="{component-id}" />
```

#### Comprehensive 타입 문서 구조

```markdown
---
title: { Component Name }
description: { 한국어 설명 }
---

<PlatformStatusTable componentId="{component-id}" />

## Anatomy

![Anatomy Image](/docs/components/{component-id}/anatomy.webp)

{구조 설명}

## Props

{Props 테이블}

## Guidelines

### {Guideline Topic 1}
```

### 5. 이미지 경로 규칙

- 경로 패턴: `/docs/components/{component-id}/{image-name}.webp`
- 예시:
  - `/docs/components/action-button/anatomy.webp`
  - `/docs/components/action-button/props-size.webp`
  - `/docs/components/action-button/guidelines-hierarchy.webp`

### 6. 한국어 작성 가이드라인

- 문장은 `~합니다`, `~해 주세요` 톤을 사용합니다.
- 컴포넌트 이름과 기술 용어는 공식 영문 이름을 유지합니다.
- Figma/Rootage에 없는 정보는 추측으로 추가하지 않습니다.

### 7. 컴포넌트 참조

- 언급되는 다른 컴포넌트는 항상 링크합니다.
- 예: `[Bottom Sheet](/docs/components/bottom-sheet)`

### 8. 참조 자료

- 기존 우수 문서: `docs/content/docs/components/`
- Rootage 스펙: `packages/rootage/components/{component-id}.yaml`

### 9. 체크리스트

- [ ] `PlatformStatusTable` 포함
- [ ] `ComponentSpecBlock` 포함
- [ ] Props 테이블이 Rootage YAML과 일치
- [ ] 이미지 경로가 `.webp` 형식
- [ ] 내부 링크가 실제 문서와 일치

## 사용 예시

- “`action-button` comprehensive 문서를 작성해줘”
- “`checkbox` guideline을 simple 타입으로 업데이트해줘”

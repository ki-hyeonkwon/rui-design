---
name: rui-cli
description: RUI Design CLI workflows for init/add/add-all/compat, rui.json setup, snippet version compatibility checks, baseUrl-based registry selection, and custom snippet migration strategies. Use when onboarding SEED snippets, adding components, resolving version mismatches, or updating customized snippet files.
---

# Seed Design CLI

RUI Design CLI를 프로젝트에 안정적으로 적용할 때 사용하는 스킬입니다.

## Quick Start

1. `rui.json`을 생성합니다.
2. 필요한 스니펫을 `add` 또는 `add-all`로 추가합니다.
3. `compat`으로 현재 프로젝트 버전과 스니펫 요구 버전 호환성을 검사합니다.
4. 버전 호환이 필요하면 `--baseUrl`로 맞는 레지스트리를 지정합니다.
5. 파일 충돌 시 덮어쓰기/백업/건너뛰기 전략을 선택합니다.

## Scope

- `npx @rui/cli@latest init`
- `npx @rui/cli@latest add ...`
- `npx @rui/cli@latest add-all ...`
- `npx @rui/cli@latest compat ...`
- `rui.json` 운영 (`path`, `tsx`, `rsc`, `telemetry`)
- 스니펫 버전 호환성과 마이그레이션 운영

## References

- CLI Commands: https://rui-design.io/llms/react/getting-started/cli/commands.txt
- CLI Configuration: https://rui-design.io/llms/react/getting-started/cli/configuration.txt

## Reference Files

- 일반 사용 흐름: `references/usage.md`
- 호환/마이그레이션: `references/migration.md`

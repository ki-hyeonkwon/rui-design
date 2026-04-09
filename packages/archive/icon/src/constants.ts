import pkg from "../package.json" with { type: "json" };

export const YAML_SCHEMA_URL = `https://raw.githubusercontent.com/rui-design/rui-design/%40rui/icon%40${pkg.version}/packages/icon/schema/schema.json`;

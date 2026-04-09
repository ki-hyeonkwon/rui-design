import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@rui/react", "@rui/stackflow"],
  serverExternalPackages: [
    "ts-morph",
    "typescript",
    "oxc-transform",
    "@shikijs/twoslash",
    "unified",
    "remark",
    "remark-gfm",
    "remark-rehype",
    "rehype-stringify",
  ],
  staticPageGenerationTimeout: 300,
  images: {
    // FIXME: temporal use for static export; will remove after image optimization setup
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.conditionNames = ["rui-layered", "..."];
    return config;
  },
};

export default withMDX(config);

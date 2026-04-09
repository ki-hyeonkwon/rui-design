import { TAGS } from "@/app/api/search/constants";
import { lynxSource } from "@/app/source";
import DefaultSearchDialog from "@/components/search/search";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { lynxOptions } from "../layout.config";

export default async function Layout({ children }: { children: ReactNode }) {
  const transformedTree = await lynxSource.getTransformedLynxPageTree();

  return (
    <RootProvider
      search={{
        SearchDialog: DefaultSearchDialog,
        options: {
          defaultTag: TAGS.lynx.value,
          tags: Object.values(TAGS),
        },
      }}
    >
      <DocsLayout {...lynxOptions} tree={transformedTree}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}

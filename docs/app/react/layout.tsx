import { TAGS } from "@/app/api/search/constants";
import { reactSource } from "@/app/source";
import DefaultSearchDialog from "@/components/search/search";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";
import { reactOptions } from "../layout.config";

export default async function Layout({ children }: { children: ReactNode }) {
  const transformedTree = await reactSource.getTransformedReactPageTree();

  return (
    <RootProvider
      search={{
        SearchDialog: DefaultSearchDialog,
        options: {
          defaultTag: TAGS.react.value,
          tags: Object.values(TAGS),
        },
      }}
    >
      <DocsLayout {...reactOptions} tree={transformedTree}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}

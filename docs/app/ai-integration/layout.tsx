import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { aiIntegrationOptions } from "../layout.config";
import { RootProvider } from "fumadocs-ui/provider/next";
import DefaultSearchDialog from "@/components/search/search";
import { TAGS } from "@/app/api/search/constants";
import { aiIntegrationSource } from "@/app/source";

export default async function Layout({ children }: { children: ReactNode }) {
  const transformedTree = await aiIntegrationSource.getTransformedAiIntegrationPageTree();

  return (
    <RootProvider
      search={{
        SearchDialog: DefaultSearchDialog,
        options: {
          defaultTag: TAGS.aiIntegration.value,
          tags: Object.values(TAGS),
        },
      }}
    >
      <DocsLayout {...aiIntegrationOptions} tree={transformedTree}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}

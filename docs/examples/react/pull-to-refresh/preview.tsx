import { AppBar, AppScreen } from "@rui/stackflow";
import { ActivityComponentType } from "@stackflow/react/future";
import { VStack } from "@rui/react";
import {
  PullToRefreshContent,
  PullToRefreshIndicator,
  PullToRefreshRoot,
} from "rui/ui/pull-to-refresh";

declare module "@stackflow/config" {
  interface Register {
    "react/pull-to-refresh/preview": {};
  }
}

const PullToRefreshPreview: ActivityComponentType<"react/pull-to-refresh/preview"> = () => {
  // AppScreen is imported from @rui/stackflow instead of snippet for demo purpose.
  // AppScreen snippet is integrating PullToRefresh, so it's not necessary to use it here.
  return (
    <AppScreen.Root>
      <AppBar.Root divider>
        <AppBar.Main>
          <AppBar.Title>Pull To Refresh</AppBar.Title>
        </AppBar.Main>
      </AppBar.Root>
      <PullToRefreshRoot
        asChild
        onPtrReady={() => {}}
        onPtrRefresh={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      >
        <AppScreen.Layer>
          <PullToRefreshIndicator />
          <PullToRefreshContent asChild>
            <VStack px="spacingX.globalGutter">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam autem deserunt
              reprehenderit ducimus sunt. Quod laudantium excepturi tempora fuga repellendus
              accusantium nam maiores? Quas debitis, neque ullam eligendi minus sit?
            </VStack>
          </PullToRefreshContent>
        </AppScreen.Layer>
      </PullToRefreshRoot>
    </AppScreen.Root>
  );
};

export default PullToRefreshPreview;

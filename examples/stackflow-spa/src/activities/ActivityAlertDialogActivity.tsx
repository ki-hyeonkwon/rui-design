import { VStack } from "@rui/react";
import { useFlow, type StaticActivityComponentType } from "@stackflow/react/future";
import {
  AppBar,
  AppBarBackButton,
  AppBarLeft,
  AppBarMain,
  AppBarIconButton,
  AppBarRight,
} from "rui/ui/app-bar";
import { AppScreen, AppScreenContent } from "rui/ui/app-screen";
import { ActionButton } from "rui/ui/action-button";
import { IconHouseLine } from "@karrotmarket/react-monochrome-icon";

declare module "@stackflow/config" {
  interface Register {
    ActivityAlertDialogActivity: {};
  }
}

const ActivityAlertDialogActivity: StaticActivityComponentType<
  "ActivityAlertDialogActivity"
> = () => {
  const { push } = useFlow();

  return (
    <AppScreen>
      <AppBar>
        <AppBarLeft>
          <AppBarBackButton />
        </AppBarLeft>
        <AppBarMain title="Activity" />
        <AppBarRight>
          <AppBarIconButton aria-label="Home" onClick={() => push("ActivityHome", {})}>
            <IconHouseLine />
          </AppBarIconButton>
        </AppBarRight>
      </AppBar>
      <AppScreenContent>
        <VStack p="x5" justify="center" gap="x4">
          <ActionButton
            variant="neutralSolid"
            flexGrow
            onClick={() => push("ActivityAlertDialog", {})}
          >
            ActivityAlertDialog를 Push
          </ActionButton>
          <ActionButton
            variant="neutralWeak"
            flexGrow
            onClick={() => push("ActivityAlertDialogActivity", {})}
          >
            지금 열린 이 Activity를 Push
          </ActionButton>
        </VStack>
      </AppScreenContent>
    </AppScreen>
  );
};

export default ActivityAlertDialogActivity;

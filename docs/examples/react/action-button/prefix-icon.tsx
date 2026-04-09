import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@rui/react";
import { ActionButton } from "rui/ui/action-button";

export default function ActionButtonPrefixIcon() {
  return (
    <ActionButton>
      <PrefixIcon svg={<IconPlusFill />} />
      라벨
    </ActionButton>
  );
}

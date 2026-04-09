import { IconChevronRightFill } from "@karrotmarket/react-monochrome-icon";
import { SuffixIcon } from "@rui/react";
import { ActionButton } from "rui/ui/action-button";

export default function ActionButtonSuffixIcon() {
  return (
    <ActionButton>
      라벨
      <SuffixIcon svg={<IconChevronRightFill />} />
    </ActionButton>
  );
}

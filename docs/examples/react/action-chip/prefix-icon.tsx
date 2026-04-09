import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { ActionChip, PrefixIcon } from "@rui/react";

export default function ActionChipPrefixIcon() {
  return (
    <ActionChip>
      <PrefixIcon svg={<IconPlusFill />} />
      라벨
    </ActionChip>
  );
}

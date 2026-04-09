import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { ActionChip, PrefixIcon } from "@rideds/react";

export default function ActionChipPrefixIcon() {
  return (
    <ActionChip>
      <PrefixIcon svg={<IconPlusFill />} />
      라벨
    </ActionChip>
  );
}

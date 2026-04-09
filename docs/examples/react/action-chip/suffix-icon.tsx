import { IconChevronDownFill } from "@karrotmarket/react-monochrome-icon";
import { ActionChip, SuffixIcon } from "@rui/react";

export default function ActionChipSuffixIcon() {
  return (
    <ActionChip>
      라벨
      <SuffixIcon svg={<IconChevronDownFill />} />
    </ActionChip>
  );
}

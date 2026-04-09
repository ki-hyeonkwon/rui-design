import { IconChevronDownFill } from "@karrotmarket/react-monochrome-icon";
import { SuffixIcon } from "@rui/react";
import { ControlChip } from "rui/ui/control-chip";

export default function ControlChipSuffixIcon() {
  return (
    <ControlChip.Toggle>
      라벨
      <SuffixIcon svg={<IconChevronDownFill />} />
    </ControlChip.Toggle>
  );
}

import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@rui/react";
import { ControlChip } from "rui/ui/control-chip";

export default function ControlChipPrefixIcon() {
  return (
    <ControlChip.Toggle>
      <PrefixIcon svg={<IconPlusFill />} />
      라벨
    </ControlChip.Toggle>
  );
}

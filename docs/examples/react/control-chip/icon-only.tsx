import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { Icon } from "@rideds/react";
import { ControlChip } from "rui/ui/control-chip";

export default function ControlChipIconOnly() {
  return (
    <ControlChip.Toggle layout="iconOnly" inputProps={{ "aria-label": "추가" }}>
      <Icon svg={<IconPlusFill />} />
    </ControlChip.Toggle>
  );
}

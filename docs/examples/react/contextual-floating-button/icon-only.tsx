import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { Icon } from "@rui/react";
import { ContextualFloatingButton } from "rui/ui/contextual-floating-button";

export default function ContextualFloatingButtonIconOnly() {
  return (
    <ContextualFloatingButton layout="iconOnly" aria-label="추가">
      <Icon svg={<IconPlusFill />} />
    </ContextualFloatingButton>
  );
}

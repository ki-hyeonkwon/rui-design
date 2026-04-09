import { IconPlusLine } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@rideds/react";
import { ContextualFloatingButton } from "rui/ui/contextual-floating-button";

export default function ContextualFloatingButtonLayer() {
  return (
    <ContextualFloatingButton variant="layer">
      <PrefixIcon svg={<IconPlusLine />} />
      Layer Variant
    </ContextualFloatingButton>
  );
}

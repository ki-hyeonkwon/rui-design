import { IconPlusLine } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@rideds/react";
import { ContextualFloatingButton } from "rui/ui/contextual-floating-button";

export default function ContextualFloatingButtonSolid() {
  return (
    <ContextualFloatingButton variant="solid">
      <PrefixIcon svg={<IconPlusLine />} />
      Solid Variant
    </ContextualFloatingButton>
  );
}

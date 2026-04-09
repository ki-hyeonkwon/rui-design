import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@rideds/react";
import { ContextualFloatingButton } from "rui/ui/contextual-floating-button";

export default function ContextualFloatingButtonPreview() {
  return (
    <ContextualFloatingButton>
      <PrefixIcon svg={<IconBellFill />} />
      알림 설정
    </ContextualFloatingButton>
  );
}

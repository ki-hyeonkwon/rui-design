import { IconILowercaseSerifCircleLine } from "@karrotmarket/react-monochrome-icon";
import { HelpBubbleTrigger } from "rui/ui/help-bubble";
import { ActionButton } from "rui/ui/action-button";
import { Icon } from "@rideds/react";

export default function HelpBubblePreview() {
  return (
    <HelpBubbleTrigger defaultOpen title="아래 버튼이나 바깥 영역을 클릭해서 닫아보세요.">
      <ActionButton variant="ghost" size="small" layout="iconOnly" aria-label="도움말">
        <Icon svg={<IconILowercaseSerifCircleLine />} />
      </ActionButton>
    </HelpBubbleTrigger>
  );
}

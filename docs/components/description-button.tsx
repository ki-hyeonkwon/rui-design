import IconILowercaseSerifCircleLine from "@karrotmarket/react-monochrome-icon/IconILowercaseSerifCircleLine";
import { Icon } from "@rui/react";
import { ActionButton } from "rui/ui/action-button";
import { HelpBubbleTrigger } from "rui/ui/help-bubble";

export function DescriptionButton({ description }: { description: string }) {
  return (
    <HelpBubbleTrigger title={description} placement="top">
      <ActionButton
        size="xsmall"
        variant="ghost"
        layout="iconOnly"
        aria-label="설명 보기"
        bleedX="asPadding"
        bleedY="asPadding"
        onClick={(e) => e.stopPropagation()}
      >
        <Icon svg={<IconILowercaseSerifCircleLine />} />
      </ActionButton>
    </HelpBubbleTrigger>
  );
}

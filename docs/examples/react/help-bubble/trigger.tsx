import { VStack } from "@rui/react";
import { useState } from "react";
import { HelpBubbleTrigger } from "rui/ui/help-bubble";
import { Switch } from "rui/ui/switch";
import { ActionButton } from "rui/ui/action-button";

export default function () {
  const [isControlledHelpBubbleOpen, setIsControlledHelpBubbleOpen] = useState(true);

  return (
    <VStack gap="x16" align="center">
      <HelpBubbleTrigger
        defaultOpen
        title="Trigger, uncontrolled"
        description="클릭으로 열고 닫는 동작이 있는 트리거입니다."
        placement="right"
        showCloseButton
        closeOnInteractOutside={false}
      >
        <ActionButton variant="neutralSolid">토글</ActionButton>
      </HelpBubbleTrigger>
      <VStack gap="spacingY.componentDefault" align="center">
        <HelpBubbleTrigger
          open={isControlledHelpBubbleOpen}
          onOpenChange={setIsControlledHelpBubbleOpen}
          title="Trigger, controlled"
          description="클릭으로 열고 닫는 동작이 있는 트리거입니다."
          placement="right"
          showCloseButton
          closeOnInteractOutside={false}
        >
          <ActionButton variant="neutralSolid">토글</ActionButton>
        </HelpBubbleTrigger>
        <Switch
          size="24"
          tone="neutral"
          label="열림"
          checked={isControlledHelpBubbleOpen}
          onCheckedChange={setIsControlledHelpBubbleOpen}
        />
      </VStack>
    </VStack>
  );
}

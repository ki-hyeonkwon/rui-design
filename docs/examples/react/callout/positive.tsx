import { IconCalendarFill } from "@karrotmarket/react-monochrome-icon";
import { VStack } from "@rui/react";
import { ActionableCallout, Callout, DismissibleCallout } from "rui/ui/callout";

export default function CalloutPositive() {
  return (
    <VStack gap="x4" width="full">
      <Callout
        tone="positive"
        prefixIcon={<IconCalendarFill />}
        description="기능에 대한 안내 또는 유익한 내용을 전달해요. 콜아웃은 꼭 필요한 경우에만 절제하여 사용해요."
      />
      <ActionableCallout
        tone="positive"
        prefixIcon={<IconCalendarFill />}
        description="기능에 대한 안내 또는 유익한 내용을 전달해요. 콜아웃은 꼭 필요한 경우에만 절제하여 사용해요."
      />
      <DismissibleCallout
        tone="positive"
        prefixIcon={<IconCalendarFill />}
        description="기능에 대한 안내 또는 유익한 내용을 전달해요. 콜아웃은 꼭 필요한 경우에만 절제하여 사용해요."
      />
    </VStack>
  );
}

import { VStack } from "@rideds/react";
import { ErrorState } from "rui/ui/error-state";

export default function ErrorStatePreview() {
  return (
    <VStack minHeight="480px" width="320px" borderWidth={1} borderColor="stroke.neutralMuted">
      <ErrorState
        title="에러 타이틀"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
        primaryActionProps={{
          children: "메인 액션",
        }}
        secondaryActionProps={{
          children: "보조 액션",
        }}
      />
    </VStack>
  );
}

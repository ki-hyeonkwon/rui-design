import { VStack } from "@rideds/react";
import { Checkbox } from "rui/ui/checkbox";

export default function CheckboxIndeterminate() {
  return (
    <VStack p="x6">
      <Checkbox defaultChecked label="indeterminate" indeterminate tone="neutral" size="large" />
    </VStack>
  );
}

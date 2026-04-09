import { VStack } from "@rideds/react";
import { TagGroupRoot, TagGroupItem } from "rui/ui/tag-group";

export default function TagGroupWeights() {
  return (
    <VStack gap="spacingY.componentDefault" align="center">
      <TagGroupRoot weight="regular">
        <TagGroupItem label="regular" />
        <TagGroupItem label="regular" />
        <TagGroupItem label="regular" />
      </TagGroupRoot>
      <TagGroupRoot weight="bold">
        <TagGroupItem label="bold" />
        <TagGroupItem label="bold" />
        <TagGroupItem label="bold" />
      </TagGroupRoot>
    </VStack>
  );
}

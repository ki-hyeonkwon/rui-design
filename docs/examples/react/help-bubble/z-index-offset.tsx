import { Flex, HStack, VStack } from "@rui/react";
import { useState } from "react";
import { HelpBubbleAnchor } from "rui/ui/help-bubble";
import { Slider } from "rui/ui/slider";
import { Avatar } from "rui/ui/avatar";

export default function HelpBubbleZIndexOffset() {
  const [zIndexOffset, setZIndexOffset] = useState(5);

  return (
    <VStack align="center" gap="x8">
      <HStack gap="x2">
        {Array.from({ length: 5 }, (_, i) => (
          <Flex
            key={i}
            width="x16"
            height="x16"
            borderRadius="r2"
            align="center"
            justify="center"
            bg="bg.neutralWeak"
            borderColor="stroke.neutralWeak"
            borderWidth={1}
            style={{ zIndex: i + 100 }}
          >
            {i + 100}
          </Flex>
        ))}
      </HStack>
      <HelpBubbleAnchor
        defaultOpen
        title={`default: 99, current: ${99 + zIndexOffset}`}
        description="Et ullamco laborum voluptate ipsum labore ea nostrud sunt ipsum."
        zIndexOffset={zIndexOffset}
        closeOnInteractOutside={false}
      >
        <Avatar size="64" src="https://avatars.githubusercontent.com/u/54893898?v=4" fallback="L" />
      </HelpBubbleAnchor>
      <Slider
        min={0}
        max={5}
        values={[zIndexOffset]}
        onValuesChange={([value]) => setZIndexOffset(value)}
        markers={[0, 5]}
        getAriaLabel={() => "zIndexOffset"}
        hideValueIndicator
      />
    </VStack>
  );
}

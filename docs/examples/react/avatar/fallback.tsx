import { Flex } from "@rui/react";
import { Avatar } from "rui/ui/avatar";
import { IdentityPlaceholder } from "rui/ui/identity-placeholder";

export default function AvatarFallbackExample() {
  return (
    <Flex gap="x4" align="center">
      <Avatar size="80" fallback={<IdentityPlaceholder identity="person" />} />
      <Avatar size="80" fallback={<IdentityPlaceholder identity="business" />} />
    </Flex>
  );
}

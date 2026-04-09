import { HStack } from "@rideds/react";
import { ContentPlaceholder } from "rui/ui/content-placeholder";

import { contentPlaceholderVariantMap } from "@rideds/css/recipes/content-placeholder";

export default function ContentPlaceholderTypeExample() {
  return (
    <HStack gap="x3" wrap>
      {contentPlaceholderVariantMap.type.map((type) => (
        <ContentPlaceholder key={type} type={type} style={{ width: 120, height: 120 }} />
      ))}
    </HStack>
  );
}

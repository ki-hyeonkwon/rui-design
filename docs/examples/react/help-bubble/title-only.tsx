import { IconSparkle2 } from "@karrotmarket/react-multicolor-icon";
import { Icon } from "@rui/react";
import { HelpBubbleAnchor } from "rui/ui/help-bubble";

export default function HelpBubbleTitleOnly() {
  return (
    <HelpBubbleAnchor open title="Title Only">
      <Icon svg={<IconSparkle2 />} />
    </HelpBubbleAnchor>
  );
}

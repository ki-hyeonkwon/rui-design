import { IconFaceSmileCircleFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@rui/react";
import { ReactionButton } from "rui/ui/reaction-button";

export default function ReactionButtonDisabled() {
  return (
    <ReactionButton disabled>
      <PrefixIcon svg={<IconFaceSmileCircleFill />} />
      비활성
    </ReactionButton>
  );
}

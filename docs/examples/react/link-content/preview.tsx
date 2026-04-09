import { IconChevronRightLine } from "@karrotmarket/react-monochrome-icon";
import { LinkContent, SuffixIcon } from "@rideds/react";

export default function LinkContentPreview() {
  return (
    <LinkContent>
      새 글
      <SuffixIcon svg={<IconChevronRightLine />} />
    </LinkContent>
  );
}

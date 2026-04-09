import { IdentityPlaceholder as SeedIdentityPlaceholder } from "@rideds/react";
import * as React from "react";

export interface IdentityPlaceholderProps extends SeedIdentityPlaceholder.RootProps {}

/**
 * @see https://rui-design.io/react/components/identity-placeholder
 */
export const IdentityPlaceholder = React.forwardRef<HTMLDivElement, IdentityPlaceholderProps>(
  (props, ref) => {
    return (
      <SeedIdentityPlaceholder.Root {...props} ref={ref}>
        <SeedIdentityPlaceholder.Image />
      </SeedIdentityPlaceholder.Root>
    );
  },
);
IdentityPlaceholder.displayName = "IdentityPlaceholder";

import { Grid } from "@rideds/react";
import { IdentityPlaceholder } from "rui/ui/identity-placeholder";

export default function IdentityPlaceholderPreview() {
  return (
    <Grid columns={2} gap="x4">
      <IdentityPlaceholder identity="person" />
      <IdentityPlaceholder identity="business" />
    </Grid>
  );
}

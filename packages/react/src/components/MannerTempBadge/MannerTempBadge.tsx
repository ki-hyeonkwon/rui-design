import {
  mannerTempBadge,
  type MannerTempBadgeVariantProps,
} from "@rui/css/recipes/manner-temp-badge";
import { Primitive, type PrimitiveProps } from "@rui/react-primitive";
import type * as React from "react";
import { createRecipeContext } from "../../utils/createRecipeContext";

const { withContext } = createRecipeContext(mannerTempBadge);

////////////////////////////////////////////////////////////////////////////////////

export interface MannerTempBadgeProps
  extends MannerTempBadgeVariantProps,
    PrimitiveProps,
    React.HTMLAttributes<HTMLSpanElement> {}

export const MannerTempBadge = withContext<HTMLSpanElement, MannerTempBadgeProps>(Primitive.span);

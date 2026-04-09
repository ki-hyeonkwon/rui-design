import { Primitive, type PrimitiveProps } from "@rui/react-primitive";
import { fab, type FabVariantProps } from "@rui/css/recipes/fab";
import type * as React from "react";
import { createRecipeContext } from "../../utils/createRecipeContext";

const { withContext } = createRecipeContext(fab);

////////////////////////////////////////////////////////////////////////////////////

/**
 * @deprecated Use `ContextualFloatingButton` instead.
 */
export interface FabProps
  extends FabVariantProps,
    PrimitiveProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * @deprecated Use `ContextualFloatingButton` instead.
 */
export const Fab = withContext<HTMLButtonElement, FabProps>(Primitive.button);

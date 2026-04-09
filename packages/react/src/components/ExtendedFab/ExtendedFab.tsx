import { Primitive, type PrimitiveProps } from "@rui/react-primitive";
import { extendedFab, type ExtendedFabVariantProps } from "@rui/css/recipes/extended-fab";
import { createRecipeContext } from "../../utils/createRecipeContext";

const { withContext } = createRecipeContext(extendedFab);

////////////////////////////////////////////////////////////////////////////////////

/**
 * @deprecated Use `ContextualFloatingButton` instead.
 */
export interface ExtendedFabProps
  extends ExtendedFabVariantProps,
    PrimitiveProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * @deprecated Use `ContextualFloatingButton` instead.
 */
export const ExtendedFab = withContext<HTMLButtonElement, ExtendedFabProps>(Primitive.button, {
  defaultProps: {
    variant: "neutralSolid",
    size: "medium",
  },
});

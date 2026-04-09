import { Primitive, type PrimitiveProps } from "@rui/react-primitive";
import { skeleton, type SkeletonVariantProps } from "@rui/css/recipes/skeleton";
import type * as React from "react";
import { createRecipeContext } from "../../utils/createRecipeContext";
import { withStyleProps, type StyleProps } from "../../utils/styled";

const { withContext } = createRecipeContext(skeleton);

export interface SkeletonProps
  extends SkeletonVariantProps,
    PrimitiveProps,
    Pick<StyleProps, "height" | "width">,
    Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {}

export const Skeleton = withContext<HTMLDivElement, SkeletonProps>(withStyleProps(Primitive.div));

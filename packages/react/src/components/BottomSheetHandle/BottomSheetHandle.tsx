import { Primitive, type PrimitiveProps } from "@rideds/react-primitive";
import { Drawer } from "@rideds/react-drawer";
import { bottomSheetHandle } from "@rideds/css/recipes/bottom-sheet-handle";
import React from "react";
import clsx from "clsx";

export interface BottomSheetHandleProps
  extends PrimitiveProps,
    React.HTMLAttributes<HTMLDivElement> {}

export const BottomSheetHandle = React.forwardRef<HTMLDivElement, BottomSheetHandleProps>(
  ({ className, ...props }, ref) => {
    const classNames = bottomSheetHandle();

    return (
      <Drawer.Handle ref={ref} className={clsx(classNames.root, className)} {...props}>
        <Primitive.div aria-hidden="true" className={classNames.touchArea} />
      </Drawer.Handle>
    );
  },
);

BottomSheetHandle.displayName = "BottomSheetHandle";

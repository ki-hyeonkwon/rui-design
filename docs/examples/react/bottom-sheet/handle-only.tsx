import { ActionButton } from "rui/ui/action-button";
import {
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetRoot,
  BottomSheetTrigger,
} from "rui/ui/bottom-sheet";

const BottomSheetHandleOnly = () => {
  return (
    <BottomSheetRoot handleOnly>
      <BottomSheetTrigger asChild>
        <ActionButton variant="neutralSolid">Open</ActionButton>
      </BottomSheetTrigger>
      <BottomSheetContent showHandle title="제목" description="설명을 작성할 수 있어요">
        <BottomSheetBody>Content</BottomSheetBody>
        <BottomSheetFooter>
          <ActionButton variant="neutralSolid">확인</ActionButton>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheetRoot>
  );
};

export default BottomSheetHandleOnly;

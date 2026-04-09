import { ResponsivePair } from "@rui/react";
import { useState } from "react";
import { ActionButton } from "rui/ui/action-button";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogRoot,
  AlertDialogTitle,
} from "rui/ui/alert-dialog";

const AlertDialogControlled = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionButton variant="neutralSolid" onClick={() => setOpen(true)}>
        열기
      </ActionButton>
      <AlertDialogRoot open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>주의</AlertDialogTitle>
            <AlertDialogDescription>이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <ResponsivePair gap="x2">
              <AlertDialogAction variant="neutralWeak" onClick={() => setOpen(false)}>
                취소
              </AlertDialogAction>
              <AlertDialogAction variant="neutralSolid" onClick={() => setOpen(false)}>
                확인
              </AlertDialogAction>
            </ResponsivePair>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
};

export default AlertDialogControlled;

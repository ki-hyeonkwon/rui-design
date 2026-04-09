import { useState } from "react";
import { ToggleButton } from "rui/ui/toggle-button";

export default function ToggleButtonBrandSolid() {
  const [pressed, setPressed] = useState(false);

  return (
    <ToggleButton variant="brandSolid" pressed={pressed} onPressedChange={setPressed}>
      {pressed ? "선택됨" : "미선택"}
    </ToggleButton>
  );
}

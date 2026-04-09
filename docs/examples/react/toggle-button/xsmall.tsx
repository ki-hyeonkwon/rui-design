import { useState } from "react";
import { ToggleButton } from "rui/ui/toggle-button";

export default function ToggleButtonXsmall() {
  const [pressed, setPressed] = useState(false);

  return (
    <ToggleButton size="xsmall" pressed={pressed} onPressedChange={setPressed}>
      {pressed ? "선택됨" : "미선택"}
    </ToggleButton>
  );
}

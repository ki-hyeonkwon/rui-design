import { TextField, TextFieldInput } from "rui/ui/text-field";

export default function TextFieldPreview() {
  return (
    <TextField label="라벨">
      <TextFieldInput autoFocus />
    </TextField>
  );
}

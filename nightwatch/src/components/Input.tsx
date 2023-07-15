import { InputBase } from "@mui/material";

interface Props {
  disabled?: boolean;
  placeholder: string;
  value: string;
  onChange: (newText: string) => void;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  disabled = false,
}: Props) => {
  return (
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

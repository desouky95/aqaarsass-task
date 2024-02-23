import { PropsWithChildren } from "react";

type FormControlProps = {
  label?: string;
};

export const FormControl = ({
  children,
  label,
}: PropsWithChildren<FormControlProps>) => (
  <div>
    <label>{label}</label>
    {children}
  </div>
);

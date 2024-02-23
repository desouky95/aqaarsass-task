import * as RadixSelect from "@radix-ui/react-select";
import { ComponentProps, ReactElement } from "react";
import styles from "./Select.module.css";
import { MdKeyboardArrowDown } from "react-icons/md";

type SelectProps<T = string> = Omit<
  ComponentProps<typeof RadixSelect.Root>,
  "children"
> & {
  children:
    | Array<ReactElement<typeof RadixSelect.Item>>
    | ReactElement<typeof RadixSelect.Item>;
  selected?: string;
  label?: string;
};

export const Select = <T,>({
  children,
  selected,
  label,
  ...props
}: SelectProps<T>) => {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger className={styles.trigger}>
        <RadixSelect.Value>{selected ?? "الكل"}</RadixSelect.Value>
        <RadixSelect.Icon className={styles.icon}>
          <MdKeyboardArrowDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content position="popper" className={styles.content}>
          <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

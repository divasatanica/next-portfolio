import { cn } from "@/lib/utils";
import { CSSProperties, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const presetClassName = "rounded-md p-6";
const presetStyle: CSSProperties = {
  border: "1px solid hsl(var(--secondary))",
};

export function Box(props: IProps) {
  const { className, style = {}, children } = props;
  return (
    <section
      className={cn(presetClassName, className)}
      style={{ ...presetStyle, ...style }}
    >
      {children}
    </section>
  );
}

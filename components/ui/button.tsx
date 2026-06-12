import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

function classes(variant: Variant, size: Size, fullWidth?: boolean, extra?: string) {
  return [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : "",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = BaseProps & Omit<ComponentProps<"button">, "className">;

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={classes(variant, size, fullWidth, className)} {...props}>
      {children}
    </button>
  );
}

type LinkButtonProps = BaseProps &
  Omit<ComponentProps<typeof Link>, "className">;

export function LinkButton({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={classes(variant, size, fullWidth, className)} {...props}>
      {children}
    </Link>
  );
}

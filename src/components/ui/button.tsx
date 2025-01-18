import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger";
}

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-6 py-2 rounded-full font-medium transition-colors",
        variant === "danger" && "bg-red-600 text-white rounded",
        className,
      )}
      {...props}
    />
  );
};

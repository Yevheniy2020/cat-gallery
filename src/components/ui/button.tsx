import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = ({
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md transition-colors",
        variant === "primary" && "bg-blue-500 hover:bg-blue-600 text-white",
        variant === "secondary" && "bg-gray-200 hover:bg-gray-300",
        className,
      )}
      {...props}
    />
  );
};

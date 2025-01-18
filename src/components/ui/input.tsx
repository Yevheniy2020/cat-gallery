import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "primary" | "secondary";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "primary", className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "block w-full px-3 py-2 rounded-md text-sm",
          "bg-zinc-800 text-white placeholder-gray-400 ",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "border border-gray-700",
          variant === "primary" && [
            "focus:ring-gray-400",
            "hover:border-gray-600",
            "focus:border-gray-500",
          ],
          variant === "secondary" && [
            "focus:ring-gray-600",
            "hover:border-gray-500",
            "focus:border-gray-400",
          ],
          className,
        )}
        {...props}
      />
    );
  },
);

export default Input;

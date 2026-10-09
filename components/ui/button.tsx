import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const variants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: { default: "bg-cyan-300 text-slate-950 hover:bg-cyan-200 shadow-[0_0_28px_rgba(103,232,249,.15)]", secondary: "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.09]", ghost: "text-slate-300 hover:bg-white/[0.06] hover:text-white" },
    size: { default: "h-12 px-6", sm: "h-9 px-4 text-xs", lg: "h-14 px-7 text-base" }
  }, defaultVariants: { variant: "default", size: "default" }
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof variants> { asChild?: boolean; }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(variants({ variant, size, className }))} {...props} />;
});
Button.displayName = "Button";

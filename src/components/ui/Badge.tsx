import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "purple" | "cyan" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
}) => {
  const variantStyles = {
    default: "bg-neutral-800 text-neutral-300 border-neutral-700",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    purple: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    outline: "bg-transparent text-neutral-300 border-white/10",
  };

  const dotColors = {
    default: "bg-neutral-400",
    success: "bg-emerald-400 animate-pulse",
    warning: "bg-amber-400 animate-pulse",
    danger: "bg-rose-400 animate-pulse",
    purple: "bg-indigo-400",
    cyan: "bg-cyan-400",
    outline: "bg-neutral-400",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};

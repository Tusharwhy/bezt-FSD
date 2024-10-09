import React from "react";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  className = "",
}) => {
  const baseClasses =
    "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600";
  const classes = `${baseClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

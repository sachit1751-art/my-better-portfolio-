import React, { forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'jellyfish';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  children,
  style,
  href,
  target,
  rel,
  disabled,
  ...props
}, ref) => {
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-8 px-3.5 text-xs font-mono',
    md: 'h-11 px-5 sm:px-6 py-2.5 text-sm sm:text-base font-body',
    lg: 'h-13 px-7 sm:px-8 py-3.5 text-base sm:text-lg font-body',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[var(--c-btn-bg)] text-[var(--c-btn-text)] border border-transparent shadow-sm hover:bg-[var(--c-btn-bg-hover)] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98]',
    secondary:
      'bg-[var(--c-input-bg)] text-[var(--c-heading)] border border-[var(--c-border)] shadow-sm hover:border-[var(--c-heading)] hover:bg-[var(--c-card-gradient-from)] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] font-medium',
    ghost:
      'bg-transparent text-[var(--c-heading)] hover:bg-[var(--c-input-bg)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    outline:
      'bg-transparent text-[var(--c-heading)] border border-[var(--c-border)] hover:border-[var(--c-border-focus)] hover:bg-[var(--c-input-bg)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] font-mono text-xs uppercase tracking-wider',
    jellyfish:
      'jellyfish-btn bg-transparent font-handwriting text-base font-bold',
  };

  const baseClasses =
    'group inline-flex items-center justify-center gap-2 select-none outline-none rounded-[var(--radius-md)] cursor-pointer transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-[var(--c-border-focus)] disabled:opacity-50 disabled:pointer-events-none';

  const combinedClass = `${baseClasses} ${sizeClasses[size]} ${variantStyles[variant]} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClass}
        style={style}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={combinedClass}
      style={style}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

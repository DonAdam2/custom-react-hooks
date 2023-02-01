import ConditionalWrapper from '@/js/components/shared/ConditionalWrapper';
import GradientTextColor from '@/js/components/GradientTextColor';

const Button = ({
  label,
  icon,
  iconPosition = 'left',
  className,
  variant = 'primary',
  size = 'default',
  round,
  fluid,
  isGradient = false,
  type = 'button',
  ...rest
}) => (
  <button
    className={`button ${round ? 'round' : ''} ${fluid ? 'fluid' : ''} ${variant} ${size} ${
      className ?? ''
    }`}
    type={type}
    {...rest}
  >
    <ConditionalWrapper
      initialWrapper={(children) => <>{children}</>}
      condition={!!icon}
      wrapper={(children) => (
        <span
          className="button-content"
          style={{
            flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
            gap: !label ? 0 : 5,
          }}
        >
          {children}
        </span>
      )}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <ConditionalWrapper
        initialWrapper={(children) => <span className="button-label">{children}</span>}
        condition={isGradient}
        wrapper={(children) => (
          <GradientTextColor unset={variant === 'primary'}>{children}</GradientTextColor>
        )}
      >
        {label}
      </ConditionalWrapper>
    </ConditionalWrapper>
  </button>
);

export default Button;

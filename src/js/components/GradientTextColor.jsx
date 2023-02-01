const GradientTextColor = ({ children, unset = false, className = '' }) => (
  <span className={`${unset ? '' : 'gradient-text-color'} ${className}`}>{children}</span>
);

export default GradientTextColor;

const ChevronRightIcon = ({ className = '', isGradient = false, onClick }) => (
  <svg
    className={className}
    width="9"
    height="16"
    viewBox="0 0 9 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M0.999999 1L8 8L1 15"
      stroke={isGradient ? 'url(#paint0_linear_1540_1997)' : '#64748B'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1540_1997"
        x1="4.5"
        y1="15"
        x2="4.5"
        y2="1"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="var(--theme-primary-light)" />
        <stop offset="1" stopColor="var(--theme-primary-dark)" />
      </linearGradient>
    </defs>
  </svg>
);

export default ChevronRightIcon;

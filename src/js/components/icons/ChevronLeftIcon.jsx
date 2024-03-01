const ChevronLeftIcon = ({ className = '', isGradient = false, onClick }) => (
  <svg
    className={className}
    width="9"
    height="14"
    viewBox="0 0 9 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M8 15L1 8L8 1"
      stroke={isGradient ? 'url(#paint0_linear_1540_500)' : '#64748B'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1540_500"
        x1="4.5"
        y1="1"
        x2="4.5"
        y2="15"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="var(--theme-primary-light)" />
        <stop offset="1" stopColor="var(--theme-primary-dark)" />
      </linearGradient>
    </defs>
  </svg>
);

export default ChevronLeftIcon;

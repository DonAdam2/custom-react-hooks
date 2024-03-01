const ChevronDoubleRightIcon = ({ className = '', isGradient = false, onClick }) => (
  <svg
    className={className}
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M9 1L16 8L9 15M1 1L8 8L1 15"
      stroke={isGradient ? 'url(#paint0_linear_1799_298)' : '#64748B'}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1799_298"
        x1="1"
        y1="8"
        x2="16"
        y2="8"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="var(--theme-primary-light)" />
        <stop offset="1" stopColor="var(--theme-primary-dark)" />
      </linearGradient>
    </defs>
  </svg>
);

export default ChevronDoubleRightIcon;

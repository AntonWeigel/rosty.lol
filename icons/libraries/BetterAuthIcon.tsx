import * as React from 'react';

export const BetterAuthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 6.75H12.5V18.25H24V29.75H12.5V41.25H1V29.75V18.25V6.75ZM35.5 29.75V18.25H24V6.75H35.5H47V18.25V29.75V41.25H35.5H24V29.75H35.5Z"
      className="fill-secondary-dark dark:fill-primary-light"
    />
  </svg>
);

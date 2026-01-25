import * as React from 'react';

export const ShadcnUiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
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
      d="M41.125 24.875L24.875 41.125"
      className="stroke-secondary-dark dark:stroke-primary-light"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M37.875 7L7 37.875"
      className="stroke-secondary-dark dark:stroke-primary-light"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

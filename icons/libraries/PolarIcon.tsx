import * as React from 'react';

export const PolarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M24 44C12.9543 44 4 35.0456 4 24C4 12.9543 12.9543 4 24 4C35.0456 4 44 12.9543 44 24C44 35.0456 35.0456 44 24 44Z"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-secondary-dark dark:stroke-primary-light"
    />
    <path
      d="M24 44C19.5817 44 16 35.0456 16 24C16 12.9543 19.5817 4 24 4C28.4182 4 32 12.9543 32 24C32 35.0456 28.4182 44 24 44Z"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-secondary-dark dark:stroke-primary-light"
    />
    <path
      d="M18 42C12 40 10 31.222 10 25C10 18.7781 13 11 20 6"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-secondary-dark dark:stroke-primary-light"
    />
    <path
      d="M30 6C36 8 38 16.7781 38 23C38 29.222 35 37 28 42"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-secondary-dark dark:stroke-primary-light"
    />
  </svg>
);

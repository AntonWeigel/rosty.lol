import * as React from 'react';

export const IndieHackersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      width="24"
      height="24"
      rx="12"
      className="fill-primary-light dark:fill-secondary-dark"
    />
    <path
      d="M4.66602 6.5H7.41602V17.5H4.66602V6.5Z"
      className="fill-primary-dark dark:fill-primary-light"
    />
    <path
      d="M10.166 6.5H12.916V10.625H16.5827V6.5H19.3327V17.5H16.5827V13.375H12.916V17.5H10.166V6.5Z"
      className="fill-primary-dark dark:fill-primary-light"
    />
  </svg>
);

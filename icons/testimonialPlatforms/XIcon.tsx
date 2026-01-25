import * as React from 'react';

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.9983 12.0006C23.9983 18.0629 19.5059 23.0748 13.6698 23.8881C13.1242 23.9638 12.5659 24.0033 11.9992 24.0033C11.345 24.0033 10.7026 23.9512 10.0771 23.8502C4.36379 22.9301 0 17.9746 0 12.0006C0 5.37141 5.37276 -0.00292969 12 -0.00292969C18.6272 -0.00292969 24 5.37141 24 12.0006H23.9983Z"
      className="fill-primary-light dark:fill-secondary-dark"
    />
    <path
      d="M4.86651 5.29053L10.4007 12.6918L4.83203 18.7096H6.08568L10.9615 13.4412L14.9007 18.7096H19.1661L13.3208 10.892L18.5044 5.29053H17.2508L12.7608 10.1426L9.13276 5.29053H4.86734H4.86651ZM6.70955 6.21401H8.66864L17.3214 17.7861H15.3623L6.70955 6.21401Z"
      className="fill-primary-dark dark:fill-primary-light"
    />
  </svg>
);

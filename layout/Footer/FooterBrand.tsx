import * as React from 'react';

export const FooterBrand: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-secondary-dark dark:text-neutral flex flex-col items-center gap-3 text-xs sm:flex-row sm:items-start sm:gap-2">
      <span>Copyright © {currentYear} - All rights reserved</span>
      <span className="hidden sm:block">-</span>
      <span>
        Built with{' '}
        <a
          href="https://asaasin.dev"
          className="hover:bg-fire underline hover:bg-clip-text hover:text-transparent"
        >
          aSaaSin
        </a>
      </span>
    </div>
  );
};

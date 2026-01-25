'use client';

import * as React from 'react';

type CopyButtonProps = {
  textToCopy: string;
};

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      // Reset the button text after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-accent text-primary-light hover:bg-accent/80 absolute top-3 right-3 rounded-md px-2 py-1 text-xs opacity-0 shadow-sm transition-all duration-200 group-hover:opacity-100"
    >
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

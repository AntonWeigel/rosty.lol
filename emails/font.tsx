import { Font as ReactEmailFont } from '@react-email/components';
import * as React from 'react';

const Font: React.FC = () => {
  return (
    <ReactEmailFont
      fontFamily="Inter"
      fallbackFontFamily="sans-serif"
      webFont={{
        url: 'https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcviYwYZ8UA3.woff2',
        format: 'woff2',
      }}
      fontWeight="400 700"
    />
  );
};

export default Font;

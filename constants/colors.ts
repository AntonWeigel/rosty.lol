export const HexColors = {
  highlight: '#ffc233',
  accent: '#7a5cfa',
  neutral: '#b8bec9',
  'primary-dark': '#1f212c',
  'secondary-dark': '#2c2e3a',
  'primary-light': '#f5f5f5',
  'secondary-light': '#ebebeb',
  success: '#3a9d7a',
  destructive: '#de5245',
} as const;

export type ColorToken = keyof typeof HexColors;

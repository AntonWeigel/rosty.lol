export const Screen = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type ScreenKey = keyof typeof Screen;
export type ScreenValue = (typeof Screen)[ScreenKey];

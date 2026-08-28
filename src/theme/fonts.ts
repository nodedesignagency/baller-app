/**
 * Open Runde (SIL OFL 1.1) — see assets/fonts/LICENSE.txt.
 * Keys here are the family names to pass to `fontFamily`.
 */
export const fonts = {
  medium: 'OpenRunde-Medium',
  semibold: 'OpenRunde-Semibold',
  bold: 'OpenRunde-Bold',
} as const;

export const fontAssets = {
  [fonts.medium]: require('../../assets/fonts/OpenRunde-Medium.otf'),
  [fonts.semibold]: require('../../assets/fonts/OpenRunde-Semibold.otf'),
  [fonts.bold]: require('../../assets/fonts/OpenRunde-Bold.otf'),
};

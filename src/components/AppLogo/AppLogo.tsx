import { ImgHTMLAttributes } from 'react';

type TAppLogoProps = ImgHTMLAttributes<HTMLImageElement> & {
  width?: number | string;
  height?: number | string;
};

export function AppLogo({ width, height, ...props }: TAppLogoProps) {
  return (
    <img
      alt="logo"
      src="/assets/logos/logo.png"
      style={{
        width: width ?? 100,
        height: height ?? 100,
        display: 'inline-block',
      }}
      {...props}
    />
  );
}

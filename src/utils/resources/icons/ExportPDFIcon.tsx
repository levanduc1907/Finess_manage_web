import * as React from 'react';

export function ExportPDFIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.14 4.54a4.18 4.18 0 00-1.45-.67c-.36-.1-.73-.15-1.11-.15h-3.72c-.58 0-.62-.05-.93-.46L9.53 1.4C8.88.53 8.37 0 6.74 0H4.42C1.98 0 0 1.98 0 4.42v11.16C0 18.02 1.98 20 4.42 20h11.16c2.44 0 4.42-1.98 4.42-4.42V8.14c0-1.49-.73-2.8-1.86-3.6zm-5.75 9.8H7.6c-.39 0-.69-.31-.69-.7 0-.38.3-.7.69-.7h4.79c.39 0 .7.32.7.7 0 .39-.31.7-.7.7z"
        fill="currentColor"
      />
    </svg>
  );
}

import { forwardRef, Ref, SVGAttributes } from 'react';

export const RepoHeaderHexagon = forwardRef(
  (props: SVGAttributes<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg
      width="628"
      height="348"
      viewBox="0 0 628 348"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={props.className}
      ref={ref}
    >
      <path
        d="M627.051 174V290.393C627.051 300.459 619.57 308.956 609.585 310.232L316.535 347.676C314.852 347.891 313.148 347.891 311.465 347.676L18.4144 310.232C8.42986 308.956 0.949226 300.459 0.949235 290.393L0.949341 174L0.949248 57.6071C0.94924 47.5414 8.42987 39.0441 18.4144 37.7684L311.465 0.323896C313.148 0.108841 314.852 0.108839 316.535 0.323895L609.585 37.7684C619.57 39.0442 627.051 47.5415 627.051 57.6071V174Z"
        fill="#1E1F2E"
      />
    </svg>
  ),
);

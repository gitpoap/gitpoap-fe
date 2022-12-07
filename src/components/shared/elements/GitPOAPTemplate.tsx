import { forwardRef, Ref, SVGAttributes } from 'react';

export const GitPOAPTemplate = forwardRef(
  (
    props: SVGAttributes<SVGSVGElement> & {
      fill: string;
    },
    ref: Ref<SVGSVGElement>,
  ) => (
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      ref={ref}
      {...props}
    >
      <path d="M250,0C111.93,0,0,111.93,0,250S111.93,500,250,500,500,388.07,500,250,388.07,0,250,0ZM405.89,400,302,460Q250,490,198,460L94.11,400q-52-30-52-90V190q0-60,52-90L198,40Q250,10,302,40l103.93,60q52,30,52,90V310Q457.85,370,405.89,400Z" />
    </svg>
  ),
);

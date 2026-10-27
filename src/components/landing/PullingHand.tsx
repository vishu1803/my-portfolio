import { forwardRef } from "react";

/** Original ink illustration, drawn in the contact stage's 1000 × 410 coordinate system. */
const PullingHand = forwardRef<SVGGElement>(function PullingHand(_, ref) {
  return (
    <g
      ref={ref}
      className="pulling-hand"
      stroke="#18181a"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M-25 200 165 180 219 344-25 391Z"
        fill="#18181a"
        strokeWidth="2"
      />
      <path
        d="m-20 215 160-19 42 128-202 48"
        fill="none"
        stroke="#77756e"
        strokeWidth="1"
      />
      <path d="m160 182 33-12 61 150-36 26Z" fill="#f7f5ee" strokeWidth="2" />
      <path d="m178 178 54 151M185 177l55 148" fill="none" strokeWidth="0.7" />
      <path
        d="M194 181c26-10 48-26 72-43 20-15 36-29 58-33 30-6 55-3 82-12 18-6 32-13 40-4 9 10-4 21-21 26l-83 31c29-5 56-10 83-12 17-2 37-11 46-2 11 12-7 21-24 25l-95 28c31-2 57-7 84-5 16 1 40-5 44 7 4 11-12 18-31 20l-89 17c25 2 46 2 66 9 17 5 36 10 32 22-4 11-23 9-40 6l-68-5c-26 2-43 24-65 38l-35 23Z"
        fill="#f7f5ee"
        strokeWidth="2.3"
      />
      <path
        d="M246 295c16-11 27-25 40-38 16-16 31-27 50-34 17-6 31-5 35 6 5 12-10 23-23 30l-22 17c-6 20-23 39-44 48l-32 11"
        fill="#f7f5ee"
        strokeWidth="2.1"
      />
      <path
        d="M237 194c18-9 32-20 45-33m-23 55c17-12 30-24 40-37m-21 53c8-7 16-10 24-12m-43 80c8-4 13-10 16-16m45-52c9 4 15 11 17 18m-42 21c-1 10 2 17 7 23M316 119l8 12m18-18 6 12m-28 38 7 11m17-17 5 11m-20 32 4 11m17-14 3 9m-6 29 2 9m-51-91 8 5m-24 32 8 6"
        fill="none"
        strokeWidth="0.85"
      />
      <path
        d="m400 96 6 12m41 28 2 13m5 35 1 13m-22 41-4 12M210 189l18 45m-13-44 18 44m-13-44 17 44m-13-45 18 44m-12-46 17 43M252 302l13 20m-8-25 13 23m-7-27 12 25m-6-29 12 26m-6-31 12 29"
        fill="none"
        strokeWidth="0.6"
        opacity="0.6"
      />
      <circle cx="204" cy="307" r="4" fill="#18181a" strokeWidth="0" />
      <circle cx="202.5" cy="305.5" r="0.8" fill="#f7f5ee" strokeWidth="0" />
    </g>
  );
});
export default PullingHand;

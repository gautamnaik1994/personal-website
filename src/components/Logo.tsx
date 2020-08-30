import React from 'react';

interface Props {
  className?: string;
}

export default ({ className }: Props) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 128 230"
  >
    <path
      fill="url(#paint0_linear)"
      d="M127.86 52.172c0 28.815-23.359 52.173-52.173 52.173H62.971c4.102-19.251 16.565-37.792 39.997-56.475-25.685 7.392-45.232 31.28-58.33 56.475l-37.727.001A6.912 6.912 0 010 97.434V6.912A6.911 6.911 0 016.911 0h68.52L75.688 0c28.814 0 52.173 23.358 52.173 52.172z"
    />
    <path
      fill="url(#paint1_linear)"
      d="M35.094 125.655H13.823c-6.516 0-9.774 0-11.799 2.024C0 129.703 0 132.962 0 139.478v76.699c0 6.516 0 9.774 2.024 11.799C4.05 230 7.307 230 13.823 230h61.864c28.814 0 52.173-23.358 52.173-52.173 0-28.814-23.359-52.172-52.173-52.172h-14c.1 1.221.229 2.447.385 3.676 3.609 28.509-28.667 35.824-37.01 36.77.489-9.372 3.862-24.272 10.032-40.446z"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="3.674"
        x2="6.981"
        y1="0"
        y2="230"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00D7CE" />
        <stop offset="1" stopColor="#0084FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="3.674"
        x2="6.981"
        y1="0"
        y2="230"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00D7CE" />
        <stop offset="1" stopColor="#0084FF" />
      </linearGradient>
    </defs>
  </svg>
);

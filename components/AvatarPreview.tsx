"use client";
import React from "react";
import { AnimatedTooltip } from "./AnimationToolTip";
const people = [
  {
    id: 1,
    name: "Dylan Tchokouani",
    designation: "Founder | CTO",
    image:
      "https://media.licdn.com/dms/image/D4E03AQEnnJLtHEQifA/profile-displayphoto-shrink_200_200/0/1690031850559?e=1715212800&v=beta&t=NIyWLoXl-KWH_MpdMl6JbfjBNVlu9KD0YsMcWYJf5rU",
  },
  {
    id: 2,
    name: "Nick Kengne",
    designation: "Software Developer",
    image:
      "https://media.licdn.com/dms/image/D4E03AQHoYuHtv3Nvjg/profile-displayphoto-shrink_200_200/0/1679762828176?e=1715212800&v=beta&t=IU2W_h1Pj3_fZgRsMhSdvzgButMUGH1VE3vP2tIIUiY",
  },
  {
    id: 3,
    name: "Saah nembot jules",
    designation: "ML Engineer | AI/ML",
    image:
      "https://media.licdn.com/dms/image/D4E03AQErR5kx2b7gGg/profile-displayphoto-shrink_200_200/0/1704522836968?e=1718236800&v=beta&t=heidUyqdKUl4eTLCRrDUxsmiWhCCXtgJBsgTF_o9OUo",
  }
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 ">
      <AnimatedTooltip items={people} />
    </div>
  );
}

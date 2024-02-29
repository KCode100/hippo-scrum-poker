"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../ui/text-reveal-card";

export function TextRevealCardSection() {
  return (
    <div className="w-full bg-hippo-brand-navy">
      <TextRevealCard
        text="Hide your estimates"
        revealText="Reveal team insights"
      >
        {/* <TextRevealCardTitle>
          Sometimes, you just need a consensus.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          This is a text reveal card. Hover over the card to reveal the hidden
          text.
        </TextRevealCardDescription> */}
        
      </TextRevealCard>
    </div>
  );
}

"use client";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export function CardsSection() {
  return (
    <div className="flex flex-wrap gap-x-6 max-w-screen-xl mx-auto justify-center items-center px-4 pb-16 lg:pb-20">
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card border-black/[0.1] h-auto rounded-xl p-6 border w-full">
          <CardItem
            translateZ="50"
            className="text-4xl text-center w-full font-semibold text-neutral-600"
          >
            Collaboration
          </CardItem>
          <CardItem translateZ="100" className="w-full">
            <img src="/fists.png" alt="illustration of fists" width={150} className="m-auto" />
          </CardItem>
        </CardBody>
      </CardContainer>
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card border-black/[0.1] h-auto rounded-xl p-6 border w-full">
          <CardItem
            translateZ="50"
            className="text-4xl text-center w-full font-semibold text-neutral-600"
          >
            Sprint planning
          </CardItem>
          <CardItem translateZ="100" className="w-full">
            <img src="/graph.png" alt="illustration of graph" width={150} className="m-auto" />
          </CardItem>
        </CardBody>
      </CardContainer>
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card border-black/[0.1] h-auto rounded-xl p-6 border w-full">
          <CardItem
            translateZ="50"
            className="text-4xl text-center w-full font-semibold text-neutral-600"
          >
            Estimation
          </CardItem>
          <CardItem translateZ="100" className="w-full">
            <img src="/magnify.png" alt="illustration of magnifying glass" width={150} className="m-auto" />
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}

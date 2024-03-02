"use client";
import React from "react";
import { ButtonGroup } from "rsuite";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

const CreatePetAllStep = () => {
  const [step, setStep] = React.useState(0);
  const onChange = (nextStep: number) => {
    setStep(nextStep < 0 ? 0 : nextStep > 1 ? 1 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  return (
    <div className="text-center">
      <div className="py-10">
        {step === 0 && <FirstStep />}
        {step === 1 && <SecondStep />}
      </div>
      <ButtonGroup className="pb-5">
        <button
          className="border-2 border-primary px-4 py-2 mr-2 rounded-full"
          onClick={onPrevious}
          disabled={step === 0}
        >
          Previous
        </button>
        <button
          className="border-2 border-primary px-4 py-2 rounded-full"
          onClick={onNext}
          disabled={step === 1}
        >
          Next
        </button>
      </ButtonGroup>
    </div>
  );
};

export default CreatePetAllStep;

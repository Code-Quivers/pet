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
    <div className="md:max-w-screen-md md:mx-auto min-h-screen">
      <div className="pt-10 pb-5">
        {step === 0 && <FirstStep />}
        {step === 1 && <SecondStep />}
      </div>
      <div className="flex justify-end">
        <ButtonGroup className="pb-5 px-5">
          <button
            className={`${
              step === 0 ? "hidden" : ""
            }  hover:text-cyan-600 hover:underline px-4 py-2 font-bold text-gray-700 transition-all duration-300 ease-in-out delay-0`}
            onClick={onPrevious}
            disabled={step === 0}
          >
            Previous
          </button>
          <button
            className="bg-white text-right border hover:bg-gray-50 hover:text-cyan-600 hover:border-cyan-300 border-gray-300 shadow px-4 py-2 rounded-lg font-bold text-gray-700 transition-all duration-300 ease-in-out delay-0"
            onClick={onNext}
            disabled={step === 1}
          >
            Submit
          </button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CreatePetAllStep;

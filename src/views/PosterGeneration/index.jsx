import { useState } from "react";
import { UseContextProvider } from "~/components/contexts/StepperContext";
import Stepper from "~/components/stepper";
import StepperControl from "~/components/stepperControl";
import Background from "~/components/steps/Background";
import Text from "~/components/steps/Text";
import Final from "~/components/steps/Final";
import Heading from "~/components/home/heading";
import Paragraph from "~/components/home/paragraph";
import Additionals from "~/components/steps/Additionals";
import Caption from "~/components/steps/Caption";
import Hashtag from "~/components/steps/Hashtag";
import Sidebar from "~/components/sidebar";



function PosterGeneration() {
  const [currentStep, setCurrentStep] = useState(1);

  const [insights,setInsights] = useState(false);
  const [dashboard,setDashboard] =useState(true);

  const steps = [
    "Background",
    "Text",
    "Additionals",
    "Caption",
    "Hashtag",
    "Complete",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Background />;
      case 2:
        return <Text />;
      case 3:
        return <Additionals />;
      case 4:
        return <Caption/>;
      case 5:
        return <Hashtag/>;
      case 6:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <section className="p-8 bg-white text-black font-poppins">
      <div className="container mx-auto flex flex-col items-center xl:max-w-3xl">
        <Heading content={"Create Post"} />
        <Paragraph content={"Start creating poster in just few steps"} />
      </div>
      
      <div className="flex justify-center sm:space-x-16 md:space-x-32">
        <div className="hidden sm:block">
            <Sidebar insights={insights} setInsights={setInsights} dashboard={dashboard} setDashboard={setDashboard}  />
        </div>
        {
          dashboard ===true?
          <div className="flex-1 ">
        
        <div className="w-full max-w-md  ">

          {/* Stepper */}
          <div className="horizontal container">

            <Stepper steps={steps} currentStep={currentStep} />

            <div className="my-10 p-10">
              <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
            </div>
          </div>

          {/* navigation button */}
          {currentStep !== steps.length && (
            <StepperControl
              handleClick={handleClick}
              currentStep={currentStep}
              steps={steps}
            />
          )}
        </div>
      </div>
          :<>
          <div className="flex-1 ">
            <div className="w-full   dark:bg-gray-900 dark:text-gray-100">
              <div className="horizontal container">
                <div className="text-2xl text-black  font-poppins">
                    Insights
                </div>
              </div>
            </div>
          </div>
          </>
        }
        
      </div>

      
    </section>

  );
}

export default PosterGeneration;

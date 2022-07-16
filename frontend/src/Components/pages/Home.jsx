import React from "react";
import FeatureForm from "../shared/FeatureForm";
import FeatureRequest from "../shared/FeatureRequest";

const Home = () => {
  return (
    <section className="flex flex-wrap pt-10 justify-center lg:justify-start">
      <div className="max-w-md md:w-full lg:w-4/12 ">
        <FeatureForm />
      </div>
      <div className="mt-10 lg:mt-0 lg:w-8/12">
        <FeatureRequest />
      </div>
    </section>
  );
};

export default Home;

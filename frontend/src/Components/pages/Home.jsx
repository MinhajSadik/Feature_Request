import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeatures } from "../../redux/features/featureSlice";
import FeatureDetails from "../shared/FeatureDetails";
import FeatureForm from "../shared/FeatureForm";

const Home = () => {
  const { user, isAuth } = useSelector((state) => ({ ...state.user }));
  // console.log(isAuth);
  const dispatch = useDispatch();
  const { features, loading, error } = useSelector((state) => state.feature);
  const feature = features.map((feature) => feature.title);
  console.log(features, feature, loading, error, user, isAuth);
  useEffect(() => {
    dispatch(getAllFeatures());
  }, [dispatch]);

  return (
    <section className="flex flex-wrap pt-10 justify-center lg:justify-start">
      <div className=" max-w-md md:w-full lg:w-4/12">
        <FeatureForm />
      </div>
      <div className="w-full mt-10 lg:mt-0 lg:w-8/12">
        <FeatureDetails />
        {/* <FeatureRequest /> */}
      </div>
    </section>
  );
};

export default Home;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeatures } from "../../redux/features/featureSlice";
import FeatureDetails from "./FeatureDetails";

const FeatureRequest = () => {
  // const { user, isAuth } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();
  const { features } = useSelector((state) => state.feature);
  // const feature = features.map((feature) => feature.userId?.name);
  // console.log(features, feature, loading, error);
  useEffect(() => {
    dispatch(getAllFeatures());
  }, [dispatch]);

  return (
    <div className="container">
      {features &&
        features?.map((feature) => (
          <FeatureDetails key={feature._id} feature={feature} />
        ))}
    </div>
  );
};

export default FeatureRequest;

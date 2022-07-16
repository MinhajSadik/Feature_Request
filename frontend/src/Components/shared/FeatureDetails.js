import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FeatureDetails = ({ feature }) => {
  const { user, isAuth, loading, error } = useSelector((state) => ({
    ...state.user,
    ...state.feature,
  }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <>
      {/* {error && <p>Error: {error}</p>} */}
      {isAuth && (
        <div className="p-8">
          <div className="w-full lg:max-w-full lg:flex">
            <div
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{
                backgroundImage: `url(${feature.logo})`,
              }}
              title={feature.title}
            ></div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <p className="text-sm text-gray-800 flex items-center font-bold">
                  <svg
                    className="fill-current text-gray-500 w-3 h-3 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  {feature.status}
                </p>
                <h4 className="text-gray-900 font-bold text-xl mb-2 flex">
                  {feature?.title}
                </h4>
                <p
                  className="text-gray-800 text-base flex text-start"
                  style={{ width: "83vh" }}
                >
                  {feature?.description}
                </p>
                <span className="text-gray-500 ">
                  {moment(feature.createdAt).format(
                    "ddd, DD MMM YYYY. hh:mm a"
                  )}
                </span>
              </div>
              <div className="flex justify-end">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={
                    feature?.userId?.avatar ||
                    "https://tailwindcss.com/img/card-top.jpg"
                  }
                  alt={feature?.userId?.name}
                  title={feature?.userId?.name}
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">
                    {feature?.userId?.name}
                  </p>
                  <p className="text-gray-600">
                    {moment(feature.userId.createdAt).startOf().fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureDetails;

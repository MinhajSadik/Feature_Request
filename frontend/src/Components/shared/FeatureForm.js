import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addNewFeature } from "../../redux/features/featureSlice";

const initialState = {
  title: "",
  description: "",
  logo: "",
  status: "under_review",
};

const FeatureForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { id } = useParams()
  const { user } = useSelector((state) => ({ ...state.user }));
  const [featureData, setFeatureData] = useState(initialState);

  const { title, description, logo, status } = featureData;

  const uploadImage = async (e) => {
    const imageData = new FormData();
    imageData.set("key", process.env.REACT_APP_IMGBB_API_KEY);
    imageData.append("image", e.target.files[0]);
    fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imageData,
    })
      .then((res) => res.json())
      .then((data) => {
        setFeatureData({ ...featureData, logo: data.data.url });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFeatureData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && logo && status) {
      const newFeatureData = {
        ...featureData,
        userId: user?.result?._id,
      };
      dispatch(addNewFeature({ newFeatureData, navigate, toast }));
      setFeatureData(initialState);
      toast.success(`${title} has been published!`);
      navigate("/");
    }
  };

  return (
    <div className="md:ml-8 mt-8 sticky top-20 z-0">
      <div className="bg-gray-200 max-w-sm p-3 rounded-lg">
        <h2 className="text-xl text-center">Feature Request</h2>
        <p className="text-center my-4">
          Let us know what features you'd like to see on App!
        </p>
        <form className="" onSubmit={handleSubmit}>
          <div className="px-4 py-2 bg-white">
            {/* title */}
            <div className="flex mt-3 flex-col p-2 pb-3 rounded-md bg-gray-100 items-start">
              <label
                htmlFor="title"
                className="uppercase text-gray-500 text-sm"
              >
                Title
              </label>
              <input
                type="title"
                name="title"
                id="title"
                value={title}
                onChange={onInputChange}
                title="Enter a short title or descriptive"
                className="text-gray-500 bg-transparent focus:outline-none placeholder-gray-400 w-full"
                placeholder="Enter a Short, descriptive title"
              />
            </div>

            {/* description */}
            <div className="flex mt-3 flex-col p-2 pb-3 rounded-md bg-gray-100 items-start">
              <label
                htmlFor="details"
                className="uppercase text-gray-500 text-sm"
              >
                Details
              </label>
              <textarea
                rows={4}
                name="description"
                id="description"
                value={description}
                onChange={onInputChange}
                title="Detailed description of the feature"
                className="text-gray-500 bg-transparent focus:outline-none  placeholder-gray-400 w-full"
                placeholder="Any additional details"
              ></textarea>
            </div>

            {/* file updoad area */}
            <div className="mt-3 flex justify-center px-1 pt-1 pb-1 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {featureData.logo && (
                  <div className="w-10 h-10 rounded-md shadow-lg text-center mx-auto overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={featureData.logo}
                      alt="featureImage"
                    />
                  </div>
                )}
                <div className="flex flex-end text-sm text-gray-600">
                  <label
                    htmlFor="file"
                    className=" cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file"
                      type="file"
                      name="file"
                      value={logo.file}
                      onChange={uploadImage}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 bg-gray-50 text-right sm:px-6">
            <button
              // type="submit"
              style={{ backgroundColor: "#3f2f3f" }}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Request Feature
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeatureForm;

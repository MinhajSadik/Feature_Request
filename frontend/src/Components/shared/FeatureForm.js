import { axios } from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewFeature } from "../../redux/features/featureSlice";

const initialState = {
  title: "",
  description: "",
  logo: "",
};

const FeatureForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => ({ ...state.user }));
  const [featureData, setFeatureData] = useState(initialState);

  const { title, description, logo } = featureData;

  const uploadImage = async (e) => {
    const imageData = new FormData();
    imageData.set("key", process.env.REACT_APP_IMGBB_API_KEY);
    imageData.append("image", e.target.files[0]);
    await axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((res) => {
        setFeatureData({ ...featureData, logo: res.data.data.url });
      })
      .catch((err) => {
        console.log(err);
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

    if (title && description && logo) {
      const newFeatureData = {
        ...featureData,
        userId: user?.result?._id,
      };
      dispatch(addNewFeature({ newFeatureData, navigate, toast }));
      setFeatureData(initialState);
      toast.success(`${title} has been added!`);
      navigate("/features");
    }
  };

  return (
    <div className="md:grid md:grid-cols-3 md:gap-6 ml-8 mt-8">
      <div className="bg-gray-200 max-w-sm p-3 rounded-lg">
        <h2 className="text-xl text-center">Feature Request</h2>
        <p className="text-center my-4">
          Let us know what features you'd like to see on App!
        </p>
        <form className="" onSubmit={handleSubmit}>
          <div className="px-4 py-2 bg-white">
            {/* title */}
            <div className="flex mt-3 flex-col p-2 pb-3 rounded-md bg-gray-100">
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
                className="text-gray-500 bg-transparent focus:outline-none placeholder-gray-400  "
                placeholder="Enter a Short, descriptive title"
              />
            </div>

            {/* description */}
            <div className="flex mt-3 flex-col p-2 pb-3 rounded-md bg-gray-100">
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
                className="text-gray-500 bg-transparent   focus:outline-none  placeholder-gray-400"
                placeholder="Any additional details"
              ></textarea>
            </div>

            {/* file updoad area */}
            <div className="mt-3 flex justify-center px-1 pt-1 pb-1 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="True"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      name="file"
                      value={logo}
                      onChange={uploadImage}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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

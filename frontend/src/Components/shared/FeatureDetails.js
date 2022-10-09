import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  commentOnFeature,
  voteOnFeature,
} from "../../redux/features/featureSlice";

const FeatureDetails = ({ feature }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [showComment, setShowComment] = useState(false);
  const { user, isAuth, error } = useSelector((state) => ({
    ...state.user,
    ...state.feature,
  }));

  const typeComment = (e) => {
    setComment(e.target.value);
  };

  const handleComment = (featureId) => {
    const commentData = {
      user: user?.result?._id,
      message: comment,
    };
    dispatch(commentOnFeature({ commentData, featureId, toast }));
    setComment("");
  };

  const handleVote = (featureId) => {
    //check if user is already voted
    if (feature?.votes?.find((vote) => vote === user?.result?._id)) {
      return toast.error("You have already voted on this feature");
    } else {
      const userId = user?.result?._id;
      dispatch(voteOnFeature({ featureId, userId, toast }));
    }
  };

  const handleCommentToggle = (e) => {
    if (isAuth) {
      setShowComment(!showComment);
    } else {
      toast.error("You must be logged in to comment");
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <>
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
                  {moment(feature?.createdAt).format(
                    "ddd, DD MMM YYYY. hh:mm a"
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={feature?.userId?.avatar || feature?.logo}
                  alt={feature?.userId?.name}
                  title={feature?.userId?.name}
                />
                <div className="text-sm">
                  <p className="text-gray-900 leading-none">
                    {feature?.userId?.name}
                  </p>
                  <p className="text-gray-600">
                    {moment(feature?.userId?.createdAt).startOf().fromNow()}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="mr-2 relative">
                  <button className="" onClick={() => handleVote(feature._id)}>
                    🔼
                  </button>
                  <span className="absolute -top-1 left-3 bg-gray-500 text-white rounded-full px-1 text-xs ">
                    {feature?.votes?.length}
                  </span>
                </div>
                <button onClick={handleCommentToggle} className="relative mx-2">
                  <span>💬</span>
                  <span className="absolute -top-1 left-3 bg-gray-500 text-white rounded-full px-1 text-xs">
                    {feature?.comments?.length}
                  </span>
                </button>
              </div>
            </div>
          </div>
          {showComment &&
            feature?.comments?.map((comment) => (
              <div
                key={comment._id}
                className=" rounded-md text-gray-600 pt-1 my-2"
              >
                <div className="space-x-2">
                  <div className="block">
                    <div className="bg-gray-300 w-auto rounded-xl px-2 pb-2">
                      <div className="font-medium">
                        <small>{comment?.user?.name}</small>
                      </div>
                      <div className="text-xs">{comment.message}</div>
                    </div>
                    <div className="flex justify-start items-center text-xs w-full">
                      <div className="font-semibold text-gray-700 px-2 flex items-center justify-center space-x-1">
                        <small>
                          {moment(comment.createdAt).startOf().fromNow()}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {showComment && (
            <div>
              <form action="">
                <div className="flex mt-3 flex-col p-2 pb-3 rounded-md bg-gray-100">
                  <label
                    htmlFor="comment"
                    className="uppercase text-gray-500 text-sm"
                  >
                    comment
                  </label>
                  <textarea
                    name="comment"
                    value={comment}
                    onChange={typeComment}
                    rows="3"
                    id="comment"
                    className="text-gray-500 bg-transparent   focus:outline-none  placeholder-gray-400"
                    placeholder="Write a comment.."
                  ></textarea>
                </div>
                <div className="flex justify-center mt-3 items-center">
                  <button
                    type="button"
                    onClick={() => handleComment(feature._id)}
                    className="px-3 bg-indigo-600 font-bold text-white hover:bg-indigo-700 py-2 rounded cursor-pointer uppercase text-sm"
                  >
                    comment
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FeatureDetails;

import React, { useState } from "react";
import {
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createFeed } from "../../state/Feed/feedSlice";

const FeedCreatePage = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  const [feedData, setFeedData] = useState({
    mediaUrl: [],
    description: "",
    platform: "",
    usernameOrName: "",
    location: "",
    categories: "",
    subCategories: [],
  });

  const handleSubmit = async () => {
    const formData = new FormData();

    feedData.mediaUrl.forEach((file) => {
      formData.append("mediaUrl", file);
    });

    formData.append("description", feedData.description);
    formData.append("platform", feedData.platform);
    formData.append("usernameOrName", feedData.usernameOrName);
    formData.append("location", feedData.location);
    formData.append("categories", feedData.categories);

    // Convert array to comma-separated string or send as JSON string
    formData.append("subCategories", JSON.stringify(feedData.subCategories));

    const response = await dispatch(createFeed(formData));
    console.log(response);
  };

  const handlePlatformClick = (name) => {
    setFeedData((prev) => ({ ...prev, platform: name }));
  };

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 5 - feedData.mediaUrl.length;

    if (files.length > remainingSlots) {
      alert("You can only upload up to 5 media files in total.");
      return;
    }

    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    setFeedData((prev) => ({
      ...prev,
      mediaUrl: [...prev.mediaUrl, ...validFiles],
    }));
  };

  // const handleURLChange = async (e) => {
  //   const inputUrl = e.target.value;
  //   setUrl(inputUrl);
  //   setImagePreview(""); // reset on new input
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedData((prev) => ({
      ...prev,
      [name]:
        name === "subCategories"
          ? value.split(",").map((v) => v.trim())
          : value,
    }));
  };

  return (
    <div className="flex w-full h-[47vw] justify-center items-center p-4">
      <div
        className={`w-full h-full max-w-8xl flex flex-col bg-white rounded-2xl shadow-md p-8 space-y-6 `}
      >
        {/* Back Button */}
        <button className="text-2xl mb-2" onClick={() => navigate(-1)}>
          <IoMdArrowBack />
        </button>
        {/* URL Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter URL"
            // value={url}
            // onChange={handleURLChange}
            className="flex-grow p-3 border rounded"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
        <div className="flex justify-center items-center w-full h-full gap-4">
          <div className="flex-1 flex-col gap-2">
            <div
              onClick={handleAreaClick}
              className="w-full h-[30vw] border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {feedData.mediaUrl.length > 0 ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? feedData.mediaUrl.length - 1 : prev - 1
                      );
                    }}
                    className="absolute left-2 bg-white rounded-full shadow p-2 z-10 hover:bg-gray-200"
                  >
                    ←
                  </button>

                  {feedData.mediaUrl[currentImageIndex].type.startsWith(
                    "image/"
                  ) ? (
                    <img
                      src={URL.createObjectURL(
                        feedData.mediaUrl[currentImageIndex]
                      )}
                      alt={`Media ${currentImageIndex + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(
                        feedData.mediaUrl[currentImageIndex]
                      )}
                      className="max-h-full max-w-full object-contain"
                      muted
                      controls={false}
                      autoPlay={false}
                      onLoadedMetadata={(e) => e.target.pause()} // pause immediately on load
                    />
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) =>
                        prev === feedData.mediaUrl.length - 1 ? 0 : prev + 1
                      );
                    }}
                    className="absolute right-2 bg-white rounded-full shadow p-2 z-10 hover:bg-gray-200"
                  >
                    →
                  </button>
                </div>
              ) : (
                <span className="text-gray-500">Click to upload image</span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleMediaChange}
              accept="image/*,video/*"
              multiple
              className="hidden"
            />
          </div>

          <div className="flex-1 gap-4 flex flex-col justify-center h-full ">
            {/* Platform Name */}
            <input
              name="platform"
              type="text"
              placeholder="Platform"
              value={feedData.platform}
              onChange={handleChange}
              readOnly
              className="w-full p-3 border rounded bg-gray-100 cursor-not-allowed"
            />

            {/* Platform Icons */}
            <div className="flex flex-wrap justify-evenly items-center gap-4">
              <span
                onClick={() => handlePlatformClick("DV")}
                className="font-medium cursor-pointer"
              >
                DV
              </span>
              <FaLinkedin
                onClick={() => handlePlatformClick("LinkedIn")}
                className="text-blue-700 text-3xl cursor-pointer hover:scale-110"
              />
              <FaXTwitter
                onClick={() => handlePlatformClick("X")}
                className="text-black text-3xl cursor-pointer hover:scale-110"
              />
              <FaInstagram
                onClick={() => handlePlatformClick("Instagram")}
                className="text-pink-600 text-3xl cursor-pointer hover:scale-110"
              />
              <FaYoutube
                onClick={() => handlePlatformClick("Youtube")}
                className="text-red-600 text-3xl cursor-pointer hover:scale-110"
              />
              <FaFacebook
                onClick={() => handlePlatformClick("Facebook")}
                className="text-blue-600 text-3xl cursor-pointer hover:scale-110"
              />
            </div>

            {/* Other fields */}
            <input
              name="usernameOrName"
              type="text"
              placeholder="Username"
              onChange={handleChange}
              value={feedData.usernameOrName}
              className="w-full p-3 border rounded"
            />
            <div className="w-full flex justify-end"></div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                name="categories"
                onChange={handleChange}
                value={feedData.categories}
                type="text"
                placeholder="Category"
                className="w-full sm:w-1/2 p-3 border rounded"
              />
              <input
                name="subCategories"
                onChange={handleChange}
                value={feedData.subCategories}
                type="text"
                placeholder="SubCategory"
                className="w-full sm:w-1/2 p-3 border rounded"
              />
            </div>
            <input
              name="location"
              type="text"
              onChange={handleChange}
              value={feedData.location}
              placeholder="Location"
              className="w-full p-3 border rounded"
            />
            {/* <input
              name="title"
              type="text"
              placeholder="Title"
              onChange={handleChange}
              value={feedData.title}
              className="w-full p-3 border rounded"
            /> */}

            {/* Description */}
            <input
              name="description"
              type="text"
              placeholder="Description"
              onChange={handleChange}
              value={feedData.description}
              className="w-full p-3 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCreatePage;

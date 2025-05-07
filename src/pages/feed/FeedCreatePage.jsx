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

const FeedCreatePage = () => {
  const [platformName, setPlatformName] = useState("");
  const [url, setUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const handlePlatformClick = (name) => {
    setPlatformName(name);
  };

  const handleURLChange = async (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    setPreviewImage(""); // reset on new input

    try {
      const res = await fetch(
        `https://api.linkpreview.net/?key=YOUR_API_KEY&q=${inputUrl}`
      );
      const data = await res.json();
      if (data && data.image) {
        setPreviewImage(data.image);
      }
    } catch (error) {
      console.error("Failed to fetch link preview:", error);
    }
  };

  return (
    <div className="flex w-full h-[45vw] justify-center items-center p-4">
      <div
        className={`w-full max-w-7xl bg-white rounded-2xl shadow-md p-8 space-y-6 `}
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
            value={url}
            onChange={handleURLChange}
            className="flex-grow p-3 border rounded"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full sm:w-auto">
            Submit
          </button>
        </div>

        {/* If previewImage exists, display it on the left */}
        {previewImage ? (
          <div className="flex justify-center items-center w-full gap-4">
            <div className="flex-1">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-[25vw] rounded-md "
              />
            </div>

            <div className="flex-1 space-y-4">
              {/* <h1 className="text-center">OR</h1> */}

              {/* Description */}
              <input
                type="text"
                placeholder="Description"
                className="w-full p-3 border rounded"
              />

              {/* Platform Name */}
              <input
                type="text"
                placeholder="Platform Name"
                value={platformName}
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
                  onClick={() => handlePlatformClick("Twitter")}
                  className="text-black text-3xl cursor-pointer hover:scale-110"
                />
                <FaInstagram
                  onClick={() => handlePlatformClick("Instagram")}
                  className="text-pink-600 text-3xl cursor-pointer hover:scale-110"
                />
                <FaYoutube
                  onClick={() => handlePlatformClick("YouTube")}
                  className="text-red-600 text-3xl cursor-pointer hover:scale-110"
                />
                <FaFacebook
                  onClick={() => handlePlatformClick("Facebook")}
                  className="text-blue-600 text-3xl cursor-pointer hover:scale-110"
                />
              </div>

              {/* Other fields */}
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 border rounded"
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full p-3 border rounded"
              />
              <input
                type="file"
                className="w-full sm:w-1/2 p-3 border rounded"
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Category"
                  className="w-full sm:w-1/2 p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="SubCategory"
                  className="w-full sm:w-1/2 p-3 border rounded"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* When there's no previewImage, keep the original design */}
            <h1 className="text-center">OR</h1>

            {/* Description */}
            <input
              type="text"
              placeholder="Description"
              className="w-full p-3 border rounded"
            />

            {/* Platform Name */}
            <input
              type="text"
              placeholder="Platform Name"
              value={platformName}
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
                onClick={() => handlePlatformClick("Twitter")}
                className="text-black text-3xl cursor-pointer hover:scale-110"
              />
              <FaInstagram
                onClick={() => handlePlatformClick("Instagram")}
                className="text-pink-600 text-3xl cursor-pointer hover:scale-110"
              />
              <FaYoutube
                onClick={() => handlePlatformClick("YouTube")}
                className="text-red-600 text-3xl cursor-pointer hover:scale-110"
              />
              <FaFacebook
                onClick={() => handlePlatformClick("Facebook")}
                className="text-blue-600 text-3xl cursor-pointer hover:scale-110"
              />
            </div>

            {/* Other fields */}
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full p-3 border rounded"
            />
            <input type="file" className="w-full sm:w-1/4 p-3 border rounded" />
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Category"
                className="w-full sm:w-1/2 p-3 border rounded"
              />
              <input
                type="text"
                placeholder="SubCategory"
                className="w-full sm:w-1/2 p-3 border rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedCreatePage;

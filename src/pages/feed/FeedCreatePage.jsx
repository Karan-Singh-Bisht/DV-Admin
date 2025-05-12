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

const FeedCreatePage = () => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const [platformName, setPlatformName] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handlePlatformClick = (name) => {
    setPlatformName(name);
  };

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleURLChange = async (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    setImagePreview(""); // reset on new input
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
            value={url}
            onChange={handleURLChange}
            className="flex-grow p-3 border rounded"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full sm:w-auto">
            Submit
          </button>
        </div>
        {/* If previewImage exists, display it on the left */}
        <div className="flex justify-center items-center w-full h-full gap-4">
          <div className="flex-1 flex-col gap-2">
            <div
              onClick={handleAreaClick}
              className="w-full h-[25vw] border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-gray-500">Click to upload image</span>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="flex-1 gap-4 flex flex-col justify-center h-full ">
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
            <div className="w-full flex justify-end"></div>
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
      </div>
    </div>
  );
};

export default FeedCreatePage;

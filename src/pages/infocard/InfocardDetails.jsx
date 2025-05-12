import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const InfocardDetails = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState("avatar");

  const images = {
    avatar: "/vite.svg", // avatar
    photo: "/picture.png", // full photo
  };

  const profileDetails = [
    { label: "Page ID", value: "PG123456" },
    { label: "Username", value: "karan_singh" },
    { label: "Display Name", value: "Karan Singh" },
    { label: "Category", value: "Developer" },
    { label: "Email", value: "karan@example.com" },
    { label: "Phone Number", value: "+91 9876543210" },
    { label: "Bio", value: "Passionate MERN stack developer." },
    { label: "Location", value: "Delhi, India" },
    { label: "Company / Institution", value: "ABC Tech Pvt. Ltd." },
    { label: "Website URL", value: "https://karansingh.dev" },
    { label: "Instagram URL", value: "https://instagram.com/karan" },
    { label: "YouTube URL", value: "https://youtube.com/karan" },
    { label: "Facebook URL", value: "https://facebook.com/karan" },
    { label: "LinkedIn URL", value: "https://linkedin.com/in/karan" },
    { label: "Keywords", value: "developer, MERN, devops" },
    { label: "Geo Location", value: "28.6139° N, 77.2090° E" },
    { label: "Created On", value: "01-04-2025" },
    { label: "Latest Updated On", value: "06-05-2025" },
  ];

  return (
    <div className="flex w-full justify-center items-center p-4 mt-[1vw]">
      <div className="w-full relative max-w-8xl mx-auto bg-white rounded-xl shadow-md p-6 ">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
          <div className="flex items-center gap-3">
            <IoMdArrowBack
              className="text-2xl hover:cursor-pointer hover:text-gray-800"
              onClick={() => navigate(-1)}
            />
            <span className="text-lg font-semibold">Profile Details</span>
          </div>
          <span className="text-lg font-bold text-blue-600">Karan</span>
        </div>

        {/* Image & Details */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Left Image Section */}
          <div className="flex-1 flex flex-col relative items-center justify-center w-full">
            <img
              src={selectedImage === "avatar" ? images.avatar : images.photo}
              alt={selectedImage}
              className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setSelectedImage("avatar")}
                className={`px-4 py-2 rounded ${
                  selectedImage === "avatar"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Avatar
              </button>
              <button
                onClick={() => setSelectedImage("photo")}
                className={`px-4 py-2 rounded ${
                  selectedImage === "photo"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Photo
              </button>
            </div>
          </div>

          {/* Right Details Section */}
          <div className="flex-1 flex flex-col w-full text-gray-800">
            <div className="grid grid-cols-1 gap-4 mt-4">
              {profileDetails.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between border-b pb-3"
                >
                  <div className="font-semibold w-1/2">{item.label}</div>
                  <div className="w-full sm:w-1/2 text-gray-700 break-all">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons at Bottom Right */}
        <div className="flex justify-end mt-8 flex-wrap gap-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Approve
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Reject
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Archive
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfocardDetails;

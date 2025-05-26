import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfoCard } from "../../state/InfoCards/infoCardSlice";

const InfocardDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageId } = useParams();

  const { infoCard, loading, error } = useSelector((state) => state.infoCard);

  const [selectedImage, setSelectedImage] = useState("avatar");

  const images = {
    avatar: infoCard?.pageId?.profileImg || "/vite.svg",
    photo: infoCard?.photoUrl || "/picture.png", // adjust if photoUrl is used
  };

  useEffect(() => {
    if (pageId) {
      dispatch(getInfoCard(pageId));
    }
  }, [pageId, dispatch]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center text-red-600 p-6">{error}</div>;
  if (!infoCard) return null;

  const profileDetails = [
    { label: "Page Name", value: infoCard.pageId?.pageName },
    { label: "Username", value: infoCard.pageId?.userName },
    { label: "Display Name", value: infoCard.name },
    { label: "Category", value: infoCard.category },
    { label: "Email", value: infoCard.email },
    { label: "Phone Number", value: infoCard.phone },
    { label: "Bio", value: infoCard.bio },
    { label: "Company / Institution", value: infoCard.company },
    { label: "Website URL", value: infoCard.website },
    { label: "Instagram URL", value: infoCard.InstagramUrl },
    { label: "YouTube URL", value: infoCard.YoutubeUrl },
    { label: "Facebook URL", value: infoCard.FacebookUrl },
    { label: "LinkedIn URL", value: infoCard.LinkedinUrl },
    {
      label: "Geo Location",
      value:
        infoCard.location?.latitude && infoCard.location?.longitude
          ? `Lat: ${infoCard.location.latitude}, Lng: ${infoCard.location.longitude}`
          : "N/A",
    },
    {
      label: "Created On",
      value: new Date(infoCard.createdAt).toLocaleDateString(),
    },
    {
      label: "Latest Updated On",
      value: new Date(infoCard.updatedAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="flex w-full justify-center items-center p-4 mt-[1vw]">
      <div className="w-full relative max-w-8xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
          <div className="flex items-center gap-3">
            <IoMdArrowBack
              className="text-2xl hover:cursor-pointer hover:text-gray-800"
              onClick={() => navigate(-1)}
            />
            <span className="text-lg font-semibold">Profile Details</span>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {infoCard.name}
          </span>
        </div>

        {/* Image & Details */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
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
                    {item.value || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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

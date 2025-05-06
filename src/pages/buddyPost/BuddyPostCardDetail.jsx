import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BuddyPostCardDetail = ({ post }) => {
  const navigate = useNavigate();

  // Sample static data – replace with dynamic `post` props as needed
  const postDetails = [
    { label: "Title", value: post?.title || "My new gaming setup" },
    { label: "Description", value: post?.description || "Nice game" },
    { label: "Category", value: post?.category || "Entertainment" },
    { label: "Location", value: post?.location || "New York" },
    { label: "Saved", value: 150 },
    { label: "Shares", value: 100 },
    { label: "Created At", value: post?.createdAt || "02-05-2024" },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      {/* Header with back button and posted by */}
      <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
        <div className="flex items-center gap-3">
          <IoMdArrowBack
            className="text-2xl hover:cursor-pointer hover:text-gray-800"
            onClick={() => navigate(-1)}
          />
          <span className="text-lg font-semibold">Posted by</span>
        </div>
        <span className="text-lg font-bold text-blue-600">
          {post?.postedBy || "karan"}
        </span>
      </div>

      {/* Image & Stats */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 flex justify-center">
          <img
            src={post?.imageUrl || "/vite.svg"}
            alt="Post"
            className="rounded-lg object-cover max-h-128 w-full lg:w-[70%]"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between text-gray-700">
            <span>
              <strong>Claps:</strong> {post?.claps || 100}
            </span>
            <span>
              <strong>Remarks:</strong> {post?.remarks || 50}
            </span>
          </div>

          {/* Post Meta Details */}
          <div className="grid grid-cols-1 gap-4 mt-4 text-gray-800">
            {postDetails.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between border-b pb-3"
              >
                <div className="font-semibold w-1/2">{item.label}</div>
                <div className="w-full sm:w-1/2 text-gray-700">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-4 mt-8 border-t pt-6">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">Terminate Content:</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Non Sensitive
          </button>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">Manage Content:</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Archive
          </button>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">Delete Content:</h2>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuddyPostCardDetail;

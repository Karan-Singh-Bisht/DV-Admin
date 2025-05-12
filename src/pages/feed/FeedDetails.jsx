import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const FeedDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [editableFields, setEditableFields] = useState({
    username: "karan",
    description: "Hello",
    category: "Dance",
    location: "Delhi",
    title: "Tokyo",
  });

  const handleChange = (e) => {
    setEditableFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const feedDetails = [
    { label: "Username", name: "username", value: editableFields.username },
    { label: "Title", name: "title", value: editableFields.title },
    { label: "Category", name: "category", value: editableFields.category },
    { label: "Sub Category", value: "entertainment" || "N/A" },
    { label: "Location", name: "location", value: editableFields.location },
    { label: "Platform", value: "Instagram" || "N/A" },
    {
      label: "Description",
      name: "description",
      value: editableFields.description,
    },
  ];

  return (
    <div className="flex w-full h-[47vw] justify-center items-center p-4">
      <div className="w-full max-w-8xl mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
          <div className="flex items-center gap-3">
            <IoMdArrowBack
              className="text-2xl hover:cursor-pointer hover:text-gray-800"
              onClick={() => navigate(-1)}
            />
            <span className="text-lg font-semibold">Posted by</span>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {editableFields.username}
          </span>
        </div>

        {/* Media & Details */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1 flex justify-center">
            <img
              src={"/picture.png"}
              alt="Feed"
              className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 gap-4 mt-4 text-gray-800">
              {feedDetails.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between border-b pb-3"
                >
                  <div className="font-semibold w-1/2">{item.label}</div>
                  <div className="w-full sm:w-1/2 text-gray-700">
                    {item.name ? (
                      <input
                        type="text"
                        name={item.name}
                        value={item.value}
                        onChange={handleChange}
                        className="border px-2 py-1 rounded-md w-full"
                      />
                    ) : (
                      item.value
                    )}
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
    </div>
  );
};

export default FeedDetails;

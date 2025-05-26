import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFeedDetails } from "../../state/Feed/feedSlice";

const FeedDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { feed, loading, error } = useSelector((state) => state.feed);

  const [editableFields, setEditableFields] = useState({
    username: "",
    description: "",
    categories: "",
    location: "",
    title: "",
  });

  console.log(feed);

  // Fetch feed on mount
  useEffect(() => {
    dispatch(fetchFeedDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (feed) {
      setEditableFields({
        username: feed.usernameOrName || "NA",
        description: feed.description || "NA",
        categories: feed.categories || "NA", // assuming categories is an array
        location: feed.location || "NA",
        title: feed.title || "NA",
        link: feed.link || "NA",
      });
    }
  }, [feed]);

  const handleChange = (e) => {
    setEditableFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const feedDetails = [
    {
      label: "Platform",
      value: feed?.platform || "N/A",
    },
    {
      label: "Link",
      name: "link",
      value: editableFields.link,
    },
    { label: "Username", name: "username", value: editableFields.username },
    { label: "Category", name: "category", value: editableFields.categories },
    {
      label: "Sub Category",
      value:
        feed?.subCategories?.map((subCategory, index) => (
          <span key={index}>{subCategory}</span>
        )) || "N/A",
    },
    { label: "Location", name: "location", value: editableFields.location },
    { label: "Title", name: "title", value: editableFields.title },
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

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">Error: {error}</div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Image */}
            <div className="flex-1 flex justify-center">
              <img
                src={feed?.mediaUrl || "/picture.png"}
                alt="Feed"
                className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
              />
            </div>

            {/* Details */}
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
        )}

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

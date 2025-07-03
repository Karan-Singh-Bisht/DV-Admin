import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, deleteUser } from "../../state/User/userSlice";
import Loader from "../../components/Loader";

const BuddyDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const id = params.id;
  const [post, setPost] = useState({});
  const [sensitive, setSensitive] = useState(false);
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await dispatch(getUser(id)).unwrap();
        setPost(response);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    if (id) getUserDetails();
  }, [dispatch, id]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteUser(id));
      navigate("/users");
      // toast.success("User deleted successfully");
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });

    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex w-full h-[47vw] justify-center items-center p-4">
      <div className="w-full max-w-8xl mx-auto bg-white rounded-xl shadow-md p-6">
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
            {post?.name || "NA"}
          </span>
        </div>

        {/* Image & Stats */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1 flex justify-center">
            <img
              loading="lazy"
              decoding="async"
              src={post?.profileImg || "/vite.svg"}
              alt="Post"
              className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 gap-4 mt-4 text-gray-800">
              {Object.entries({
                "User ID": post?._id,
                "User Type": post?.usertype || "Individual",
                "Full Name": post?.name,
                Nickname: post?.username,
                Gender: post?.gender,
                DOB: post?.dob,
                Phone: post?.phoneNumber,
                Email: post?.mailAddress,
                Bio: post?.bio,
                Website: post?.link,
                "Created At": formatDate(post?.createdAt),
                "Updated At": formatDate(post?.updatedAt),
              }).map(([label, value], idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between border-b pb-3"
                >
                  <div className="font-semibold w-1/2">{label}</div>
                  <div className="w-full sm:w-1/2 text-gray-700">
                    {value || "N/A"}
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
            <button
              onClick={() => setSensitive(!sensitive)}
              className={`${
                sensitive ? "bg-red-500" : "bg-green-500"
              } text-white px-4 py-2 rounded-md`}
            >
              {sensitive ? "Sensitive" : "Non Sensitive"}
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
            <button
              onClick={() => handleDelete(id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuddyDetails;

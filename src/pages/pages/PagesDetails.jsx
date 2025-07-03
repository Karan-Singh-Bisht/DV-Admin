import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPage } from "../../state/Page/pageSlice";

const PagesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const page = useSelector((state) => state.page.page); // adjust based on your slice
  const loading = useSelector((state) => state.page.loading); // optional

  useEffect(() => {
    if (id) {
      dispatch(getPage(id));
    }
  }, [dispatch, id]);

  const postDetails = [
    { label: "PageId", value: page?.id || id },
    { label: "Pagetype", value: page?.userType || "N/A" },
    { label: "Pagename", value: page?.pageName || "N/A" },
    { label: "Username", value: page?.userName || "N/A" },
    { label: "Profession", value: page?.Category || "N/A" },
    { label: "Gender", value: page?.gender || "N/A" },
    { label: "Phone No.", value: page?.Phone || "N/A" },
    { label: "Email", value: page?.email || "N/A" },
    { label: "Bio", value: page?.Bio || "N/A" },
    { label: "Website", value: page?.Website || "N/A" },
    { label: "Created at", value: page?.createdAt.slice(0, 10) || "N/A" },
    { label: "Updated at", value: page?.updatedAt.slice(0, 10) || "N/A" },
  ];

  return (
    <div className="flex w-full h-screen justify-center items-center p-4">
      <div className="w-full max-w-8xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between border-b pb-4 mb-6 text-gray-700">
          <div className="flex items-center gap-3">
            <IoMdArrowBack
              className="text-2xl hover:cursor-pointer hover:text-gray-800"
              onClick={() => navigate(-1)}
            />
            <span className="text-lg font-semibold">Posted by</span>
          </div>
          <span className="text-lg font-bold text-blue-600">
            {page?.postedBy || "Unknown"}
          </span>
        </div>

        {/* Image & Stats */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1 flex justify-center">
            <img
              src={page?.profileImg || "/vite.svg"}
              alt="page"
              className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
            />
          </div>

          <div className="flex-1 flex flex-col">
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
    </div>
  );
};

export default PagesDetails;

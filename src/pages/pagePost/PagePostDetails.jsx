import {
  IoMdArrowBack,
  IoMdArrowForward,
  IoMdArrowBack as IoMdArrowLeft,
} from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPagePost, deletePost } from "../../state/PagePost/pagePostSlice";
import { useEffect, useState, useRef } from "react";
import Loader from "../../components/Loader";

const PagesPostDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.pagePost);
  const videoRef = useRef(null);

  // Media navigation state
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const id = params.id;

  useEffect(() => {
    const getPagePostDetails = async (id) => {
      await dispatch(getPagePost(id));
    };
    getPagePostDetails(id);
  }, [dispatch, id]);

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deletePost(id));
      if (response.meta.requestStatus === "fulfilled") {
        alert("Post deleted successfully!");
        navigate("/pagePosts");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  const post = useSelector((state) => state.pagePost.pagePost);

  // Get all media (images and videos)
  const allMedia = [
    ...(post?.media || []),
    ...(post?.coverPhoto?.path ? [post.coverPhoto] : []),
    ...(post?.video?.path ? [post.video] : []),
  ];

  const currentMedia = allMedia[currentMediaIndex];

  const handleNextMedia = () => {
    if (currentMediaIndex < allMedia.length - 1) {
      setCurrentMediaIndex((prev) => prev + 1);
      setIsPlaying(false); // Reset video state when switching
    }
  };

  const handlePrevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex((prev) => prev - 1);
      setIsPlaying(false); // Reset video state when switching
    }
  };

  const handleVideoPlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Check if current media is video
  const isVideo = (media) => {
    if (!media?.path) return false;
    const videoExtensions = [
      ".mp4",
      ".webm",
      ".ogg",
      ".avi",
      ".mov",
      ".wmv",
      ".flv",
      ".mkv",
    ];
    return videoExtensions.some((ext) =>
      media.path.toLowerCase().includes(ext)
    );
  };

  const postDetails = [
    { label: "Title", value: post?.title || "N/A" },
    { label: "Description", value: post?.description || "N/A" },
    { label: "Category", value: post?.category || "N/A" },
    { label: "Tags", value: post?.tags || [] },
    {
      label: "Created At",
      value: new Date(post?.createdAt).toLocaleString() || "N/A",
    },
  ];

  return loading ? (
    <Loader />
  ) : (
    <div className="flex w-full h-[45vw] justify-center items-center p-4">
      <div className="w-full max-w-8xl mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
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
            {post?.pageId?.userName || "karan"}
          </span>
        </div>

        {/* Image & Stats */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex-1 flex justify-center relative">
            {/* Media Display */}
            <div className="relative w-full flex justify-center">
              {currentMedia?.path ? (
                isVideo(currentMedia) ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      src={currentMedia.path}
                      className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      controls={false}
                    />
                    {/* Video Play/Pause Overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={handleVideoPlayPause}
                    >
                      <div className="bg-black bg-opacity-0 rounded-full p-4 hover:bg-opacity-70 transition-all">
                        {isPlaying ? (
                          <FaPause className="text-white hover:opacity-100 opacity-0 text-2xl" />
                        ) : (
                          <FaPlay className="text-white text-2xl ml-1" />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={currentMedia.path}
                    alt="Post"
                    className="rounded-lg object-contain max-h-128 h-[30vw] w-full lg:w-[100%]"
                  />
                )
              ) : (
                <div className="rounded-lg bg-gray-200 flex items-center justify-center h-[30vw] w-full lg:w-[100%]">
                  <span className="text-gray-500">No media available</span>
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            {allMedia.length > 1 && (
              <>
                {/* Previous Arrow */}
                {currentMediaIndex > 0 && (
                  <button
                    onClick={handlePrevMedia}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                  >
                    <IoMdArrowLeft className="text-xl" />
                  </button>
                )}

                {/* Next Arrow */}
                {currentMediaIndex < allMedia.length - 1 && (
                  <button
                    onClick={handleNextMedia}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                  >
                    <IoMdArrowForward className="text-xl" />
                  </button>
                )}
              </>
            )}

            {/* Media Counter */}
            {allMedia.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                {currentMediaIndex + 1} / {allMedia.length}
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col">
            {/* Post Meta Details */}
            <div className="grid grid-cols-1 gap-4 mt-4 text-gray-800">
              {postDetails.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between border-b pb-3"
                >
                  <div className="font-semibold w-1/2">{item.label}</div>
                  <div className="w-full sm:w-1/2 text-gray-700">
                    {Array.isArray(item.value)
                      ? item.value.join(", ")
                      : item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Media Navigation Thumbnails */}
            {allMedia.length > 1 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3 text-gray-800">
                  Media ({allMedia.length})
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allMedia.map((media, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setCurrentMediaIndex(index);
                        setIsPlaying(false);
                      }}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        index === currentMediaIndex
                          ? "border-blue-500 shadow-md"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {isVideo(media) ? (
                        <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
                          <FaPlay className="text-gray-600 text-xs" />
                          <video
                            src={media.path}
                            className="absolute inset-0 w-full h-full object-cover opacity-70"
                            muted
                          />
                        </div>
                      ) : (
                        <img
                          src={media.path}
                          alt={`Media ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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

export default PagesPostDetails;

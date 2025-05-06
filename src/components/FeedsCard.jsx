import { useNavigate } from "react-router-dom";

const FeedsCard = (props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/feeds/${props.feed.id}`)}
      className="w-full sm:w-full md:w-[48%] lg:w-[32%] xl:w-[23.8%] flex flex-col justify-between hover:cursor-pointer bg-white rounded-xl p-6 h-auto shadow-lg"
    >
      <div>
        {/* User Information */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <h1 className="font-semibold">{props.feed.username}</h1>
          <span>|</span>
          <h3>{props.feed.location}</h3>
        </div>

        {/* Post Image */}
        <div className="my-4">
          <img
            src={props.feed.media || "/vite.png"}
            alt="User post"
            className="w-full rounded-xl h-[40vw] md:h-[20vw] object-cover"
          />
        </div>
      </div>

      {/* Post Category */}
      <div className="mt-2 flex gap-2 flex-wrap items-center">
        <h1 className="font-semibold">{props.feed.category}</h1>
        {/* {props.feed?.category?.length > 2 && (
            <span key="ellipsis" className="text-md font-bold">
              ...
            </span>
          )} */}
      </div>

      {/*Subcategory */}
      <div className="flex gap-2 flex-col text-sm text-gray-400">
        <p>Subcategory : {props.feed.subCategory}</p>
        {/* <p>Rewrites:{props.feed.rewrites}</p> */}
      </div>

      {/* Post Date and Status */}
      <div className="flex justify-between items-center text-sm text-gray-400">
        <p>{props.feed.description}</p>
        <div>{props.feed.platform}</div>
      </div>
    </div>
  );
};

export default FeedsCard;

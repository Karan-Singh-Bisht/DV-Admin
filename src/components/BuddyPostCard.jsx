import { useNavigate } from "react-router-dom";

const BuddyPostCard = (props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/buddyPost/${props.buddyPost.id}`)}
      className="w-full sm:w-full md:w-[48%] lg:w-[32%] xl:w-[23.8%] flex flex-col justify-between hover:cursor-pointer bg-white rounded-xl p-6 h-auto shadow-lg"
    >
      <div>
        {/* User Information */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <h1 className="font-semibold">{props.buddyPost.name}</h1>
          <span>|</span>
          <h3>{props.buddyPost.location}</h3>
        </div>

        {/* Post Image */}
        <div className="my-4">
          <img
            src={props.buddyPost.image || "/vite.svg"}
            alt="User post"
            className="w-full rounded-xl h-[40vw] md:h-[20vw] object-cover"
          />
        </div>
      </div>

      <div>
        {/* Post Category */}
        <div className="my-2 flex gap-2 flex-wrap items-center">
          {props.buddyPost?.category?.slice(0, 2).map((c, index) => (
            <h2 key={index} className="text-md font-bold">
              {c}
            </h2>
          ))}
          {props.buddyPost?.category?.length > 2 && (
            <span key="ellipsis" className="text-md font-bold">
              ...
            </span>
          )}
        </div>

        {/* Post Stats */}
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{props.buddyPost.claps} Claps</span>
          <span>{props.buddyPost.remarks} Remarks</span>
        </div>

        {/*Reshares */}
        <div className="flex gap-2 text-sm mt-2 text-gray-400">
          <p>Spreads:{props.buddyPost.spreads}</p>
          <p>Rewrites:{props.buddyPost.rewrites}</p>
        </div>

        {/* Post Date and Status */}
        <div className="flex justify-between items-center text-sm text-gray-400">
          <p>{props.buddyPost.date}</p>
          <div
            className={`px-3 py-1 capitalize rounded-full text-white ${
              props.buddyPost.status === "Non Sensitive"
                ? "bg-green-300 text-green-800"
                : "bg-red-300 text-red-800"
            }`}
          >
            {props.buddyPost.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuddyPostCard;

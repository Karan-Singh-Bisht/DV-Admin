import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import BuddyPostCard from "../../components/BuddyPostCard";

const buddyPosts = [
  {
    id: 1,
    name: "John Doe",
    location: "New York",
    category: ["Entertainment", "Music", "fdsjklf"],
    claps: 400,
    remarks: 50,
    date: "10-02-2004",
    status: "Non-sensitive",
    image: "/tv.webp",
    spreads: 10,
    rewrites: 20,
  },
  {
    id: 2,
    name: "John Doe",
    location: "New York",
    category: ["Entertainment", "Music", "fdsjklf"],
    claps: 400,
    remarks: 50,
    date: "10-02-2004",
    status: "Non-sensitive",
    image: "/tv.webp",
    spreads: 10,
    rewrites: 20,
  },
  {
    id: 3,
    name: "John Doe",
    location: "New York",
    category: ["Entertainment", "Music", "fdsjklf"],
    claps: 400,
    remarks: 50,
    date: "10-02-2004",
    status: "Non-sensitive",
    image: "/tv.webp",
    spreads: 10,
    rewrites: 20,
  },
  {
    id: 4,
    name: "John Doe",
    location: "New York",
    category: ["Entertainment", "Music", "fdsjklf"],
    claps: 400,
    remarks: 50,
    date: "10-02-2004",
    status: "Non-sensitive",
    image: "/tv.webp",
    spreads: 10,
    rewrites: 20,
  },
];

const BuddyPost = () => {
  const Location = useLocation();
  const pageName = Location.pathname.slice(1);
  return (
    <div className="flex justify-center w-full min-h-screen items-center text-4xl text-white">
      Feature Will be available soon
    </div>
    // <div className="p-4 min-h-screen">
    //   <div className="flex justify-between items-center py-4 px-0">
    //     <Header pageName={pageName} title={"Users Hub"} />
    //   </div>
    //   <div className="flex w-full flex-wrap gap-4">
    //     {buddyPosts.map((buddyPost, index) => (
    //       <BuddyPostCard key={index} buddyPost={buddyPost} />
    //     ))}
    //   </div>
    // </div>
  );
};

export default BuddyPost;

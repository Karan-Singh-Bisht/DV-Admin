import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import PagesPostCard from "../../components/PagesPostCard";

const pagePosts = [
  {
    id: 1,
    name: "John Doe",
    location: "New York",
    category: ["Entertainment", "Music", "fdsjklf"],
    claps: 400,
    remarks: 50,
    date: "10-02-2004",
    status: "Non-sensitive",
    media: "/picture.png",
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
    media: "/picture.png",
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
    media: "/picture.png",
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
    media: "/picture.png",
    spreads: 10,
    rewrites: 20,
  },
];

const PagePost = () => {
  const Location = useLocation();
  const pageName = Location.pathname.slice(1);
  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center py-4 px-0">
        <Header
          pageName={pageName}
          title={"Users Hub"}
          subtitle={"Welcome To Buddies"}
        />
      </div>
      <div className="flex w-full flex-wrap gap-4">
        {pagePosts.map((pagePost, index) => (
          <PagesPostCard key={index} pagePost={pagePost} />
        ))}
      </div>
    </div>
  );
};

export default PagePost;

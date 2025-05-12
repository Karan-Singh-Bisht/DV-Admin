import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import SearchComponent from "../../components/SearchComponent";
import InfocardTable from "./InfocardTable";
import InfocardGrid from "./InfocardGrid";

const userInfo = [
  {
    pageId: 1,
    avatar: "/vite.svg",
    photo: "/vite.svg",
    displayName: "Ronald Ragen",
    username: "ronaldragen",
    category: "Developer",
    email: "ronald@gmail.com",
    phoneNumber: "9012798393",
    bio: "Passionate about React & Node.js",
    location: "Bangalore, India",
    organization: "QuickBazaar",
  },
  {
    pageId: 2,
    avatar: "/tv.webp",
    photo: "/vite.svg",
    displayName: "Elena Smith",
    username: "elena_smith",
    category: "Designer",
    email: "elena@gmail.com",
    phoneNumber: "9801234567",
    bio: "UX/UI Designer with 4 years experience",
    location: "Pune, India",
    organization: "DesignLabs",
  },
];

const Infocard = () => {
  const Location = useLocation();
  const pageName = Location.pathname.slice(1);

  return (
    <div className="m-[20px]">
      <div className="flex justify-between items-center">
        <Header
          pageName={pageName}
          title={"Mapo Hub"}
          subtitle={"Welcome to Infocards Management"}
        />
      </div>
      <SearchComponent
        datas={userInfo}
        placeholder="Search InfoCards"
        tableComponent={InfocardTable}
        gridComponent={InfocardGrid}
        dropdowns={[
          {
            label: "Verified",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
              { label: "Pending", value: "pending" },
            ],
          },
          {
            label: "Page Type",
            options: [
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
              { label: "Guest", value: "guest" },
            ],
          },
        ]}
      />
    </div>
  );
};

export default Infocard;

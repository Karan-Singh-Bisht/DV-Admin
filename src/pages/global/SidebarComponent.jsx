import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { IoIosPaper } from "react-icons/io";
import { MdVerifiedUser } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdEvent } from "react-icons/md";
import { PiMapPinSimpleAreaFill } from "react-icons/pi";
import { FaArchive } from "react-icons/fa";
import { ImFeed } from "react-icons/im";
import { IoIosChatbubbles } from "react-icons/io";
import { IoServer } from "react-icons/io5";
import { IoMdChatbubbles } from "react-icons/io";
import { Box, IconButton, Typography } from "@mui/material";
import { HiBars4 } from "react-icons/hi2";
import { MdPlace } from "react-icons/md";
import { LiaIdCardSolid } from "react-icons/lia";
import { useEffect } from "react";

const Item = ({ id, title, to, icon, selected, setSelected }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <MenuItem
        className={`text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200`}
        active={selected === id}
        style={{
          color: selected === id ? "white" : "gray",
        }}
        onClick={() => setSelected(id)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const SidebarComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  return (
    <div className="h-screen bg-[#0F1535]">
      <Sidebar backgroundColor="#0F1535" collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? <HiBars4 style={{ color: "white" }} /> : undefined
            }
            style={{
              margin: "10px 0 20px 0",
              color: "white",
            }}
          >
            {!isCollapsed && (
              <div className="flex items-center justify-between w-full">
                <img
                  alt="profile-user"
                  width="45px"
                  height="45px"
                  src={`/vite.svg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                <h3 className="text-3xl text-white text-center flex-1">DV</h3>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <HiBars4 style={{ color: "white" }} />
                </IconButton>
              </div>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <h3 className="text-sm ml-3 text-gray-400">MAIN</h3>
            <SubMenu
              className="text-gray-400 [&>div]:bg-[#0F1535]"
              label="Dashboard"
              icon={<FaHome />}
            >
              <Item
                id="1"
                className="hover:text-white"
                title="Analytics"
                to="/analytics"
                icon={<ImFeed />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                id="2"
                title="Ecommerce"
                to="/eCommerce"
                icon={<FaHome />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <h3 className="text-sm ml-3 mt-2 text-gray-400">USERS HUB</h3>
            <Item
              id="3"
              title="Users"
              to="/users"
              icon={<MdPeopleAlt />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="4"
              title="Pages"
              to="/pages"
              icon={<IoIosPaper />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="5"
              title="User Verification"
              to="/verification"
              icon={<MdVerifiedUser />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="6"
              title={
                <>
                  {/* Pages Verification <br /> (Business) */}
                  Business Verification
                </>
              }
              to="/businessVerification"
              icon={<MdVerifiedUser />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              id="7"
              title={
                <>
                  {/* Pages Verification <br /> (Creator) */}
                  Creator Verification
                </>
              }
              to="/creatorVerification"
              icon={<MdVerifiedUser />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              id="8"
              title="Report/Block"
              to="/report"
              icon={<MdOutlineReportProblem />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="9"
              title="Archieve"
              to="/faq"
              icon={<FaArchive />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="10"
              title="User Deactivation"
              to="/faq"
              icon={<FaArchive />}
              selected={selected}
              setSelected={setSelected}
            />
            <h3 className="text-sm ml-3 mt-2 text-gray-400">CONTENT HUB</h3>
            <Item
              id="11"
              title="Buddies Posts"
              to="/buddyPosts"
              icon={<ImFeed />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="12"
              title="Page Posts"
              to="/pagePosts"
              icon={<FaArchive />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="13"
              title="Report/Block"
              to="/faq"
              icon={<MdOutlineReportProblem />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="14"
              title="Archieve"
              to="/faq"
              icon={<FaArchive />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="15"
              title="Page Deactivation"
              to="/faq"
              icon={<FaArchive />}
              selected={selected}
              setSelected={setSelected}
            />
            <h3 className="text-sm ml-3 mt-2 text-gray-400">VISIONFEED HUB</h3>
            <Item
              id="16"
              title="Feeds"
              to="/feeds"
              icon={<ImFeed />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="17"
              title="Report/Block"
              to="/pie"
              icon={<MdOutlineReportProblem />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="18"
              title="Archieve"
              to="/faq"
              icon={<FaArchive />}
              selected={selected}
              setSelected={setSelected}
            />
            <h3 className="text-sm ml-3 mt-2 text-gray-400">MAPO HUB</h3>
            <Item
              id="19"
              title="Buddies Mapo"
              to="/buddiesMapo"
              icon={<FaMapLocationDot />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="20"
              title="PopPins"
              to="/poppins"
              icon={<PiMapPinSimpleAreaFill />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="21"
              title="Infocards"
              to="/infocards"
              icon={<LiaIdCardSolid />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="22"
              title="Places"
              to="/geography"
              icon={<MdPlace />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="23"
              title="Events"
              to="/geography"
              icon={<MdEvent />}
              selected={selected}
              setSelected={setSelected}
            />
            <h3 className="text-sm ml-3 mt-2 text-gray-400">SPACE HUB</h3>
            <Item
              id="24"
              title="User Solo"
              to="/geography"
              icon={<IoIosChatbubbles />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="25"
              title="Page Solo"
              to="/geography"
              icon={<IoMdChatbubbles />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              id="26"
              title="Servers"
              to="/geography"
              icon={<IoServer />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;

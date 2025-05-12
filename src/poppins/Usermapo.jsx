import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/mapo";
import axios from "axios";

const dummyUsers = [
  {
    id: "1",
    isUser: true,
    avatar:
      "https://ik.imagekit.io/pxc/pixel%20class_logo%20pc.png?updatedAt=1735069174018",
    avatar_title: null,
    isCreator: false,
    isverified: true,
    location: true,
    name: "Alice Johnson",
    profileId: null,
    username: "alicej",
    gender: "Female",
    profession: "Engineer",
    dob: "1990-01-01",
    phne: "+1 234 567 8901",
    mailAddress: "alice@example.com",
    bio: "Loves tech and music.",
    website: "https://alice.dev",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    isUser: true,
    avatar:
      "https://ik.imagekit.io/pxc/pixel%20class_logo%20pc.png?updatedAt=1735069174018",
    avatar_title: null,
    isCreator: true,
    isverified: false,
    location: false,
    name: "Bob Smith",
    profileId: null,
    username: "bobsmith",
    gender: "Male",
    profession: "Artist",
    dob: "1985-05-15",
    phne: "+1 987 654 3210",
    mailAddress: "bob@example.com",
    bio: "Creative mind. Coffee lover.",
    website: "https://bob.art",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const UserMapo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://devibackend-company-519990150156.asia-east1.run.app/api/users"
        );
        const sortedUsers = response.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setUsers(sortedUsers);
      } catch (err) {
        console.warn("Using dummy data due to fetch error.");
        setUsers(dummyUsers);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "User ID", width: 90 },
    { field: "username", headerName: "Username", width: 120 },
  ];

  if (loading) return <div className="load shine">Loading...</div>;
  if (error) console.log(error);

  const userRows = users.map((user, index) => ({
    _id: `DEVIAN ${index + 1}`,
    ...user,
  }));

  const handleToggleLocation = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, location: !user.location } : user
      )
    );
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Buddies</h1>
      </div>
      <DataTable
        slug="user"
        columns={columns}
        rows={userRows}
        onToggleLocation={handleToggleLocation}
      />
    </div>
  );
};

export default UserMapo;

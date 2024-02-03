import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserDisplay.css";

const UserDisplay = () => {
  // State to hold user data
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to fetch user data from API
  const fetchUserData = async () => {
    try {
      // Fetch data from API
      const response = await axios.get("https://randomuser.me/api");
      // Extract name and email from API response
      const { name, email } = response.data.results[0];
      // Set user data state with formatted name and email
      setUserData({ name: `${name.title} ${name.first} ${name.last}`, email });
      // Save user data to local storage
      localStorage.setItem("userData", JSON.stringify({ name, email }));
    } catch (error) {
      // Handle errors during fetch
      console.error("Error fetching user data:", error);
    }
  };

  // Function to refresh user data
  const refreshUser = () => {
    fetchUserData();
  };

  // JSX rendering
  return (
    <div className="container">
      {/* Heading */}
      <h1 className="heading">User Information</h1>
      {/* User info display */}
      <div className="user-info">
        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
      </div>
      {/* Refresh button */}
      <div className="button-container">
        <button className="refresh-button" onClick={refreshUser}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default UserDisplay;

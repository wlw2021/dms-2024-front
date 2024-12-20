import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditFile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { CID } = location.state || {};
  
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  const profileFetch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get_profile?CID=${CID}`);

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setProfileData(data);
        setMessage("Profile fetched successfully!");
      } else {
        const errorData = await response.json();
        setMessage(`Failed to fetch profile: ${errorData.error}`);
      }
    } catch (error) {
      setMessage("An error occurred while fetching profile. Please try again later.");
      console.error("Error during profile fetch:", error);
    }
  };

  useEffect(()=>{
    profileFetch()
  },[])

  useEffect(() => {
    if (profileData) {
      setEditedData(profileData);
    }
  }, [profileData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/update_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setMessage("Profile updated successfully!");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        setMessage(`Failed to update profile: ${errorData.error}`);
      }
    } catch (error) {
      setMessage("An error occurred while updating profile. Please try again later.");
      console.error("Error during profile update:", error);
    }
  };


  return (
    <div style={{ width: "300px", margin: "0 auto", padding: "20px", textAlign: "center",  borderRadius: "8px" }}>
     <h2>Profile Viewer</h2>
      {message && (
        <div style={{ marginTop: "15px", color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </div>
      )}
      {profileData && (
        <div style={{ marginTop: "15px", textAlign: "left" }}>
          <h3>Profile Data:</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <tbody>
              {Object.entries(editedData).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ border: "1px solid #ccc", padding: "8px", fontWeight: "bold" }}>{key}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {isEditing ? (
                      <input
                        type="text"
                        name={key}
                        value={value || ""}
                        onChange={handleInputChange}
                        style={{ width: "100%", padding: "5px" }}
                        disabled={key === "CID"}
                      />
                    ) : (
                      String(value || "")
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleEditToggle}
            style={{ width: "100%", padding: "10px", backgroundColor: isEditing ? "#f44336" : "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          {isEditing && (
            <button
              onClick={handleSaveChanges}
              style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}
            >
              Save Changes
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EditFile;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChooseFile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { CID } = location.state || {};
    const toQuote = ()=>{
        navigate('/getquote', { state: { CID : CID } })
    }
    const editFile = ()=>{
        navigate('/edit', { state: { CID : CID } })
    }

  return (
    <div style={{ width: "300px", margin: "0 auto", padding: "20px", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>ChooseFile</h2>
      <button
          onClick={toQuote}
          style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Get Quote
        </button>
        <button
          onClick={editFile}
          style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}
        >
          Edit Profile
        </button>
    </div>
  );
};

export default ChooseFile;

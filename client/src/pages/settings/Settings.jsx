import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";


export default function Setting() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/"

    const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,  //always tally key from api(users) in this case with method
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log("upload failed");
      }
    }
    try {
     const res = await axios.put("/users/"+user._id, updatedUser);  // user._id as thats the url in api/users.js
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS", payload:res.data})
    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"});
      console.log("failed to upload");
    }
  };
    return (
        <div className="settings">
            <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Profile pic</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{color: "green", textAlign: "center", marginTop: "20px"}}>Profile has been updated..!</span>}
        </form>
      </div>
      <Sidebar />
        </div>
    )
}

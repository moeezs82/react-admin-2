import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroidOutlined,
  Publish,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./user.css";

const User = () => {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/users/new">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Name Here</span>
              <span className="userShowUserTitle">Job Title</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">User Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">name007</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">11.2.2000</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">+1 234 56789</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">name@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">abc address fake street</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form action="#" className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="name007"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Name Here"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="name@gmail.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 234 56789"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="abc address fake street"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                  className="userUpdateImg"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;

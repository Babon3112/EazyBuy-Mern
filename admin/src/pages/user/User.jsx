import "./user.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PublishIcon from "@mui/icons-material/Publish";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">View User</h1>
        <Link to="/newUser"></Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.avatar ||
                "https://res.cloudinary.com/arnabcloudinary/image/upload/v1713427478/EazyBuy/Avatar/no-avatar.png"
              }
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullName}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.userName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarTodayIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroidIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.mobileNo}</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            {/* <div className="userShowInfo">
              <LocationSearchingIcon className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div> */}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={user.userName}
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  value={user.fullName}
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  value={user.mobileNo}
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={user.email}
                  className="userUpdateInput"
                  readOnly
                />
              </div>
              <div className="userUpdateItem">
                <label htmlFor="isAdmin">Is Admin</label>
                <select
                  name="isAdmin"
                  value={user.isAdmin ? "true" : "false"}
                  disabled
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    user.avatar ||
                    "https://res.cloudinary.com/arnabcloudinary/image/upload/v1713427478/EazyBuy/Avatar/no-avatar.png"
                  }
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

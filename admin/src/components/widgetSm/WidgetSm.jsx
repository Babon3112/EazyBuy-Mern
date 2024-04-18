import { useEffect, useState } from "react";
import "./widgetSm.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { userRequest } from "../../requestMethod";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data.data);
      } catch (error) {}
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img src={user.avatar ||"https://res.cloudinary.com/arnabcloudinary/image/upload/v1713427478/EazyBuy/Avatar/no-avatar.png"} className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.fullName}</span>
            </div>
            <button className="widgetSmButton">
              <VisibilityIcon className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

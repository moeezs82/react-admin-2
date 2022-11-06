import { Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./widgetSm.css";
import { userRequest } from "../../requestMethod";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/user/recent");
        setUsers(res.data.user);
        console.log(res.data.user)
      } catch (error) {
        console.log(error);
      }
    };
    getUsers()
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src={users.img || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Name Here</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src=""
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Name Here</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src={users.img || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freeiconspng.com%2Fimages%2Fno-image-icon&psig=AOvVaw2EhbC9HizUQOWyCgvUxVL-&ust=1667820222477000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKiGw9G4mfsCFQAAAAAdAAAAABAE"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Name Here</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="data:image/png;base64,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"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Name Here</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="data:image/png;base64,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"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Name Here</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WidgetSm;

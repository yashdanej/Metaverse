import React from "react";
import { Link } from "react-router-dom";

const ChatUser = ({ selectedUser, setSelectedUser, loggedId, theme, handleProfileVisit, ele, handleFollowClick }) => {
  return (
    <li className={`${selectedUser===ele._id?'active':''}`}>
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          <img
            src={`${ele.profilePic?.url}`}
            className="rounded-circle user_img"
          />
          <span className="online_icon"></span>
        </div>
        <div className="user_info">
        <span style={{cursor: 'pointer', fontSize: '16px'}} className='fw-bold' onClick={() => setSelectedUser(ele)}>{ele?.user?.username}</span>
        <br />
        <span style={{fontSize: '12px', color: `${theme?'grey':'#ecececc4'}`}}>Follower: {ele?.follower.length !== undefined? ele?.follower.length:'0'}, </span>
        <span style={{fontSize: '12px', color: `${theme?'grey':'#ecececc4'}`}}>Following: {ele?.following.length !== undefined? ele?.following.length:'0'}</span>
        </div>
      </div>
    </li>
  );
};

export default ChatUser;

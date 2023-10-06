import React from "react";
import { Link } from "react-router-dom";

const Friends = ({ loggedId, theme, handleProfileVisit, ele, handleFollowClick }) => {
  return (
    <div className={`row chatNormal align-items-center`}>
      <div className="col-3 col-sm-2 py-2">
        <img
          src={`${ele.profilePic?.url}`}
          style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: 'cover' }}
          alt=""
        />
      </div>
      <div className="col-6 col-sm-6">
        <Link className={`textDeco ${theme?'lightText':''}`} to={`/profile`}><span onClick={() => handleProfileVisit(ele._id)} className="profileName fontSize12">{ele?.user?.username}</span></Link>
        <br />
        <span style={{fontSize: '11px'}} className={`gill fontSmall ${theme?'lightText':''}`}>Follower: {ele?.follower.length !== undefined? ele?.follower.length:'0'}, </span>
        <span style={{fontSize: '11px'}} className={`gill fontSmall ${theme?'lightText':''}`}>Following: {ele?.following.length !== undefined? ele?.following.length:'0'}</span>
      </div>
      <div className='col-3 col-sm-4 d-flex justify-content-center'>
          <button onClick={() => handleFollowClick(ele._id)} className='btn fontSize12 visitProfileButton'>
          <span className={`fw-bold  ${theme?'lightText':''}`}>
            {(ele?.following?.includes(loggedId) && !ele?.follower?.includes(loggedId))?'Follow_back': 'Follow'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Friends;

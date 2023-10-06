import React from 'react'
import { TOKEN } from '../../../../constant'
import './following.css'
import { Link } from "react-router-dom";
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

const Following = ({loggedId, thisFlag, handleProfileVisit, ele, handleFollow}) => {
  const handleProfile = (id) => {
    handleProfileVisit(id);
  }
  return (
    <>
      <div className="col-3 col-sm-3 py-2">
        <img
          src={`${ele.profilePic?.url}`}
          style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: 'cover' }}
          alt=""
        />
      </div>
      <div className="col-7 col-sm-7">
        <Link className='textDeco profileName' to={`/profile`}><span onClick={() => handleProfile(ele._id)} className="fontSize12">{ele.username}</span></Link>
        <br />
        <span className="fontSize12 gill">Follower {ele?.follower.length !== undefined? ele?.follower.length:'0'}, </span>
        <span className="fontSize12 gill">Following: {ele?.following.length !== undefined? ele?.following.length:'0'}</span>
      </div>
      <div className='col-2 col-sm-2 d-flex justify-content-end'>
        <button onClick={() => handleFollow(ele._id)} className='btn fontSize12 visitProfileButton'>
          <span className='fw-bold'>{thisFlag?`${ele.follower.includes(loggedId)?'Unfollow':'Follow'}`:'Unfollow'}</span>
        </button>
      </div>
    </>
  )
}

export default Following

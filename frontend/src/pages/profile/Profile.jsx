import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getUserProfile } from '../../api'
import LeftComponent from '../../components/dashboardComponent/leftComponent/LeftComponent'
import ProfileComponent from '../../components/profile/ProfileComponent'
import './profile.css'

const Profile = ({followingUser, theme, setGetUserId, getProfile, postLiked, handleProfileUpdate, loggedUserPost, handleProfileVisit, getUserId, handleFollow, getLoggedUser, allSuggetion}) => {
  return (
    <div className='profile'>
        <div className="container">
            <div className="d-flex itemsJustify">
                <div className={`firstContainer p-4 ${theme?'firstC':''} paddingSmall`}>
                    <LeftComponent theme={theme} handleProfileUpdate={handleProfileUpdate} loggedUserPost={loggedUserPost} handleProfileVisit={handleProfileVisit} getLoggedUser={getLoggedUser} handleFollow={handleFollow} />
                </div>
                <div className={`secondContainer p-4 ${theme?'firstC':''} paddingSmall`}>
                    <ProfileComponent followingUser={followingUser} theme={theme} setGetUserId={setGetUserId} handleFollow={handleFollow} postLiked={postLiked} userId={getLoggedUser[0]?.user?._id} loggedId={getLoggedUser[0]?._id} getProfile={getProfile} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile

import axios from 'axios';
import { btoa } from 'buffer';
import React, { useEffect, useState } from 'react';
import { FollowHandle, getAllSuggetionPeoples, getLoggedInformation } from '../../api';
import CenterComponent from '../../components/dashboardComponent/centerComponent/CenterComponent';
import LeftComponent from '../../components/dashboardComponent/leftComponent/LeftComponent';
import RightComponent from '../../components/dashboardComponent/rightComponent/RightComponent';
import './dashboard.css'
const Dashboard = ({previousStory, previousStoryfn, storyStatus, setStoryStatus, seenStory, myStory, handleStoryChange, story, setStory, loading, handleDeleteComment, handleDeletePost, setChecked, theme, addComment, postLiked, handleProfileUpdate, checked, handlePostChange, loggedUserPost, followingPost, handleProfileVisit, handleFollow, getLoggedUser, allSuggetion}) => {
  return (
    <div className='dashboard'>
          {loading?'loading':
      <div style={{marginBottom: '50px'}} className={`${!checked ? 'container':''} marginBottom`}>
        <div className="d-flex itemsJustify">
          <div className={`${theme?'sideContainer sideC':'sideContainer'} ${checked?'d-none':''} p-4 paddingSmall`}>
            <LeftComponent myStory={myStory} handleDeletePost={handleDeletePost} theme={theme} handleProfileUpdate={handleProfileUpdate} loggedUserPost={loggedUserPost} handleProfileVisit={handleProfileVisit} getLoggedUser={getLoggedUser} handleFollow={handleFollow} />
          </div>
          <div className={`${theme?'sideC':''} ${theme && checked? 'sideSecondC':''} ${checked?'centerComp':'centerContainer p-4 paddingSmall'} `}>
            <CenterComponent previousStory={previousStory} previousStoryfn={previousStoryfn} storyStatus={storyStatus} setStoryStatus={setStoryStatus} seenStory={seenStory} setStory={setStory} story={story} handleDeleteComment={handleDeleteComment} setChecked={setChecked} theme={theme} handleFollow={handleFollow} checked={checked} addComment={addComment} postLiked={postLiked} handleProfileVisit={handleProfileVisit} followingPost={followingPost} getLoggedUser={getLoggedUser} />
          </div>
          <div className={`${theme?'sideContainer sideC':'sideContainer'} ${checked?'d-none':''} rightSide p-4 paddingSmall`}>
          <RightComponent
            handleStoryChange={handleStoryChange}
            theme={theme}
            handlePostChange={handlePostChange}
            getLoggedUser={getLoggedUser}
            allSuggetion={allSuggetion}
            handleFollow={handleFollow}
            handleProfileVisit={handleProfileVisit}
          />
          </div>
        </div>
      </div>
          }
    </div>
  )
}

export default Dashboard;

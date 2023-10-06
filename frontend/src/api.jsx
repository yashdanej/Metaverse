import axios from 'axios';
import { BACKEND_URL, TOKEN } from './constant';

export const getLoggedInformation = (setGetLoggedUser) => {
    const pathName = `${BACKEND_URL}/loggedPeople`;
    axios({
      url: pathName,
      method: 'get',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
      }
    }).then((res) => {
      setGetLoggedUser([res.data]);
  }).catch((err) => {
  });
}

export const getAllSuggetionPeoples = (setAllSuggetion) => {
    const pathName = `${BACKEND_URL}/people`;
    axios({
        url: pathName,
        method: 'get',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
        }
    }).then((res) => {
        setAllSuggetion(res.data);
    }).catch((err) => {
    })
}

export const FollowHandle = (userId) => {
  const pathName = `${BACKEND_URL}/people/follow/${userId}`;
  return axios({
    url: pathName,
    method: 'patch',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    return res.data.message
  }).catch((err) => {
    throw err
  })
}

export const getUserProfile = (setGetProfile, id) => {
  const pathName = `${BACKEND_URL}/posts/${id}`;
  axios({
    url: pathName,
    method: 'get',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
}).then((res) => {
  setGetProfile(res.data);
}).catch((err) => {
})
}

export const AddPostOfUser = (postFile, caption) => {
  const formData = new FormData();
  formData.append("post", postFile);
  formData.append("caption", caption);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  };

  return axios
    .post(`${BACKEND_URL}/posts`, formData, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

// add story 
export const AddStoryOfUser = (postFile) => {
  const formData = new FormData();
  formData.append("story", postFile);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  };

  return axios
    .post(`${BACKEND_URL}/story`, formData, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getFollowingPost = (setFollowingPost) => {
  const pathName = `${BACKEND_URL}/post/followingPost`;
  axios({
    url: pathName,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    setFollowingPost(res.data);
  }).catch((err) => {
  })
}

export const getLoggedUserPost = (setLoggedUserPost) => {
  const pathName = `${BACKEND_URL}/posts`;
  axios({
    url: pathName,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    setLoggedUserPost(res.data);
  }).catch((err) => {
  })
}

export const ProfileUpdate = (bio, profilePic, location, id) => {
  const formData = new FormData();
  formData.append("bio", bio);
  formData.append("profilePic", profilePic);
  formData.append("location", location);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  };

  return axios
    .patch(`${BACKEND_URL}/people/${id}`, formData, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}

export const LikedThePost = (id) => {
  const pathName = `${BACKEND_URL}/post/like/${id}`;
  return axios({
    url: pathName,
    method: 'patch',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    return res.data;
  }).catch((err) => {
    return err;
  })
}

export const CommentedPost = (id, comment) => {
  const pathName = `${BACKEND_URL}/post/${id}/comment`;
  const data ={
    comments: {
      comment: comment
    }
  };
  return axios({
    url: pathName,
    method: 'patch',
    data: data,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  })
  .then((res) => {
    return res.data;
  })
  .catch((err) => {
    throw err;
  });
}

export const handleSeen = (id) => {
  const pathName = `${BACKEND_URL}/seenstory/${id}`;
  return axios({
    url: pathName,
    method: 'patch',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => {
    throw err;
  });
}


export const getFollowingUser = (setFollowingUser) => {
  const pathName = `${BACKEND_URL}/followingPeople`;
  axios({
    url: pathName,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    setFollowingUser(res.data);
  }).catch((err) => {
  })
}

export const HandlePostDelete = (postId) => {
  const pathName = `${BACKEND_URL}/post/${postId}`;
  axios({
    url: pathName,
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    console.log('success delete');
  }).catch((err) => {
    console.log('err: ', err);
  })
}

export const HandlePostComment = (postId, commentId) => {
  const pathName = `${BACKEND_URL}/post/${postId}/comment/${commentId}`;
  axios({
    url: pathName,
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    console.log('success delete');
  }).catch((err) => {
    console.log('err: ', err);
  })
}

// story
export const handleStory = (setStory) => {
  const pathName = `${BACKEND_URL}/getstories`;
  axios({
    url: pathName,
    method: 'get',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    setStory(res.data);
}).catch((err) => {
  console.log(err);
});
}

export const previousStoryfun = (setStory) => {
  const pathName = `${BACKEND_URL}/getseenstories`;
  axios({
    url: pathName,
    method: 'get',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    setStory(res.data);
}).catch((err) => {
  console.log(err);
});
}

export const handleMyStory = (setMyStory) => {
  console.log('called');
  const pathName = `${BACKEND_URL}/getmystories`;
  axios({
    url: pathName,
    method: 'get',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
    }
  }).then((res) => {
    setMyStory(res.data);
}).catch((err) => {
  console.log(err);
});
}


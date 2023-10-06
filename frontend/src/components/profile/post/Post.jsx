import React from 'react'

const Post = ({theme, postLiked, ele, userId}) => {
  return (
    <>
        <div className="col-10 col-sm-6 col-md-6 col-lg-4 my-3">
            <div className={`card m-auto postCard ${theme?'backgroungCard colorBorder':''}`}>
                <img style={{width:'100%', height: '250px', objectFit: 'cover'}} className="imgSet" src={`${ele.post?.url}`} alt="" />
                <div className="card-body">
                    <span className={`card-text fontSize12 ${theme?'lightText':''}`}>
                    {ele.caption}
                    </span><br />
                    <span className={`${theme?'lightText':''}`} style={{cursor: 'pointer'}} onClick={() => postLiked(ele._id)}>{ele.likes.includes(userId)?<i style={{color: '#eb271a'}} className="fa-solid fa-heart"></i>:<i className="fa-regular fa-heart fontHeartColor"></i>}<span className="px-1 fontHeartColor fontSize12">{ele.likes.length}</span></span>
                    <span className={`mx-3 ${theme?'lightText':''}`}><i className="fa-regular fa-comment fontHeartColor"></i><span className="px-1 fontHeartColor fontSize12">{ele.comments.length}</span></span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Post

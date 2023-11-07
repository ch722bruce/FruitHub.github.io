import React, { useState, useEffect } from "react";
import Title from "./Title";
import "../CSS/comment.css";

export default function CommentList(fruitId) {
  let [commentList, setCommentList] = useState(null);

  useEffect(() => {
    fetch(`/api/comments/${fruitId.fruitId}`)
      .then((response) => response.json())
      .then((data) => {
        setCommentList(data)
      });
  }, [fruitId.fruitId]);

  if (!commentList) {
    return <div>Loading...</div>; // Loading state while data is being fetched
  }
  return (
    //React Fragment

    <>
      {commentList.length===0 && (<Title mainTitle="No Comments" />)}
      {commentList.length!==0 && (<div>
        <Title mainTitle="Comments" />
        <div className="container">
        {commentList.map((comment) => (
          <React.Fragment key={comment._id}>
            <div className="commentContainer">
              <span className="commentUsername">
                {comment.username}
              </span>
              <span className="commentText">
                {comment.commentText}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
      </div>)}
    </>
  );
}

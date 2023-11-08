import React, {useState, useEffect, useRef} from "react";
import Title from "./Title";
import "../CSS/comment.css";


export default function CommentList(fruitId) {
  let [commentList, setCommentList] = useState(null);
  const comment = useRef("");
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/comments/${fruitId.fruitId}`);
      const data = await response.json();
      setCommentList(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fruitId.fruitId]);

  const handleWriteComment=(e)=>{
    e.preventDefault();
    fetch("/api/comments/",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("username"),
        userId: sessionStorage.getItem("userId"),
        fruitId: fruitId.fruitId,
        text:comment.current
      })
    }).then((response)=>{
      if(response.ok){
        comment.current="";
        fetchData();
      }
    }).catch((e)=>{
      console.log(e);
    });
  }

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
      <div className="writeComment">
        <form>
            <textarea className="commentInput"
              type="text"
              value={comment.current}
              onChange={(e) => comment.current=(e.target.value)}
              placeholder="Type your comment here..."
            />
        </form>
        <button className="commentSubmit" onClick={handleWriteComment}>Submit</button>
      </div>
    </>
  );
}

import React from "react";
import CommentItem from "./CommentItem";
import "../../Css/StoryComments.css";

const StoryComments = ({ commentlist, count, activeUser }) => {
  return (
    <>
      {count !== 0 ? (
        <div className="storyComments">
          <h5>Mais relevante</h5>
          <div className="comment-Wrapper">
            {commentlist.map((comment) => {
              return (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  activeUser={activeUser}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="no-response">Nenhum comentário localizado. </div>
      )}
    </>
  );
};

export default StoryComments;

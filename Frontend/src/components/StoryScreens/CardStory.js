import React from "react";
import { Link } from "react-router-dom";
import { monthNames } from "./constants";
import { FaRegComment } from "react-icons/fa";

const Story = ({ story }) => {
  const editDate = (createdAt) => {
    const d = new Date(createdAt);
    var datestring =
      d.getDate() +
      " de " +
      monthNames[d.getMonth()] +
      " de " +
      d.getFullYear();
    return datestring;
  };

  const truncateContent = (content) => {
    const trimmedString = content.substr(0, 73);
    return trimmedString;
  };
  const truncateTitle = (title) => {
    const trimmedString = title.substr(0, 69);
    return trimmedString;
  };

  console.log(story);

  return (
    <div className="story-card">
      <Link to={`/story/${story._id}`} className="story-link">
        <img
          className=" story-image"
          src={`/storyImages/${story.image}`}
          alt={story.title}
        />
        <div className="story-content-wrapper">
          <h5 className="story-title">
            {story.title.length > 76
              ? truncateTitle(story.title) + "..."
              : story.title}
          </h5>

          <p
            className="story-text"
            dangerouslySetInnerHTML={{
              __html: truncateContent(story.content) + "...",
            }}
          ></p>
          <div className="content-wrapper">
            <p className="story-createdAt">{editDate(story.createdAt)}</p>
            <div className="comment-info-wrap">
              <FaRegComment />

              <b className="commentCount">{story.commentCount}</b>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Story;

import React, { useEffect, useState, useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsThreeDots, BsBookmarkFill, BsBookmarkPlus } from "react-icons/bs";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const ReadListStoryItem = ({ story, editDate, setReadList }) => {
  const [storyReadListStatus, setStoryReadListStatus] = useState(false);
  const [activeUser, setActiveUser] = useState({});
  const [wasRemoved, serWasRemoved] = useState(false);
  const navigate = useNavigate();
  const { config } = useContext(AuthContext);

  const truncateContent = (content) => {
    const trimmedString = content.substr(0, 130);
    return trimmedString;
  };

  useEffect(async () => {
    var activeUser = {};
    try {
      const { data } = await axios.get("/auth/private", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      activeUser = data.user;

      setActiveUser(activeUser);
    } catch (error) {
      setActiveUser({});
    }
  }, []);

  useEffect(() => {
    const getUserReadingList = async () => {
      try {
        const { data } = await (
          await axios.get(`/user/read-list`, config)
        ).data;
        setReadList(data);
      } catch (error) {
        navigate("/");
      }
    };
    getUserReadingList();
  }, [wasRemoved]);

  const addStoryToReadList = async () => {
    try {
      const { data } = await axios.post(
        `/user/${story._id}/addStoryToReadList`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      serWasRemoved(true);
      setStoryReadListStatus(data.status);

      document.getElementById("readListLength").textContent =
        data.user.readListLength;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="readList-story-item">
      <section>
        <div className="story-top-block">
          <div className="readList-story-author">{story.author.username}</div>
          <span>-</span>
          <div className="readList-story-createdAt">
            {editDate(story.createdAt)}
          </div>
          <i>
            <AiFillStar />
          </i>
        </div>

        <div className="story-med-block">
          <div className="readList-story-title">
            <a href={`story/${story._id}`}>{story.title}</a>
          </div>
          <div className="readList-story-content">
            <span
              dangerouslySetInnerHTML={{
                __html: truncateContent(story.content) + "...",
              }}
            ></span>
          </div>
        </div>

        <div className="story-bottom-block">
          <a href={`story/${story._id}`}>
            <span>Ver mais</span>
            <span>-</span>
            <span>{story.readtime} Tempo de leitura</span>
          </a>

          <div>
            <i onClick={addStoryToReadList}>
              <BsBookmarkFill color="#ff8000" />
            </i>
          </div>
        </div>
      </section>

      <section>
        <div className="story-Image-Wrap">
          <img
            src={`/storyImages/${story.image}`}
            alt={story.title}
            width="180px"
          />
        </div>
      </section>
    </div>
  );
};

export default ReadListStoryItem;

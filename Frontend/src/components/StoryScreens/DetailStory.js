import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../Css/DetailStory.css";
import Loader from "../GeneralScreens/Loader";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit, FiArrowLeft } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { BsBookmarkPlus, BsThreeDots, BsBookmarkFill } from "react-icons/bs";
import CommentSidebar from "../CommentScreens/CommentSidebar";

const DetailStory = () => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeUser, setActiveUser] = useState({});
  const [story, setStory] = useState({});
  const [storyLikeUser, setStoryLikeUser] = useState([]);
  const [sidebarShowStatus, setSidebarShowStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const _id = useParams()._id;
  const allData = useParams();
  const [storyReadListStatus, setStoryReadListStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetailStory = async () => {
      setLoading(true);
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

      try {
        const { data } = await axios.post(`/story/${_id}`, {
          activeUser,
        });
        setStory(data.data);
        setLikeStatus(data.likeStatus);
        setLikeCount(data.data.likeCount);
        setStoryLikeUser(data.data.likes);
        setLoading(false);

        const story_id = data.data._id;

        if (activeUser.readList) {
          if (!activeUser.readList.includes(story_id)) {
            setStoryReadListStatus(false);
          } else {
            setStoryReadListStatus(true);
          }
        }
      } catch (error) {
        setStory({});
        navigate("/not-found");
      }
    };
    getDetailStory();
  }, [_id, setLoading]);

  const handleLike = async () => {
    setTimeout(() => {
      setLikeStatus(!likeStatus);
    }, 1500);

    try {
      const { data } = await axios.post(
        `/story/${_id}/like`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setLikeCount(data.data.likeCount);
      setStoryLikeUser(data.data.likes);
    } catch (error) {
      setStory({});
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir essa publicação?")) {
      try {
        await axios.delete(`/story/${_id}/delete`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editDate = (createdAt) => {
    const d = new Date(createdAt);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const datestring = d.toLocaleDateString("pt-br", options);
    return datestring;
  };

  const addStoryToReadList = async () => {
    try {
      const { data } = await axios.post(
        `/user/${_id}/addStoryToReadList`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setStoryReadListStatus(data.status);

      document.getElementById("readListLength").textContent =
        data.user.readListLength;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Inclusive-detailStory-page">
            <div className="top_detail_wrapper">
              <Link to={"/"}>
                <FiArrowLeft />
              </Link>
              <h5>{story.title}</h5>

              <div className="story-general-info">
                <ul>
                  {story.author && (
                    <li className="story-author-info">
                      <img
                        src={`/userPhotos/${story.author.photo}`}
                        alt={story.author.username}
                      />
                      <span className="story-author-username">
                        {story.author.username}{" "}
                      </span>
                    </li>
                  )}
                  <li className="story-createdAt">
                    {editDate(story.createdAt)}
                  </li>
                  <b>-</b>

                  <li className="story-readtime">
                    {story.readtime} Tempo de leitura
                  </li>
                </ul>

                {!activeUser.username && (
                  <div className="comment-info-wrap">
                    <i
                      onClick={(prev) => {
                        setSidebarShowStatus(!sidebarShowStatus);
                      }}
                    >
                      <FaRegComment />
                    </i>

                    <b className="commentCount">{story.commentCount}</b>
                  </div>
                )}

                {activeUser &&
                story.author &&
                story.author._id === activeUser._id ? (
                  <div className="top_story_transactions">
                    <Link
                      className="editStoryLink"
                      to={`/story/${story._id}/edit`}
                    >
                      <FiEdit />
                    </Link>
                    <span className="deleteStoryLink" onClick={handleDelete}>
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="CommentFieldEmp">
              <CommentSidebar
                _id={_id}
                sidebarShowStatus={sidebarShowStatus}
                setSidebarShowStatus={setSidebarShowStatus}
                activeUser={activeUser}
              />
            </div>

            <div className="story-content">
              <div className="story-banner-img">
                <img src={`/storyImages/${story.image}`} alt={story.title} />
              </div>

              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: story.content }}
              ></div>
            </div>

            {activeUser.username && (
              <div className="fixed-story-options">
                <ul>
                  <li>
                    <i onClick={handleLike}>
                      {likeStatus ? (
                        <FaHeart color="#ff8000" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </i>

                    <b
                      className="likecount"
                      style={{ color: "rgb(99, 99, 99)" }}
                    >
                      {" "}
                      {likeCount}
                    </b>
                  </li>

                  <li>
                    <i
                      onClick={(prev) => {
                        setSidebarShowStatus(!sidebarShowStatus);
                      }}
                    >
                      <FaRegComment />
                    </i>

                    <b className="commentCount">{story.commentCount}</b>
                  </li>
                </ul>

                <ul>
                  <li>
                    <i onClick={addStoryToReadList}>
                      {storyReadListStatus ? (
                        <BsBookmarkFill color="#ff8000" />
                      ) : (
                        <BsBookmarkPlus />
                      )}
                    </i>
                  </li>

                  <li className="BsThreeDots_opt">
                    <i>
                      <BsThreeDots />
                    </i>

                    {activeUser && story.author._id === activeUser._id ? (
                      <div className="delete_or_edit_story  ">
                        <Link
                          className="editStoryLink"
                          to={`/story/${story._id}/edit`}
                        >
                          <p>Editar postagem</p>
                        </Link>
                        <div className="deleteStoryLink" onClick={handleDelete}>
                          <p>Deletar postagem</p>
                        </div>
                      </div>
                    ) : null}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DetailStory;

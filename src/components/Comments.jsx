import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column; /* Adjust flex-direction for smaller screens */
    align-items: flex-start; /* Adjust align-items for smaller screens */
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 40px; /* Adjust width for smaller screens */
    height: 40px; /* Adjust height for smaller screens */
  }
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 3px; /* Adjust padding for smaller screens */
  }
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [cookie, setCookie] = useState(null);

  const ref = useRef();
  ref.cookie = cookie;

  useEffect(() => {
    const items = localStorage.getItem("access_token");
    console.log(items);
    if (items) {
     setCookie(items);
    }
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://video-streaming-server.vercel.app/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    try {
      const res = await axios.post("https://video-streaming-server.vercel.app/api/comments", {
        userId: currentUser._id,
        videoId,
        content: newComment,
        access_token:ref.cookie,
      });

      setComments([...comments, res.data]);
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(0);
      handleCommentSubmit(e);
    }
  };



  return (
    <Container>
      {currentUser && (
        <NewComment>
          <Avatar src={currentUser.img} />
          <form onSubmit={handleCommentSubmit}>
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </form>
        </NewComment>
      )}
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;

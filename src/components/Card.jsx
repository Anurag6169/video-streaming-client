import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js"



const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%; /* Adjust to full width on smaller screens */
  }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;

  @media (max-width: 768px) {
    height: ${(props) => (props.type === "sm" ? "80px" : "150px")}; /* Adjust height for smaller screens */
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
  }
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};

  @media (max-width: 768px) {
    display: block; /* Show the channel image on smaller screens */
  }
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 14px; /* Adjust font size for smaller screens */
  }
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;

  @media (max-width: 768px) {
    font-size: 12px; /* Adjust font size for smaller screens */
  }
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};

  @media (max-width: 768px) {
    font-size: 12px; /* Adjust font size for smaller screens */
  }
`;
const Card = ({ type, video }) => {

  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`https://video-streaming-server-woad.vercel.app//api/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  },[video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;

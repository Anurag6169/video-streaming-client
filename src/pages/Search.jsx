import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
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
    const fetchVideos = async () => {
      const res = await axios.get(`https://video-streaming-server-woad.vercel.app/api/videos/search${query}`, {access_token:ref.cookie});
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>;
};

export default Search;

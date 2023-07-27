import React, { useEffect, useState , useRef} from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";




const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {

  const [videos, setVideos] = useState([])
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
      const res = await axios.get(`https://video-streaming-client.vercel.app/api/videos/${type}`, {access_token:ref.cookie});
      console.log(res.data);
      setVideos(res.data);
    };
    fetchVideos();
  },[type]);

  return (
    <Container>
      {videos.map(video=>(
        <Card key={video._id} video={video}/>
      ))}

    </Container>
  );
};

export default Home;

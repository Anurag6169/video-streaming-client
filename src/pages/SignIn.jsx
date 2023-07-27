import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 56px); /* Adjust min-height for smaller screens */
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    padding: 20px; /* Adjust padding for smaller screens */
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 30px; /* Adjust padding for smaller screens */
  gap: 10px;

  @media (max-width: 768px) {
    width: 90%; /* Adjust width for smaller screens */
    padding: 10px; /* Adjust padding for smaller screens */
  }
`;

const Title = styled.h1`
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px; /* Adjust font size for smaller screens */
  }
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 18px; /* Adjust font size for smaller screens */
  }
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    padding: 8px; /* Adjust padding for smaller screens */
  }
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};

  @media (max-width: 768px) {
    padding: 8px 16px; /* Adjust padding for smaller screens */
    font-size: 14px; /* Adjust font size for smaller screens */
  }
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};

  @media (max-width: 768px) {
    font-size: 10px; /* Adjust font size for smaller screens */
    margin-top: 5px; /* Adjust margin for smaller screens */
  }
`;

const Links = styled.div`
  margin-left: 50px;

  @media (max-width: 768px) {
    margin-left: 30px; /* Adjust margin for smaller screens */
  }
`;

const Link = styled.span`
  margin-left: 30px;

  @media (max-width: 768px) {
    margin-left: 20px; /* Adjust margin for smaller screens */
  }
`;

const SignIn = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("https://video-streaming-client.vercel.app/api/auth/signin", { name, password });
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      localStorage.setItem("access_token", res.data.access_token)
      navigate("/")
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("https://video-streaming-client.vercel.app/api/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to MeTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button >Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;

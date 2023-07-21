import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Upload from "./Upload";
import { logout } from "../redux/userSlice"; // Import the logout action from userSlice

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;

  @media (max-width: 768px) {
    height: 70px; /* Adjust height for smaller screens */
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0px 10px; /* Adjust padding for smaller screens */
  }
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    width: 70%; /* Adjust width for smaller screens */
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  width: 80%; /* Adjust width for smaller screens */

  @media (max-width: 768px) {
    width: 70%; /* Adjust width for smaller screens */
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    padding: 4px 10px; /* Adjust padding for smaller screens */
    font-size: 12px; /* Adjust font size for smaller screens */
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    gap: 5px; /* Adjust gap for smaller screens */
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer; /* Add cursor pointer for clickable effect */

  @media (max-width: 768px) {
    width: 28px; /* Adjust width for smaller screens */
    height: 28px; /* Adjust height for smaller screens */
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Add useDispatch to get access to the dispatch function

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    // Add any additional logout logic if needed
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={(e) => setQ(e.target.value)} />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} onClick={handleLogout} /> {/* Add onClick event handler for logout */}
              {currentUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;

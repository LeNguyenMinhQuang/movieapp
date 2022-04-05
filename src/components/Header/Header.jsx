import React, { useContext, useState, useLayoutEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { Grid, Typography, Button } from "@mui/material";
import { Menu, Search } from "@mui/icons-material";

import NavBar from "./NavBar";
import { AuthContext } from "../../context/AuthProvider";
import { AppContext } from "../../context/AppProvider";

import { auth } from "../../firebase/firebase";

const Wrapper = styled.div`
  background-color: var(--bgColorHeader);
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
`;

const Container = styled(Grid)`
  height: 56px;
  .box {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .boxLeft {
    .menuButton {
      cursor: pointer;
      margin-right: 24px;
    }
    .homeButton {
      cursor: pointer;
    }
  }

  .boxMiddle {
    .searchInput {
      background-color: #111111;
      border: 1px solid hsla(0, 0%, 53.3%, 0.4);
      height: 36px;
      padding-left: 16px;
      width: calc(100% - 36px);
      transition: all 0.3s ease;
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;

      &:focus {
        background-color: #131313;
        outline: none;
        border: 1px solid hsla(0, 0%, 53.3%, 0.8);
      }
    }
    .searchButton {
      background-color: #313131;
    }
  }

  .boxRight {
    display: flex;
    justify-content: flex-end;

    .avatar {
      width: 32px;
      border-radius: 50%;
      cursor: pointer;
    }

    .displayName {
      margin-left: 12px;
      cursor: pointer;
    }
  }
`;

const LogOutWrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 56px;
  right: 0;
  display: flex;
  justify-content: flex-end;
  padding-right: 24px;
  align-items: center;
  background-color: var(--bgColorHeader);
  overflow: hidden;
  cursor: pointer;
  height: ${(props) => (props.show ? "40px" : 0)};
  .avatarButton {
    color: rgba(255, 255, 255, 0.4);
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }

  @media (min-width: 768px) {
    width: 10vw;
  } ;
`;

function Header() {
  const authData = useContext(AuthContext);
  const appData = useContext(AppContext);
  const { displayName, email, uid, photoURL } = authData.user;
  const {
    showHeader,
    navBarShow,
    setNavBarShow,
    showLogOut,
    setShowLogOut,
    searchInp,
    setSearchInp,
  } = appData;
  const handleShowNavBar = () => {
    setNavBarShow(!navBarShow);
  };

  const handleShowLogOut = () => {
    setShowLogOut(!showLogOut);
  };

  const handleLogOut = () => {
    setShowLogOut(false);
  };

  return (
    <>
      {showHeader && (
        <Wrapper>
          <Container container>
            <Grid className="box boxLeft" item md={3}>
              <Menu className="menuButton" onClick={() => handleShowNavBar()} />
              <Typography
                component={Link}
                to="/"
                variant="h6"
                id="homeButton"
                style={{ textDecoration: "none" }}
              >
                Movie App
              </Typography>
            </Grid>
            <Grid className="box boxMiddle" item md={6}>
              <input
                className="searchInput"
                placeholder="Search"
                value={searchInp}
                onChange={(e) => setSearchInp(e.target.value)}
              />
              <Button
                component={Link}
                to={`/search/${searchInp}`}
                className="searchButton"
              >
                <Search />
              </Button>
            </Grid>
            <Grid className="box boxRight" item md={3}>
              <img
                className="avatar"
                src={photoURL}
                onClick={() => handleShowLogOut()}
              />
              <Typography
                variant="body1"
                className="displayName"
                onClick={() => handleShowLogOut()}
              >
                {displayName}
              </Typography>
            </Grid>
          </Container>
        </Wrapper>
      )}
      <NavBar show={navBarShow} />
      <LogOutWrapper show={showLogOut}>
        <Typography
          className="avatarButton"
          variant="body1"
          style={{ paddingTop: 0 }}
          onClick={() => {
            auth.signOut();
            handleLogOut();
          }}
        >
          Log Out
        </Typography>
      </LogOutWrapper>
    </>
  );
}

export default Header;

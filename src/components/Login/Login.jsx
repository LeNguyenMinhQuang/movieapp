import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase, { auth, db } from "../../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

import { AuthContext } from "../../context/AuthProvider";

import styled from "styled-components";
import { Google } from "@mui/icons-material";

const Container = styled.div`
  background-color: var(--bgColor);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    outline: 1px solid hsla(0, 0%, 53.3%, 0.8);
    padding: 12px 24px 12px 60px;
    border-radius: 4px;
    font-size: 20px;
    position: relative;

    &:hover {
      color: var(--bgColor);
      background-color: hsla(0, 0%, 53.3%, 0.8);

      svg {
        color: var(--bgColor);
      }
    }

    svg {
      position: absolute;
      left: 24px;
    }
  }
`;

function Login() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const handleLogin = async () => {
    const userData = await signInWithPopup(auth, googleProvider);
    const { user } = userData;
    const { displayName, uid, email, photoURL, providerId } = user;
    const additionalUserInfo = getAdditionalUserInfo(userData);
    if (additionalUserInfo.isNewUser) {
      try {
        await addDoc(collection(db, "users"), {
          displayName: displayName,
          uid: uid,
          email: email,
          photoURL: photoURL,
          providerId: providerId,
        });
      } catch (error) {
        throw new Error("lỗi:", error);
      }
    }
  };
  useEffect(() => {
    if (user.displayName) {
      navigate("/");
    }
  }, [user]);
  return (
    <Container>
      <button
        onClick={() => {
          handleLogin();
        }}
      >
        <Google />
        Login with Google
      </button>
    </Container>
  );
}

export default Login;

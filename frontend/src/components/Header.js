import React from "react";
import { Button } from "./";
import { useAuth } from "../hooks";
import styled from "styled-components"

const Sticky = styled.div`
  position: absolute;
  top: 0;
  background-image: linear-gradient(90deg ,#3FAFD7 0%,#8DCEE6 100%);
  width: 100vw;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  z-index: 99;
`

export default function Header() {
  const { user = {}, logout, isAuth } = useAuth();

  return (
    <Sticky>
      <h1>Tanda</h1>
      {isAuth && <div>
        <Button background="transparent" margin="0" onClick={logout}>
          Logout
        </Button>
      </div>}
    </Sticky>
  );
}

import React from "react";
import styled from "styled-components";

function Toast({ message }) {
  return <ToastContainer>{message}</ToastContainer>;
}

const ToastContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform:translateX(-50%);
  padding: 10px;
  min-width: 200px;
  background-color: #090;
  color: #fff;
  border-radius: 5px;
  border:none;
`;

export default Toast;

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  html,
  body {
    display:flex;
    max-width: 320px;
    
    background-color:#232332;
    margin: 0 auto;
  }
  
  * {
    box-sizing: border-box;
  }
  button {
    cursor: pointer;
    border: none;
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 0;
  }
  input:focus {
    outline: none;
  }
  textarea {
    box-sizing: border-box;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  textarea:focus {
    outline: none;
  }
  a {
    text-decoration:none;
  }
`;

export default GlobalStyle;

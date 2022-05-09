import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}
    a{
        text-decoration: none;
    }
    body, *{
        font-family: "Noto Sans KR", sans-serif;
    }
    button{
        cursor:pointer;
    }
`;

export default GlobalStyles;
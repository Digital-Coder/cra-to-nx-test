import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin-top: 100px;
  padding-left: 20px;
`;
export function Home(props) {
  const [state, setstate] = useState("initialState");
  return (
    <Wrapper>
      <p>Testing component outside src</p>
      <p>{state}</p>
    </Wrapper>
  );
}
export default Home;

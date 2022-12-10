import { type FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import "./App.css";
import HomePage from "./app/containers/HomePage";

const AppContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
  `};
`;

const App: FC = () => {
  return (
    <AppContainer>
      <HomePage />
    </AppContainer>
  );
};

export default App;

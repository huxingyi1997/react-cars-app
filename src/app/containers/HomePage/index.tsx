import { type FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Navbar from "../../components/navbar";
import TopSection from "./topSection";

const PageContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    items-center
    overflow-x-hidden
  `};
`;

const HomePage: FC = () => {
  return (
    <PageContainer>
      <Navbar />
      <TopSection />
    </PageContainer>
  );
};

export default HomePage;

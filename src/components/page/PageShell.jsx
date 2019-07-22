import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import MenuAside from "./MenuAside";
import ObjectsAside from "./ObjectsAside";
import PropTypes from "prop-types";

const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
`;

const StyledMain = styled.main`
  display: flex;
  height: calc(100vh - 60px);
`;

const EditorArea = styled.section`
  background: #12111c;
  flex: 1;
`;

const PageShell = ({ children }) => (
  <PageWrapper>
    <Header />
    <StyledMain>
      <MenuAside />
      <EditorArea>{children}</EditorArea>
      <ObjectsAside />
    </StyledMain>
  </PageWrapper>
);

PageShell.propTypes = {
  children: PropTypes.element
};

export default PageShell;

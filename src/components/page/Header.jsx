import React from "react";
import styled from "@emotion/styled";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: #2b2d42;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
`;

const StyledP = styled.p`
  color: rgba(255, 255, 255, 0.96);
  display: inline-block;
  margin: 0px 0 0 15px;
  padding: 20px 0 0 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.23px;
`;
const StyledImg = styled.img`
  padding: 21px 9px;
  width: 18px;
  height: auto;
  display: inline-block;
  background-color: #202130;
`;

const Header = () => (
  <HeaderWrapper>
    <StyledImg src="images/favicon.png" />
    <StyledP>Object Selection Test Project</StyledP>
  </HeaderWrapper>
);

export default Header;

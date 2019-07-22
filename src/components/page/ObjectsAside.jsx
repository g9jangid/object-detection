import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import ACTIONS from "../../modules/actions";
import PropTypes from "prop-types";

const StyledSection = styled.section`
  background-color: #202130;
  width: 235px;
`;

const StyledH3 = styled.h3`
  color: #fff;
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: #2b2d42;
  margin: 0;
  padding: 15px;
`;

const StyledUlObjects = styled.ul`
  list-style-type: none;
  padding: 0 0 0 10px;
  margin: 10px 0 0 0;
  width: 100%;

  li {
    display: block;
    color: #fff;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 5px 0;

    svg {
      width: 14px;
      fill: #fff;
      margin: 0 5px 0;
      float: left;
      cursor: pointer;
    }

    &.not-active {
      opacity: 0.25;
    }
  }
`;

class ObjectsAside extends React.Component {
  handleOnClick = index => {
    this.props.setVisibility(index);
  };

  render() {
    return (
      <StyledSection>
        <StyledH3>{`${this.props.selectedAreas.length} Objects`}</StyledH3>
        <StyledUlObjects>
          {this.props.selectedAreas.map((rect, index) => (
            <li key={index} className={!rect.isVisible ? "not-active" : ""}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                onClick={() => this.handleOnClick(index)}
              >
                <path d="M256 105c-101.8 0-188.4 62.4-224 151 35.6 88.6 122.2 151 224 151s188.4-62.4 224-151c-35.6-88.6-122.2-151-224-151zm0 251.7c-56 0-101.8-45.3-101.8-100.7S200 155.3 256 155.3 357.8 200.6 357.8 256 312 356.7 256 356.7zm0-161.1c-33.6 0-61.1 27.2-61.1 60.4s27.5 60.4 61.1 60.4 61.1-27.2 61.1-60.4-27.5-60.4-61.1-60.4z" />
              </svg>
              {`object ${index + 1}`}
            </li>
          ))}
        </StyledUlObjects>
      </StyledSection>
    );
  }
}

ObjectsAside.propTypes = {
  selectedAreas: PropTypes.array,
  setVisibility: PropTypes.func
};

export default connect(
  ({ selectedAreas }) => ({
    selectedAreas
  }),
  {
    setVisibility: ACTIONS.setVisibility
  }
)(ObjectsAside);

import React from "react";
import styled from "@emotion/styled";
import ACTIONS from "../../modules/actions";
import { connect } from "react-redux";
import { RECTMENU, LINEMENU } from "../../constants";
import PropTypes from "prop-types";

const StyledSection = styled.section`
  background-color: #202130;
  width: 35px;
`;

const StyledUlMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  width: 100%;

  li {
    display: block;
    cursor: pointer;

    svg {
      width: 18px;
      padding: 8px;

      &:hover {
        background-color: rgba(9, 10, 27, 0.63);
      }
    }
  }
  li.rectmenu svg {
    fill: ${props => (props.activeMenu === RECTMENU ? "#3ed67e" : "#fff")};
  }
  li.linemenu svg {
    fill: ${props => (props.activeMenu === LINEMENU ? "#3ed67e" : "#fff")};
  }
`;

class MenuAside extends React.Component {
  handleClick = menu_mode => {
    this.props.setMenu(menu_mode);
  };

  render() {
    return (
      <StyledSection>
        <StyledUlMenu activeMenu={this.props.menus}>
          <li onClick={() => this.handleClick(RECTMENU)} className="rectmenu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M174 64h-58.8C78.1 64 48 94.1 48 131.2V190c0 7.7 6.3 14 14 14s14-6.3 14-14v-59.8c0-9.1 4.3-18.7 11.7-26.2 7.5-7.6 17.2-12 26.5-12H174c7.7 0 14-6.3 14-14s-6.3-14-14-14zM397.8 64H338c-7.7 0-14 6.3-14 14s6.3 14 14 14h59.8c9.3 0 19 4.4 26.5 12 7.4 7.5 11.7 17.1 11.7 26.2V190c0 7.7 6.3 14 14 14s14-6.3 14-14v-59.8c0-36.5-29.7-66.2-66.2-66.2zM174 420h-59.8c-9.3 0-19-4.4-26.5-12-7.4-7.5-11.7-17.1-11.7-26.2V322c0-7.7-6.3-14-14-14s-14 6.3-14 14v59.8c0 36.5 29.7 66.2 66.2 66.2H174c7.7 0 14-6.3 14-14s-6.3-14-14-14zM450 308c-7.7 0-14 6.3-14 14v59.8c0 9.1-4.3 18.7-11.7 26.2-7.5 7.6-17.2 12-26.5 12H338c-7.7 0-14 6.3-14 14s6.3 14 14 14h58.8c37 0 67.2-30.1 67.2-67.2V322c0-7.7-6.3-14-14-14z" />
            </svg>
          </li>
          <li onClick={() => this.handleClick(LINEMENU)} className="linemenu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M255.8 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM102 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM410 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38z" />
            </svg>
          </li>
        </StyledUlMenu>
      </StyledSection>
    );
  }
}

MenuAside.propTypes = {
  menus: PropTypes.string,
  setMenu: PropTypes.func
};

export default connect(
  ({ menus }) => ({
    menus
  }),
  {
    setMenu: ACTIONS.setMenu
  }
)(MenuAside);

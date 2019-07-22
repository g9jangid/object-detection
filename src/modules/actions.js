// types of action
const Types = {
  SET_MENU: "SET_MENU",
  ADD_AREA: "ADD_AREA",
  TOGGLE_VISIBILITY: "TOGGLE_VISIBILITY"
};
// actions
const setMenu = menu_mode => {
  return {
    type: Types.SET_MENU,
    payload: menu_mode
  };
};

const setArea = area => {
  return {
    type: Types.ADD_AREA,
    payload: area
  };
};

const setVisibility = payload => {
  return {
    type: Types.TOGGLE_VISIBILITY,
    payload
  };
};

export default {
  setArea,
  setMenu,
  setVisibility,
  Types
};

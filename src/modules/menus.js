import ACTIONS from "./actions";

const menus = (state = "", action) => {
  switch (action.type) {
    case ACTIONS.Types.SET_MENU: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default menus;

import ACTIONS from "./actions";

const selectedAreas = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.Types.ADD_AREA: {
      return [...state, action.payload];
    }
    case ACTIONS.Types.TOGGLE_VISIBILITY: {
      let tempState = state;
      return tempState.map((val, index) => {
        return index === action.payload
          ? { ...val, isVisible: !val.isVisible }
          : val;
      });
    }

    default:
      return state;
  }
};

export default selectedAreas;

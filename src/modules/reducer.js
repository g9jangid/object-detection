import { combineReducers } from "redux";
import menus from "./menus";
import selectedAreas from "./selectedAreas";

const reducer = combineReducers({
  menus,
  selectedAreas
});

export default reducer;

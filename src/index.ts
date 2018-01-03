import "./style/index.sass";
import App from "./containers/App";
import { subscribers, route } from "preact-router";

import store from "./store";

type TIsLoggedIn = (url: string) => void;

const isLoggedIn: TIsLoggedIn = url => {
  console.log(url);
  if (url === "/" || url === "/login") {
    return;
  }
  if (store.getState().auth.authToken !== "") {
    return;
  }
  route("/login");
};
subscribers.push(isLoggedIn);

export default App;

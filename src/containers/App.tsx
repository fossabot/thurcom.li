import { h } from "preact";
import Router, { subscribers } from "preact-router";
import AsyncRoute from "preact-async-route";
import { Provider } from "preact-redux";

import store from "../store";
import Navbar from "../components/Navbar";
import Home from "./Home";
import Login from "./Login";
import Show from "./Show";
import Guide from "./Guide";
import { TTest } from "./Test";

type TTestAsync = () => Promise<TTest>;
type TIsLoggedIn = (url: string) => void;
type TApp = () => JSX.Element;

const Test: TTestAsync = () => import("./Test").then(module => module.default);

const isLoggedIn: TIsLoggedIn = url => {
  console.log(url);
};
subscribers.push(isLoggedIn);

const App: TApp = () => (
  <Provider store={store}>
    <div>
      <Navbar />
      <main>
        <Router>
          <Home path="/" />
          <Login path="/login" />
          <AsyncRoute path="/test" getComponent={Test} />
          <Show path="/show/:id" id="" />
          <Guide path="/guide" />
        </Router>
      </main>
    </div>
  </Provider>
);

export default App;

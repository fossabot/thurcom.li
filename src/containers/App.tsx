import { h } from "preact";
import Router, { subscribers } from "preact-router";
import AsyncRoute from "preact-async-route";
import { Provider } from "preact-redux";

import store from "../store";
import Navbar from "../components/Navbar";
import Home from "./Home";
import Login from "./Login";

import { IProps as ITestProps } from "./Test";
interface ITest {
  (): Promise<(module: ITestProps) => JSX.Element>;
}
const Test: ITest = () => import("./Test").then(module => module.default);

interface IIsLoggedIn {
  (url: string): void;
}
const isLoggedIn: IIsLoggedIn = url => {
  console.log(url);
};

subscribers.push(isLoggedIn);

export default () => (
  <Provider store={store}>
    <div>
      <Navbar />
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <AsyncRoute path="/test" getComponent={Test} />
      </Router>
    </div>
  </Provider>
);

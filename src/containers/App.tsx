import { h, FunctionalComponent } from "preact";
import Router, { subscribers } from "preact-router";
import AsyncRoute from "preact-async-route";
import { Provider } from "preact-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import store, { persistor } from "../store";
import Navbar from "../components/navbar";
import Home from "./home";
import Login from "./login";
import Show from "./show";
import Guide from "./guide";
import { IProps as ITestProps } from "./Test";

type TTestAsync = () => Promise<FunctionalComponent<ITestProps>>;

const Test: TTestAsync = () => import("./Test").then(module => module.default);

const App: FunctionalComponent<null> = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
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
    </PersistGate>
  </Provider>
);

export default App;

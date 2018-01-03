import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";

interface IProps {
  path: string;
}

const Home: FunctionalComponent<null> = props => (
  <div class="content">
    <h1>Home</h1>
    <Link href="/test">Test</Link>
  </div>
);

export default Home;

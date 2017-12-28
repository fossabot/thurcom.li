import { h } from "preact";
import { Link } from "preact-router";

interface IProps {
  path: string;
}
type THome = (props: IProps) => JSX.Element;

const Home: THome = props => (
  <div class="content">
    <h1>Home</h1>
    <Link href="/test">Test</Link>
  </div>
);

export default Home;

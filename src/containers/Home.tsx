import { h } from "preact";
import { Link } from "preact-router";

interface IProps {
  path: string;
}

export default (props: IProps) => (
  <div class="content">
    <h1>Home</h1>
    <Link href="/test">Test</Link>
  </div>
);

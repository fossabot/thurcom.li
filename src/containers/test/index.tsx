import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";

import Video from "../../components/video";

export interface IProps {
  path: string;
}

const Test: FunctionalComponent<IProps> = () => (
  <div class="content">
    <h1>Test</h1>
    <Link href="/">Home</Link>
    <Video url="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8" />
  </div>
);

export default Test;

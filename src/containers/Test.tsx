import { h } from "preact";
import { Link } from "preact-router";

import Video from "../components/Video";

interface IProps {
	path: string;
}
export type TTest = (props: IProps) => JSX.Element;

const Test: TTest = props => (
	<div class="content">
		<h1>Test</h1>
		<Link href="/">Home</Link>
		<Video url="https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8" />
	</div>
);

export default Test;

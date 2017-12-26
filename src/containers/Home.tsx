import { h } from 'preact';
import { Link } from 'preact-router';

interface Props {
	path: string;
}

export default (props: Props) => (
	<div>
		<h1>Home</h1>
		<Link href="/test">Test</Link>
	</div>
);

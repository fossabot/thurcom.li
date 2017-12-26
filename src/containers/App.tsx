import { h } from 'preact';
import Router, { subscribers } from 'preact-router';

import Home from './Home';

const isLoggedIn = url => {
	console.log(url);
};

subscribers.push(isLoggedIn);

export default () => (
	<Router>
		<Home path="/" />
	</Router>
);

import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Timer from './components/Timer';

const AppRouter = () => (
	<Router>
		<Route path="/" exact component={Timer} />
	</Router>
);

export default AppRouter;
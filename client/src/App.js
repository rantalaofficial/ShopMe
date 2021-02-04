import React from "react";
import logo from "./logo.svg";

import Button from '@material-ui/core/Button';
import "./App.css";

function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (

		<Button variant="contained" color="primary">
			<p>{!data ? "Loading..." : data}</p>
		</Button>
	);
}

export default App;


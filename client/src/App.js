import React from "react";

import Header from './components/Header';

import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme.js';


function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	const bodyStyle = {
		margin: "0px",
		padding: "0px",
		backgroundColor: "#9dc1c9",
	}

	return (
		<ThemeProvider theme={Theme}>
		
		
			<Header></Header>

			<p>{!data ? "Loading..." : data}</p>
		
		
		</ThemeProvider>
	);
}

export default App;


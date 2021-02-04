import React from "react";

import Header from './components/Header';

import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme.js';
import "./App.css";






function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);





	return (
		<body>
			<ThemeProvider theme={Theme}>
				<Header></Header>

				<p>{!data ? "Loading..." : data}</p>
			</ThemeProvider>
			
			


			
		</body>

	);
}

export default App;


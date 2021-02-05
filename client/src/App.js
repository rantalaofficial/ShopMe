import React, { useState } from 'react';

import Header from './components/Header';
import ShoppingList from './components/ShoppingList';
import ShoppingHistory from './components/ShoppingHistory';

import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './Theme.js';


function App() {
	const [data, setData] = useState(null);
	const [pageIndex, setPageIndex] = useState(0);

	const selectPage = index => {
		setPageIndex(index);
	}

	let pageContent;

	if (pageIndex === 0) {
		pageContent = <ShoppingList></ShoppingList>
	} else {
		pageContent = <ShoppingHistory></ShoppingHistory>
	}

	return (
		<ThemeProvider theme={Theme}>
			<Header onPageSelect={selectPage}></Header>

			{pageContent}

		</ThemeProvider>
	);
}

export default App;


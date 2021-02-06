import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';

const ShoppingList = props => {
    const [items, setItems] = React.useState({});
    const [checkedItems, setCheckedItems] = React.useState({});

    return (
        <>
            <Typography variant="h5" style={{margin: "15px", textAlign: "center"}}>
                Shopping History
            </Typography>
        </>
    );

}

export default ShoppingList;
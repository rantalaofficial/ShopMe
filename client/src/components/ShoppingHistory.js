import React, { useState } from 'react';

const ShoppingList = props => {
    const [items, setItems] = React.useState({});
    const [checkedItems, setCheckedItems] = React.useState({});

    return (
        <div>
            <h1>Shopping History</h1>
        </div>
    );

}

export default ShoppingList;
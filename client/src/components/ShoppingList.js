import React, { useState } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const ShoppingList = props => {
    const [listedItems, setListedItems] = useState([{label: "maito", checked: 0}, {label: "kaakao", checked: 1}]);

    
    React.useEffect(() => {
        fetch("/api/get_listed_items")
            .then((res) => res.json())
            .then((items) => {

                let itemsArray = []

                Object.keys(items).map((label, checked) => {
                    itemsArray.push({label: label, checked: checked})
                })

                setListedItems(itemsArray)
            });
    }, []);
    
    return (
        <>
            <Typography variant="h4" style={{margin: "10px"}}>
                Shopping List
            </Typography>
            
            <Card style={{margin: "10px", padding: "10px 10px 10px 20px"}}>
                {listedItems.map(item => (
                    <>
                    <FormControlLabel
                        value = {item.label}
                        control = {<Checkbox color="primary"/>}
                        label = {item.label}
                        labelPlacement = "end"
                    /><br></br>
                    </>
                ))}

            </Card>

            


        </>
    );

}

export default ShoppingList;
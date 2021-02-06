import React, { useState } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ListIcon from '@material-ui/icons/List';
import AlertDialog from './AlertDialog.js';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ShoppingList = props => {
    const [listedItems, setListedItems] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [itemSearchText, setItemSearchText] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);


    React.useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        fetch("/api/get_items")
            .then((res) => res.json())
            .then((data) => {

                let listedItemsArray = [];
                Object.keys(data.listedItems).map((label, index) => {
                    listedItemsArray.push({ label: label, checked: data.listedItems[label] })
                });
                setListedItems(listedItemsArray);
                setItemTypes(data.itemTypes);
            });
    }

    const handleDialog = (confirmation) => {
        setDialogOpen(false);

        if (confirmation) {
            fetch("/api/delete_listed_items")
                .then((res) => res.json())
                .then((success) => {
                    if (success) getItems();
                });
        }
    }

    const handleAddItem = () => {
        fetch("/api/add_item/" + itemSearchText.toString())
                .then((res) => res.json())
                .then((success) => {
                    if (success) {
                        getItems();
                        setItemSearchText("");
                    }
                });
    }

    const handleAutoCompleteChange = (event, value) => {
        setItemSearchText(value)
    }

    const handleItemSearchChange = e => {
        setItemSearchText(e.target.value);
    }

    const handleItemCheck = e => {        
        let newListedItems = [... listedItems];

        let itemIndex = newListedItems.findIndex((item => item.label == e.target.value));
        newListedItems[itemIndex].checked = e.target.checked;

        let apiName = e.target.checked ? "set_checked" : "set_unchecked";

        fetch("/api/" + apiName.toString() + "/" + newListedItems[itemIndex].label)
                .then((res) => res.json())
                .then((success) => {
                    if (success) {
                        setListedItems(newListedItems);
                    }
                });
    };

    const getUnlistedItems = () => {
        let unlistedItems = [... itemTypes];

        listedItems.forEach((item, index) => {
            unlistedItems.splice(unlistedItems.indexOf(item.label), 1);
        });

        return unlistedItems
    }
    return (
        <>
            <Typography variant="h5" style={{ margin: "15px", textAlign: "center" }}>
                Shopping List
            </Typography>

            <Card style={{ margin: "15px", padding: "15px" }}>
                {listedItems.map(item => (
                    <>
                        <FormControlLabel
                            style={{ paddingLeft: "12px" }}
                            value={item.label}
                            onChange={handleItemCheck}
                            control={<Checkbox  checked={item.checked} color="primary" />}
                            label={item.label}
                            labelPlacement="end"
                        /><br></br>
                    </>
                ))}
                {(itemSearchText !== null && itemSearchText !== '' && itemSearchText.length > 0) ? 
                    <Button style={{ margin: "0", float: "left", paddingLeft: "10px", marginBottom: "15px"}} variant="contained" color="secondary" onClick={handleAddItem}><AddBoxIcon style={{ paddingRight: "8px" }} />Add item</Button>
                    : <></>
                }
                <Autocomplete
                    value={itemSearchText}
                    freeSolo
                    options={getUnlistedItems()}
                    getOptionLabel={(option) => option.toString()}
                    style={{paddingTop: "10px", width: "auto" }}
                    onChange={handleAutoCompleteChange}
                    renderInput={(params) => <TextField onChange={handleItemSearchChange} {...params} label="Add item" variant="outlined" />}
                />
            </Card>

            {listedItems.length > 0 ?
                <Button style={{ margin: "auto", backgroundColor: "#ff4545", display: "block" }} variant="contained" onClick={() => setDialogOpen(true)}><ListIcon style={{ float: "left", paddingRight: "8px" }} />New shopping list</Button>
                : <></>
            }

            <AlertDialog open={dialogOpen} title="Are you sure?" description="This will delete the current shopping list" yesLabel="Delete" noLabel="Cancel" handleYes={() => handleDialog(true)} handleNo={() => handleDialog(false)} />
        </>
    );

}

export default ShoppingList;
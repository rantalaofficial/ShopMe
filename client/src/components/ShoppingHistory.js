import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const ShoppingList = props => {
    const [itemHistory, setItemHistory] = useState([]);
    const [listsCreated, setListsCreated] = useState(0);
    const [firstListCreated, setFirstListCreated] = useState('');
    const [uptime, setUptime] = useState('');

    const compareItems = (a, b) => {
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        return 0
    }

    const getHistory = () => {
        fetch("/api/get_item_history")
            .then((res) => res.json())
            .then((data) => {

                let historyArray = [];
                Object.keys(data.itemHistory).forEach((label, index) => {
                    historyArray.push({ label: label, count: data.itemHistory[label]})
                    return "";
                });
                historyArray.sort(compareItems);

                let itemRanking = 1;
                historyArray.forEach((item, index) => {

                    if(index == 0) {
                        item.label = "1. " + item.label;
                    } else if (item.count !== historyArray[index - 1].count) {
                        itemRanking += 1
                        item.label = itemRanking + ". " + item.label;
                    } else {
                        item.label = "— " + item.label;
                    }
                                        
                    return item;
                });

                setItemHistory(historyArray);
                setListsCreated(data.listsCreated);
                setFirstListCreated(data.firstListCreated);
                setUptime(data.uptime);
            });
    }

    useEffect(getHistory, []);

    return (
        <>
            <Typography variant="h5" style={{ margin: "15px", textAlign: "center" }}>
                Shopping History
            </Typography>
            <TableContainer component={Paper} style={{ margin: "15px", width: "auto"}}>
                {(listsCreated > 0) ?
                    <Typography variant="subtitle1" style={{margin: "15px 15px 0px 15px"}}>
                        {listsCreated} shopping lists created since {firstListCreated}.
                    </Typography>
                    : <></>
                }
                
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Times bought</TableCell>
                            <TableCell align="right">% of all lists</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemHistory.map(item => (
                            <TableRow key={item.label}>
                                <TableCell component="th" scope="row">
                                    {item.label}
                                </TableCell>
                                <TableCell align="right">{item.count}</TableCell>
                                <TableCell align="right">{Math.round(100 * item.count / Math.max(1, listsCreated))} %</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="subtitle2" style={{ margin: "15px", textAlign: "right" }}>
                Server uptime: {uptime}
            </Typography>
        </>
    );

}

export default ShoppingList;
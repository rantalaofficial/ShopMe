import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

//Material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';

//Icons
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    background: {
        background: "#b5b5b5"
    }
}));

const Header = (props) => {
    const classes = useStyles();

    const [sidebar, setSidebar] = React.useState(false);

    const menuBtnStyle = {
        margin: "15px 15px 0px 15px",
        width: "230px",
        display: "block",
        variant: "contained"
    }

    const handlePageSelect = index => {
        setSidebar(false)
        props.onPageSelect(index);
    }

    return (
        

        <div className={classes.root}>

            <style>{".MuiSvgIcon-root {vertical-align: bottom; float: right}"}</style>
            
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setSidebar(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            ShopMe
                        </Typography>                        
                    </Toolbar>
                </AppBar>

                <Drawer classes={{ paper: classes.background }} anchor='left' open={sidebar} onClose={() => setSidebar(false)}>
                    <div style={{display: "inline", padding: "0px"}}>
                        <Button style={menuBtnStyle} variant="contained" color="primary" onClick={() => handlePageSelect(0)}>Shopping list<ShoppingCartIcon/></Button>
                        <Button style={menuBtnStyle} variant="contained" color="primary" onClick={() => handlePageSelect(1)}>Shopping history<HistoryIcon/></Button>
                    </div>
                </Drawer>

        </div>
    );
}

export default Header;
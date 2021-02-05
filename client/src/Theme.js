import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#3dba78',
            dark: '#49e391',
            contrastText: '#000',
        },
        background: {
            default: '#b5b5b5',
        },
        delete: {
            default: 'red',
        }
    },
});

export default Theme
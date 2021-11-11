import { Theme } from '../../model/theme';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: Theme.Light
    }
})

export const darkTheme = createTheme({
    palette: {
        mode: Theme.Dark
    }
})
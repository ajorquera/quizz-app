import { createMuiTheme } from '@material-ui/core/styles';

const backgroundColors = {
    orangeGradient: 'linear-gradient(225deg, rgba(255,38,106,1) 0%, rgba(255,102,64,1) 100%);',
    disabled: 'rgba(0, 0, 0, 0.26)'
}

const colors = {
    white: 'white',
}

export default createMuiTheme({
    palette: {},
    overrides: {
        MuiButton: {
            containedPrimary: {
                background: backgroundColors.orangeGradient,
                backgroundColor: 'none',
                borderRadius: '30px',
                '&:hover': {
                    backgroundColor: 'none'
                },
                '&.Mui-disabled': {
                    background: backgroundColors.disabled,
                }
            },
            textPrimary: {
                color: colors.white
            },
        },
        MuiFab: {
            primary: {
                background: backgroundColors.orangeGradient,
                backgroundColor: 'none',
                borderRadius: '30px',
                '&:hover': {
                    backgroundColor: 'none'
                },
                '&.Mui-disabled': {
                    background: backgroundColors.disabled,
                },
                color: colors.white
            }
        }
    }
});
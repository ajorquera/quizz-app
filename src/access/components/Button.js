import { withStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

export default withStyles({
    contained: {
        background: 'linear-gradient(225deg, rgba(255,38,106,1) 0%, rgba(255,102,64,1) 100%);',
        color: 'white',
        margin: '0 auto',
        borderRadius: '30px',
    },
    disabled: {
      background: 'rgba(0, 0, 0, 0.26)'
    },
  })(Button);
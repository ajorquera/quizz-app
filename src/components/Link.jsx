import { withStyles } from "@material-ui/styles";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import React from 'react';

const CustomLink = withStyles({
    root: {
        color: '#ff7a52',
        fontWeight: 'bolder',
        textDecoration: 'none',
        textTransform: 'uppercase'
    },
})(Link);

export default (props) => {
    return (
        <CustomLink component={RouterLink} {...props}>
            {props.children}
        </CustomLink>
    );
}

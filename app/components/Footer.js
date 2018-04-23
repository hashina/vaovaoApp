import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Footer extends React.Component {
    render() {
        return (
            <div className={styles.root}>
                <Grid container spacing={24}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <footer>
                            <p>© 2018 built with &hearts; by Rochel Hasina</p>
                        </footer>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Footer);

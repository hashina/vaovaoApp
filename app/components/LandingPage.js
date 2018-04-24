/**
 * Created by Administrateur on 24/04/2018.
 */
import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card, {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import {browserHistory} from 'react-router';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
});

class LandingPage extends React.Component {
    handleLogin() {
        browserHistory.push('/login');
    }

    handleSignup() {
        browserHistory.push('/signup');
    }

    render() {
        return (
            <div>
                <Card className={styles.card}>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            Tongasoa eto amin'ny pejy VaoVao
                        </Typography>
                        <Typography component="p">
                            Sehatra natao ifampizarana.
                        </Typography>
                    </CardContent>
                    <CardActions className={styles.cardAction}>
                        <Button size="small" color="primary" onClick={this.handleLogin.bind(this)}>
                            Hiditra
                        </Button>
                        <Button size="small" color="primary" onClick={this.handleSignup.bind(this)}>
                            Hisoratra anarana
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(LandingPage);
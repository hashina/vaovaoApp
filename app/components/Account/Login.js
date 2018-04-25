import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import {compose} from 'recompose';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {login} from '../../actions/auth';
import Messages from '../Messages';
import {TextField, Button} from 'material-ui';

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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', open: false};
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleLogin(event) {
        event.preventDefault();
        this.setState({open: true});
        this.props.dispatch(login(this.state.email, this.state.password));
    }

    onClose() {
        console.log('on close Login')
        this.setState({open: false});
    }


    render() {
        return (
            <div className={styles.root}>
                <Grid container spacing={24}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <Messages isOpen={this.state.open} onClose={this.onClose.bind(this)}
                                  messages={this.props.messages}/>
                        <form onSubmit={this.handleLogin.bind(this)}>
                            <TextField type="email" name="email" id="email" label="Adiresy mailaka"
                                       placeholder="Mailaka" value={this.state.email}
                                       onChange={this.handleChange.bind(this)} autoFocus fullWidth/><br/>
                            <TextField type="password" name="password" id="password" label="Teny miafina"
                                       placeholder="Teny miafina"
                                       value={this.state.password} onChange={this.handleChange.bind(this)}
                                       fullWidth/><br/>
                            <Button type="submit" variant="raised" color="primary">
                                Alefa
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs></Grid>
                    <hr/>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}><p>Mbola tsy manana kaonty? <Link to="/signup">Hisoratra anarana</Link></p></Grid>
                    <Grid item xs></Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

export default compose(withStyles(styles, {name: 'Login'}), connect(mapStateToProps))(Login);

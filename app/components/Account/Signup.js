import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {signup} from '../../actions/auth';
import {facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin} from '../../actions/oauth';
import Messages from '../Messages';
import {TextField, Button} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import {compose} from 'recompose';
import Paper from 'material-ui/Paper';
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

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', email: '', password: '', open: false};
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSignup(event) {
        event.preventDefault();
        this.setState({open: true});
        this.props.dispatch(signup(this.state.name, this.state.email, this.state.password));
    }

    onClose() {
        this.setState({open: false});
    }

    render() {
        return (
            <div className={styles.root}>
                <Grid container spacing={24}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <Messages onClose={this.onClose.bind(this)} isOpen={this.state.open}
                                  messages={this.props.messages}/>
                        <form onSubmit={this.handleSignup.bind(this)}>
                            <TextField type="text" name="name" id="name" label="Anarana" label="Anarana"
                                       placeholder="Anarana"
                                       value={this.state.name}
                                       onChange={this.handleChange.bind(this)} autoFocus fullWidth/><br/>
                            <TextField type="email" name="email" id="email" label="Adiresy mailaka"
                                       placeholder="Mailaka"
                                       value={this.state.email}
                                       onChange={this.handleChange.bind(this)} fullWidth/><br/>
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
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <p>Efa manana kaonty? <Link to="/login">Hiditra</Link></p>
                    </Grid>
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

export default connect(mapStateToProps)(Signup);

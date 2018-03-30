import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {signup} from '../../actions/auth';
import {facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin} from '../../actions/oauth';
import Messages from '../Messages';
import {withStyles, Grid, TextField, Button} from 'material-ui';


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', email: '', password: ''};
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSignup(event) {
        event.preventDefault();
        this.props.dispatch(signup(this.state.name, this.state.email, this.state.password));
    }

    handleFacebook() {
        this.props.dispatch(facebookLogin())
    }

    handleTwitter() {
        this.props.dispatch(twitterLogin())
    }

    handleGoogle() {
        this.props.dispatch(googleLogin())
    }

    handleVk() {
        this.props.dispatch(vkLogin())
    }

    handleGithub() {
        this.props.dispatch(githubLogin())
    }

    render() {
        return (
            <div class="col-xs-6">
                <Messages messages={this.props.messages}/>
                <form onSubmit={this.handleSignup.bind(this)}>
                    <TextField type="text" name="name" id="name" label="Anarana" label="Anarana" placeholder="Anarana"
                               value={this.state.name}
                               onChange={this.handleChange.bind(this)} autoFocus fullWidth/><br/>
                    <TextField type="email" name="email" id="email" label="Adiresy mailaka" placeholder="Mailaka"
                               value={this.state.email}
                               onChange={this.handleChange.bind(this)} fullWidth/><br/>
                    <TextField type="password" name="password" id="password" label="Teny miafina"
                               placeholder="Teny miafina"
                               value={this.state.password} onChange={this.handleChange.bind(this)} fullWidth/><br/>
                    <Button type="submit" variant="raised" color="primary">
                        Alefa
                    </Button>
                </form>
                <hr/>
                <p>Efa manana kaonty? <Link to="/login">Hiditra</Link></p>
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

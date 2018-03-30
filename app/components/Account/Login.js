import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {login} from '../../actions/auth';
import Messages from '../Messages';
import {TextField, Button} from 'material-ui';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleLogin(event) {
        event.preventDefault();
        this.props.dispatch(login(this.state.email, this.state.password));
    }

    render() {
        return (
            <div class="col-xs-6">
                <Messages messages={this.props.messages}/>
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
                <hr/>
                <p>Mbola tsy manana kaonty? <Link to="/signup">Hisoratra anarana</Link></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Login);

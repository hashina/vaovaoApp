import React from 'react';
import {connect} from 'react-redux'
import {updateProfile, changePassword, deleteAccount} from '../../actions/auth';
import {link, unlink} from '../../actions/oauth';
import Messages from '../Messages';
import {TextField, Button} from 'material-ui';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.user.email,
            name: props.user.name,
            gender: props.user.gender,
            location: props.user.location,
            website: props.user.website,
            gravatar: props.user.gravatar,
            password: '',
            confirm: '',
            file: null
        };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleProfileUpdate(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('name', 'kankana be e');
        this.props.dispatch(updateProfile(this.state, formData, this.props.token));
    }

    handleChangePassword(event) {
        event.preventDefault();
        this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
    }

    handleDeleteAccount(event) {
        event.preventDefault();
        this.props.dispatch(deleteAccount(this.props.token));
    }

    handleLink(provider) {
        this.props.dispatch(link(provider))
    }

    handleUnlink(provider) {
        this.props.dispatch(unlink(provider));
    }

    handleUploadFile(e) {
        this.setState({'file': e.target.files[0]});
    }

    render() {
        return (
            <div className="col-xs-6">
                <Messages messages={this.props.messages}/>
                <form onSubmit={this.handleProfileUpdate.bind(this)}>
                    <TextField type="email" name="email" id="email" label="Adiresy mailaka"
                               placeholder="Mailaka" value={this.state.email}
                               onChange={this.handleChange.bind(this)} fullWidth/><br/>
                    <TextField type="text" name="name" id="name" label="Anarana" placeholder="Anarana"
                               value={this.state.name}
                               onChange={this.handleChange.bind(this)} fullWidth/><br/>
                    <label>Gravatar</label>
                    <img src={this.state.gravatar} className="gravatar" width="100" height="100"/><br/>
                    <input type="file" onChange={this.handleUploadFile.bind(this)}/>
                    <Button type="submit" variant="raised" color="primary">Hanova</Button>
                </form>
                <h4>Hanova teny miafina</h4>
                <form onSubmit={this.handleChangePassword.bind(this)}>
                    <TextField type="password" name="password" id="password" label="Teny miafina vaovao"
                               placeholder="Teny miafina vaovao" value={this.state.password}
                               onChange={this.handleChange.bind(this)} fullWidth/>
                    <TextField type="password" name="confirm" id="confirm" label="Hamafiso ilay teny miafina"
                               placeholder="Hamafiso ilay teny miafina" value={this.state.confirm}
                               onChange={this.handleChange.bind(this)} fullWidth/>
                    <br/>
                    <Button type="submit" variant="raised" color="primary">Ovaina</Button>
                </form>
                <form onSubmit={this.handleDeleteAccount.bind(this)}>
                    <p>Ireo kaonty voafafa dia tsy afaka averina intsony.</p>
                    <Button type="submit" variant="raised" color="secondary">Hamafa ny kaontiko</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Profile);

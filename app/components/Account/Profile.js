import React from 'react';
import {connect} from 'react-redux'
import {updateProfile, changePassword, deleteAccount, uploadPicture} from '../../actions/auth';
import {link, unlink} from '../../actions/oauth';
import Messages from '../Messages';
import {TextField, Button} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import {compose} from 'recompose';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import ConfirmationDialog from '../Dialog/ConfirmationDialog';

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


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.user.email,
            name: props.user.name,
            password: '',
            confirm: '',
            open: false,
            openConfirmDialog: false,
            dialogTitle: '',
            dialogContent: ''
        };
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleProfileUpdate(event) {
        event.preventDefault();
        this.setState({open: true});
        this.props.dispatch(updateProfile(this.state, this.props.token));
    }

    handleProfilePicUpdate(event) {
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('name', 'avatar');
        this.props.dispatch(uploadPicture(formData, this.props.user.name.replace(/\s/g, '')));
    }

    handleChangePassword(event) {
        event.preventDefault();
        this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
    }

    handleDeleteAccount(event) {
        event.preventDefault();
        this.setState({
            openConfirmDialog: true,
            dialogTitle: 'Fanamafisana famafana kaonty',
            dialogContent: 'Indray mandeha tsy miverina ny famafana kaonty, Ho fafana ihany?'
        });
        // this.props.dispatch(deleteAccount(this.props.token));
    }

    onClose() {
        this.setState({open: false});
    }

    handleUploadFile(e) {
        this.setState({'file': e.target.files[0]});
    }

    onConfDialogClose(status) {
        if (status === "ok") {
            this.props.dispatch(deleteAccount(this.props.token));
        }
        this.setState({openConfirmDialog: false});
    }


    render() {
        return (
            <div className={styles.root}>
                <Grid container spacing={24}>
                    <ConfirmationDialog dialogTitle={this.state.dialogTitle} dialogContent={this.state.dialogContent}
                                        open={this.state.openConfirmDialog}
                                        onConfDialogClose={this.onConfDialogClose.bind(this)}/>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <Messages onClose={this.onClose.bind(this)} isOpen={this.state.open}
                                  messages={this.props.messages}/>
                        <form onSubmit={this.handleProfileUpdate.bind(this)}>
                            <TextField type="email" name="email" id="email" label="Adiresy mailaka"
                                       placeholder="Mailaka" value={this.state.email}
                                       onChange={this.handleChange.bind(this)} fullWidth/><br/>
                            <TextField type="text" name="name" id="name" label="Anarana" placeholder="Anarana"
                                       value={this.state.name}
                                       onChange={this.handleChange.bind(this)} fullWidth/><br/>
                            <Button type="submit" variant="raised" color="primary">Hanova</Button>
                        </form>
                        <form onSubmit={this.handleProfilePicUpdate.bind(this)}>
                            <label>Sary</label>
                            <img src={this.state.gravatar} className="gravatar" width="100"
                                 height="100"/><br/>
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
                            <Button type="submit" variant="raised" color="primary">Hanova</Button>
                        </form>
                        <form onSubmit={this.handleDeleteAccount.bind(this)}>
                            <p>Ireo kaonty voafafa dia tsy afaka averina intsony.</p>
                            <Button type="submit" variant="raised" color="secondary">Hamafa ny kaontiko</Button>
                        </form>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
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

export default compose(withStyles(styles, {name: 'Profile'}), connect(mapStateToProps))(Profile);

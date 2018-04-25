import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    success: {
        backgroundColor: '#8BC34A'
    },
    info: {
        backgroundColor: '#FDD835'
    },
    error: {
        backgroundColor: '#E91E63'
    },
    root: {
        success: {
            backgroundColor: '#76FF03'
        },

    },
});

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
    }

    render() {
        const {classes} = this.props;
        return this.props.messages.success ? (
            <Snackbar
                SnackbarContentProps={{
            'className': `${classes.success}`,
          }} onClose={this.props.onClose} open={this.props.isOpen} autoHideDuration={5000}
                message={this.props.messages.success.map((message, index) => <div key={index}>{message.msg}</div>)}/>
        ) : this.props.messages.error ? (
            <Snackbar
                onClose={this.props.onClose}
                open={this.props.isOpen}
                autoHideDuration={5000}
                SnackbarContentProps={{
            'className': `${classes.error}`,
          }}
                message={this.props.messages.error.map((message, index) => <div key={index}>{message.msg}</div>)}/>
        ) : this.props.messages.info ? (
            <Snackbar
                onClose={this.props.onClose}
                open={this.props.isOpen}
                autoHideDuration={5000}
                SnackbarContentProps={{
            'className': `${classes.info}`,
          }}
                message={this.props.messages.info.map((message, index) =>
                <div key={index}>{message.msg}</div>)}/>
        ) : null;
    }
}

Messages.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Messages);

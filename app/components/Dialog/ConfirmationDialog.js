/**
 * Created by Administrateur on 25/04/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';

class ConfirmationDialog extends React.Component {
    handleCancel() {
        this.props.onConfDialogClose("cancel")
    }

    handleOk() {
        this.props.onConfDialogClose("ok")
    }

    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle id="confirmation-dialog-title">{this.props.dialogTitle}</DialogTitle>
                <DialogContent>
                    <h1>{this.props.dialogContent}</h1>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel.bind(this)} color="primary">
                        Tsia
                    </Button>
                    <Button onClick={this.handleOk.bind(this)} color="primary">
                        Eny
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default ConfirmationDialog;
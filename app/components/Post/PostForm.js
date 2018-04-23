/**
 * Created by Administrateur on 09/03/2018.
 */
import React from "react";
import {connect} from 'react-redux';
import {submitPostForm} from '../../actions/post';
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

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: ''};
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(submitPostForm(this.props.user.id, this.state.content));
        this.setState({content: ''});

    }

    render() {

        return (
            <div className={styles.root}>
                <Grid container spacing={24}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <TextField
                                name="content"
                                id="content"
                                label="Vaovao tianao ho zaraina"
                                multiline
                                rows="4"
                                margin="normal"
                                value={this.state.content}
                                onChange={this.handleChange.bind(this)}
                                fullWidth/><br/>
                            <Button type="submit" variant="raised" color="primary">Alefa</Button>
                        </form>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state)=> {
    return {
        user: state.auth.user,
        posts: state.posts
    };
}

export default compose(withStyles(styles, {name: 'PostForm'}), connect(mapStateToProps))(PostForm);
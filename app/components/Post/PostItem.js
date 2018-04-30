/**
 * Created by Administrateur on 12/03/2018.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {TextField, Button} from 'material-ui';
import {getPostById} from '../../actions/post';
import {addComment} from '../../actions/post';
import List from 'material-ui/List';
import Card, {CardActions, CardContent} from 'material-ui/Card';
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

class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {comment: '', isBtnDisabled: true};
    }

    render() {
        const post = this.props.post,
            posts = this.props.posts,
            comments = this.props.comments;
        let cmtList = null;
        if (post && comments) {
            cmtList = comments.map((comment)=> {
                return (<Card><CardContent>{comment.content}</CardContent></Card>);
            });
        }

        return (
            <div className={styles.root}>
                <Grid container spacing={24}>
                    <Grid item xs></Grid>
                    <Grid item xs={6}>
                        <h1>{post ? post.content : "loading..."}</h1>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <TextField
                                name="comment"
                                id="comment"
                                label="Haneho hevitra"
                                placeholder="Haneho hevitra"
                                multiline
                                rows="4"
                                margin="normal"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.comment}
                                fullWidth/><br/>
                            <Button type="submit" variant="raised" color="primary" disabled={this.state. isBtnDisabled}>Alefa</Button>
                        </form>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs></Grid>
                    <Grid item xs="6">
                        <List>{cmtList ? cmtList : ""}</List>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(addComment(this.props.post.id, this.props.user.id, this.state.comment));
        this.setState({'comment': ''});
    }

    handleChange(event) {
        this.setState({'comment': event.target.value, isBtnDisabled: event.target.value.length > 0 ? false : true})
    }

    componentDidMount() {
        this.props.dispatch(getPostById(this.props.params.id));
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.posts.post,
        user: state.auth.user,
        posts: state.posts.posts,
        comments: state.posts.comments
    };
};

export default compose(withStyles(styles, {name: 'PostItem'}), connect(mapStateToProps))(PostItem);
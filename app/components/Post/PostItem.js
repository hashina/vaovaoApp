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

class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {comment: ''};
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
            <div>
                <div class="col-xs-6">
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
                        <Button type="submit" variant="raised" color="primary">Alefa</Button>
                    </form>
                </div>
                <List>{cmtList ? cmtList : ""}</List>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(addComment(this.props.post.id, this.props.user.id, this.state.comment));
        this.setState({'comment': ''});
    }

    handleChange(event) {
        this.setState({'comment': event.target.value})
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

export default connect(mapStateToProps)(PostItem);
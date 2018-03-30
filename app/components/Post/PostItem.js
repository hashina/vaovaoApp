/**
 * Created by Administrateur on 12/03/2018.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {TextField, Button} from 'material-ui';
import {getPostById} from '../../actions/post';
import {addComment} from '../../actions/post';

class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'comment': ''
        }
    }

    render() {
        return (
            <div class="col-xs-6">
                <h1>{this.props.post && this.props.post.post ? this.props.post.post.content : "loading..."}</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <TextField
                        name="comment"
                        id="comment"
                        label="Haneho hevitra"
                        placeholder="Haneho hevitra"
                        multiline
                        rows="4"
                        margin="normal"
                        value={this.state.comment}
                        onChange={this.handleChange.bind(this)}
                        fullWidth/><br/>
                    <Button type="submit" variant="raised" color="primary">Alefa</Button>
                </form>
            </div>
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(addComment(this.props.post.post.id, this.props.user.id, this.state.comment));
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
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(PostItem);
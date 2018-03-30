/**
 * Created by Administrateur on 09/03/2018.
 */
import React from "react";
import {connect} from 'react-redux';
import {submitPostForm} from '../../actions/post';
import {TextField, Button} from 'material-ui';

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
            <div className="col-xs-6">
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

export default connect(mapStateToProps)(PostForm);
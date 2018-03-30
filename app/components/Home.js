import React from 'react';
import {connect} from 'react-redux'
import {getAllPosts, postFilterer} from '../actions/post';
import List from 'material-ui/List';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            requestSent: false
        }
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.dispatch(getAllPosts(this.props.user.id));
            /*let clientHeight = document.getElementById("homeWrapper").clientHeight;*/
            //window.addEventListener('scroll', this.onScroll.bind(this), false);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
        /* if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && this.props.posts.result.posts.length) {
         console.log('rehefa inon moa zan leiz no ato');
         }*/
        /* let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
         let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
         let clientHeight = document.documentElement.clientHeight || window.innerHeight;
         let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
         if (scrolledToBottom) {
         console.log('farany ambany');
         }*/
    }

    handleChange(event) {
        this.props.dispatch(getAllPosts(this.props.user.id, event.target.value));
    }

    render() {
        const posts = this.props.posts;
        if (posts && posts.result && posts.result.posts) {
            return (
                <div id="homeWrapper" ref="Progress1">
                    <TextField
                        id="search"
                        label="Fikarohana"
                        type="search"
                        margin="normal"
                        onChange={this.handleChange.bind(this)}
                        fullWidth
                    />
                    <List style={{'overflow-y': 'scroll'}}>
                        {posts.result.posts.map(id=>
                            <Card>
                                <CardContent>
                                    <Typography><b> {posts.entities.users[posts.entities.posts[id].user].name}</b></Typography>
                                    <Typography component="p">
                                        {posts.entities.posts[id].content}
                                    </Typography>
                                    <CardActions>
                                        <Link to={`/post/${id}`}>Hijery</Link>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        )}
                    </List>
                </div>
            );
        } else {
            return (
                <div><h1>Tongasoa</h1></div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        posts: state.posts.posts
    };
};

export default connect(mapStateToProps)(Home);

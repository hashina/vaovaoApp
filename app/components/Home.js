import React from 'react';
import {connect} from 'react-redux'
import {getAllPosts, postFilterer} from '../actions/post';
import List from 'material-ui/List';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {ClimbingBoxLoader} from 'react-spinners';
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
    spinnerStyle: {
        flex: 1,
        alignSelf: 'center'
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            requestSent: false,
            myDiv: "",
            loading: true
        }
    }

    componentWillMount() {
        /*this.setState({loading: false});*/
    }

    componentDidMount() {
        if (this.props.user) {
            this.props.dispatch(getAllPosts(this.props.user.id));
            window.addEventListener('scroll', this.handleOnScroll);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    handleOnScroll() {
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
            scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight,
            clientHeight = (document.documentElement && document.documentElement.clientHeight) || window.innerHeight,
            scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            console.log('bott om');
        }
    }

    handleChange(event) {

        this.props.dispatch(getAllPosts(this.props.user.id, event.target.value));
    }

    render() {
        const posts = this.props.posts;
        if (posts && posts.result && posts.result.posts) {
            return (
                <div className={styles.root}>
                    <Grid container spacing={24}>
                        <Grid item xs></Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="search"
                                label="Fikarohana"
                                type="search"
                                margin="normal"
                                onChange={this.handleChange.bind(this)}
                                ref={(elem)=>{this.myKiv=elem;}}
                                fullWidth
                            />
                            <List>
                                {posts.result.posts.map(id=>
                                    <Card>
                                        <CardContent>
                                            <Typography><b> {posts.entities.users[posts.entities.posts[id].user].name}</b></Typography>
                                            <Typography component="p">
                                                {posts.entities.posts[id].content}
                                            </Typography>
                                            <CardActions>
                                                <Link to={`/post/${id}`}>Hijery</Link>
                                                <IconButton aria-label="Thumb up" color="primary">
                                                    <ThumbUpIcon></ThumbUpIcon>
                                                </IconButton>
                                                <IconButton aria-label="Delete" color="secondary">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </CardActions>
                                        </CardContent>
                                    </Card>
                                )}
                            </List>
                        </Grid>
                        <Grid item xs></Grid>
                    </Grid>
                </div>
            );
        } else {
            return (
                <div class="loading">Loading&#8230;</div>
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

export default compose(withStyles(styles, {name: 'Home'}), connect(mapStateToProps))(Home);

import React from 'react';
import {connect} from 'react-redux'
import {getAllPosts, addLike} from '../actions/post';
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
import Badge from 'material-ui/Badge';

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
    },
    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    },
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

    handleLike(e, id) {
        e.preventDefault();
        this.props.dispatch(addLike(id, this.props.user.id));
    }

    render() {
        const posts = this.props.posts;
        const normalizedData = posts ? posts.normalizedData : {};
        if (normalizedData && normalizedData.result && normalizedData.result.posts && normalizedData.entities) {
            const entities = normalizedData.entities;
            const results = normalizedData.result;
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
                                fullWidth
                            />
                            <List>
                                {results.posts.map(id=>
                                    <Card>
                                        <CardContent>
                                            <Typography><b> {entities.users[entities.posts[id].user].name}</b></Typography>
                                            <Typography key={id} component="p">
                                                {entities.posts[id].content}
                                            </Typography>
                                            <CardActions>
                                                <Link to={`/post/${id}`}>Hijery</Link>
                                                <IconButton id={id} onClick={()=>this.handleLike.bind(this)(event, id)}
                                                            aria-label="Thumb up"
                                                            color="primary">
                                                    <ThumbUpIcon></ThumbUpIcon>
                                                </IconButton><Badge className={styles.padding} color="primary"
                                                                    badgeContent={entities.posts[id].likes.length}>
                                            </Badge>
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
                <div className="loading">Loading&#8230;</div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        posts: state.posts
    };
};

export default compose(withStyles(styles, {name: 'Home'}), connect(mapStateToProps))(Home);

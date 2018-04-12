import React from 'react';
import {IndexLink, Link} from 'react-router';
import {MenuList, MenuItem} from 'material-ui/Menu';
import {connect} from 'react-redux'
import {logout} from '../actions/auth';
import {browserHistory} from 'react-router';
import {withStyles} from 'material-ui/styles';
import {compose} from 'recompose';

const styles = theme => ({
    root: {
        backgroundColor: "red"
    },
    wrapper: {
        maxWidth: 400,
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
});

class Header extends React.Component {
    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(logout());

    }

    handleMenuClick(event) {
        switch (event.target.id) {
            case "all-news":
                browserHistory.push('/');
                break;
            case "share":
                browserHistory.push('/post');
                break;
            case "account":
                browserHistory.push('/account');
                break;
            case "logout":
                browserHistory.push('/logout');
                break;
            case "login":
                browserHistory.push('/login');
                break;
            case "signup":
                browserHistory.push('/signup');
                break;
        }
    }

    render() {
        const {classes} = this.props;
        const rightNav = this.props.token ? (
            <MenuList className="list-inline">
                <MenuItem id="all-news" onClick={this.handleMenuClick.bind(this)}>Ireo vaovao
                    rehetra|</MenuItem>
                <MenuItem id="share"
                          onClick={this.handleMenuClick.bind(this)}>Hizara|</MenuItem>
                <MenuItem id="account" onClick={this.handleMenuClick.bind(this)}>Ny
                    kaontiko|</MenuItem>
                <MenuItem id="logout" onClick={this.handleLogout.bind(this)}>Hiala</MenuItem>
            </MenuList>
        ) : (
            <MenuList className="list-inline">
                <MenuItem id="login"
                          onClick={this.handleMenuClick.bind(this)}>Hiditra|</MenuItem>
                <MenuItem id="signup" onClick={this.handleMenuClick.bind(this)}>Hisoratra
                    anarana</MenuItem>
            </MenuList>
        );
        return (
            <div className="container">
                {rightNav}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        user: state.auth.user
    };
};

export default connect(mapStateToProps)(Header);

var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: './public',
    filename: function (req, file, cb) {
        cb(null, `${new Date()}-${file.name}`);
    }
});

var upload = multer({storage});

var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Provider = require('react-redux').Provider;
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var webpack = require('webpack');
var config = require('./webpack.config');

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Models
var User = require('./models/User').user;

// Controllers
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var postController = require('./controllers/post');

// React and Server-Side Rendering
var routes = require('./app/routes');
var configureStore = require('./app/store/configureStore').default;

var app = express();

var compiler = webpack(config);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    req.isAuthenticated = function () {
        var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return false;
        }
    };

    if (req.isAuthenticated()) {
        var payload = req.isAuthenticated();
        new User({id: payload.sub})
            .fetch()
            .then(function (user) {
                req.user = user;
                next();
            });
    } else {
        next();
    }
});

if (app.get('env') === 'development') {
    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.post('/comment', postController.postComment);
app.get('/get_post/:postId', postController.getPost);
app.get('/get_posts/:userId', postController.getPosts);
app.post('/post', postController.postPost);
app.post('/contact', contactController.contactPost);
app.post('/upload', upload.single('avatar'), (req, res)=> {
    let imageFile = req.files.file,
        filename = req.headers.user;
    imageFile.mv(`${__dirname}/public/uploads/${filename}.jpg`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({file: `public/uploads/${filename}.jpg`});
    })
});
app.post('/account', userController.ensureAuthenticated, userController.accountPut);

app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);
app.post('/forgot', userController.forgotPost);
app.post('/reset/:token', userController.resetPost);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);

// React server rendering
app.use(function (req, res) {
    console.log('req url ', req.hostname)
    var initialState = {
        auth: {token: req.cookies.token, user: req.user},
        messages: {},
        posts: {},
        comments: {}
    };

    var store = configureStore(initialState);

    Router.match({routes: routes.default(store), location: req.url}, function (err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Provider, {store: store},
                React.createElement(Router.RouterContext, renderProps)
            ));
            res.render('layout', {
                html: html,
                initialState: store.getState()
            });
        } else {
            res.sendStatus(404);
        }
    });
});

// Production error handler
if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;

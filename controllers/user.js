var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var User = require('../models/User');
var Post = require('../models/Posts');

function generateToken(user) {
    var payload = {
        iss: 'my.domain.com',
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({msg: 'Unauthorized'});
    }
};
/**
 * POST /login
 * Sign in with email and password
 */
exports.loginPost = function (req, res, next) {
    req.assert('email', 'Diso ny mailaka nampidirinao').isEmail();
    req.assert('email', 'Tsy maintsy fenoina ny mailaka').notEmpty();
    req.assert('password', 'Tsy maintsy fenoina ny teny miafina').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    new User({email: req.body.email})
        .fetch()
        .then(function (user) {
            if (!user) {
                return res.status(401).send({
                    msg: 'tsy misy kaonty mifandraika @ ity mailaka ity: ' + req.body.email + ' . ' +
                    'Hamarino ny mailaka dia miverena indray.'
                });
            }
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (!isMatch) {
                    return res.status(401).send({msg: 'Diso ny mailaka na ny teny miafina'});
                }
                res.send({token: generateToken(user), user: user.toJSON()});
            });
        });
};

/**
 * POST /signup
 */
exports.signupPost = function (req, res, next) {
    req.assert('name', 'Tsy maintsy fenoina ny anarana').notEmpty();
    req.assert('email', 'Tsy maintsy fenoina ny mailaka').isEmail();
    req.assert('email', 'Tsy maintsy fenoina ny mailaka').notEmpty();
    req.assert('password', 'Litera efatra (4) farafahakeliny ny teny miafina').len(4);
    req.sanitize('email').normalizeEmail({remove_dots: false});

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).save()
        .then(function (user) {
            res.send({token: generateToken(user), user: user});
        })
        .catch(function (err) {
            if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
                return res.status(400).send({msg: 'Efa miasa @ kaonty hafa io mailaka io.'});
            }
        });
};


/**
 * PUT /account
 * Update profile information OR change password.
 */
exports.accountPut = function (req, res, next) {
    if ('password' in req.body) {
        req.assert('password', 'Litera efatra (4) ny teny miafina farafahakeliny').len(4);
        req.assert('confirm', 'Tsy maintsy mitovy ny teny miafina').equals(req.body.password);
    } else {
        req.assert('email', 'Diso io mailaka io').isEmail();
        req.assert('email', 'Tsy maintsy fenoina ny mailaka').notEmpty();
        req.sanitize('email').normalizeEmail({remove_dots: false});
    }

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    var user = new User({id: req.user.id});
    if ('password' in req.body) {
        user.save({password: req.body.password}, {patch: true});
    } else {
        user.save({
            email: req.body.email,
            name: req.body.name,
            gender: req.body.gender,
            location: req.body.location,
            website: req.body.website
        }, {patch: true});
    }
    user.fetch().then(function (user) {
        if ('password' in req.body) {
            res.send({msg: 'Voaova ny teny miafinao.'});
        } else {
            res.send({user: user, msg: 'Voaova ny mombamomba anao.'});
        }
        res.redirect('/account');
    }).catch(function (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).send({msg: 'Efa mifandray @ kaonty hafa io mailaka io.'});
        }
    });
};

/**
 * DELETE /account
 */
exports.accountDelete = function (req, res, next) {
    new User({id: req.user.id}).destroy().then(function (user) {
        res.send({msg: 'Voafafa ny kaontinao.'});
    });
};

/**
 * GET /unlink/:provider
 */
exports.unlink = function (req, res, next) {
    new User({id: req.user.id})
        .fetch()
        .then(function (user) {
            switch (req.params.provider) {
                case 'facebook':
                    user.set('facebook', null);
                    break;
                case 'google':
                    user.set('google', null);
                    break;
                case 'twitter':
                    user.set('twitter', null);
                    break;
                case 'vk':
                    user.set('vk', null);
                    break;
                default:
                    return res.status(400).send({msg: 'Invalid OAuth Provider'});
            }
            user.save(user.changed, {patch: true}).then(function () {
                res.send({msg: 'Your account has been unlinked.'});
            });
        });
};

/**
 * POST /forgot
 */
exports.forgotPost = function (req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({remove_dots: false});

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    async.waterfall([
        function (done) {
            crypto.randomBytes(16, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            new User({email: req.body.email})
                .fetch()
                .then(function (user) {
                    if (!user) {
                        return res.status(400).send({msg: 'The email address ' + req.body.email + ' is not associated with any account.'});
                    }
                    user.set('passwordResetToken', token);
                    user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
                    user.save(user.changed, {patch: true}).then(function () {
                        done(null, token, user.toJSON());
                    });
                });
        },
        function (token, user, done) {
            var transporter = nodemailer.createTransport({
                service: 'Mailgun',
                auth: {
                    user: process.env.MAILGUN_USERNAME,
                    pass: process.env.MAILGUN_PASSWORD
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'support@yourdomain.com',
                subject: '✔ Reset your password on Mega Boilerplate',
                text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function (err) {
                res.send({msg: 'An email has been sent to ' + user.email + ' with further instructions.'});
                done(err);
            });
        }
    ]);
};

/**
 * POST /reset
 */
exports.resetPost = function (req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirm', 'Passwords must match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    async.waterfall([
        function (done) {
            new User({passwordResetToken: req.params.token})
                .where('passwordResetExpires', '>', new Date())
                .fetch()
                .then(function (user) {
                    if (!user) {
                        return res.status(400).send({msg: 'Password reset token is invalid or has expired.'});
                    }
                    user.set('password', req.body.password);
                    user.set('passwordResetToken', null);
                    user.set('passwordResetExpires', null);
                    user.save(user.changed, {patch: true}).then(function () {
                        done(err, user.toJSON());
                    });
                });
        },
        function (user, done) {
            var transporter = nodemailer.createTransport({
                service: 'Mailgun',
                auth: {
                    user: process.env.MAILGUN_USERNAME,
                    pass: process.env.MAILGUN_PASSWORD
                }
            });
            var mailOptions = {
                from: 'support@yourdomain.com',
                to: user.email,
                subject: 'Your Mega Boilerplate password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            transporter.sendMail(mailOptions, function (err) {
                res.send({msg: 'Your password has been changed successfully.'});
            });
        }
    ]);
};

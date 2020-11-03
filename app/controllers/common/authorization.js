const hidePublicRoutes = (req, res, next) => {
    if (req.session.user === undefined) next();
    else res.redirect('/profile');
}

const hidePrivateRoutes = (req, res, next) => {
    if (req.session.user) next();
    else res.redirect('/login');
}

module.exports = {
    hidePublicRoutes,
    hidePrivateRoutes
};
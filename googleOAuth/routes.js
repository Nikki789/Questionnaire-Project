module.exports = function(app, passport){

    /*If the user is already logged in, redirects to the profile page*/
    app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile.ejs', { user: req.user });
    });

    /*Request profile of the user and their email*/
    app.get('/googleOAuth/google', passport.authenticate('google', {scope: ['profile', 'email']}));


    /*Google redirect after successful/unsuccessful login*/
    app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/profile',
            failureRedirect: '/' }));

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    })
};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}
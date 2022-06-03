const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('./user');
const configAuth = require('./auth');

module.exports = function(passport) {
    /*Takes the user information (id) and puts it in a cookie*/
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    /*After the cookie comes from the browser take the id thats stored in it*/
    /*Then finds the user by the id MongoDB gives*/
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    /*Takes the information of the current user or the new user then calls done and passes to deserializeUser function*/
    /*Then accesses the mongoose database to check for the user who matches the google ID with their profile id*/
    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                User.findOne({'google.id': profile.id}, function(err, user){
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, user);
                    else {
                        const newUser = new User();
                        newUser.google.id = profile.id;
                        newUser.google.token = accessToken;
                        newUser.google.name = profile.displayName;
                        newUser.google.email = profile.emails[0].value;

                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        })
                        console.log(profile);
                    }
                });
            });
        }
    ));
};
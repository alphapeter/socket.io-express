var socket_io_express = function(cookieParser, sessionStore, cookie){
    var _cookie = cookie || 'connect.sid';
    var _cookieParser = cookieParser;
    var _sessionStore = sessionStore;

    var authorization = function(data, accept){
        if (data && data.headers && data.headers.cookie) {
            _cookieParser(data, {}, function(err){
                if(err){
                    return accept('COOKIE_PARSE_ERROR');
                }
                var sessionId = data.signedCookies[_cookie];
                _sessionStore.get(sessionId, function(err, session){
                    if(err || !session || !session.auth || !session.auth.loggedIn){
                        accept('NOT_LOGGED_IN', false);
                    }
                    else{
                        data.session = session;
                        accept(null, true);
                    }
                });
            });
        } else {
            return accept('MISSING_COOKIE', false);
        }
    };

    return authorization;
};

exports.createAuthFunction = socket_io_express;
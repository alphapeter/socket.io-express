# socket.io-express

`socket.io-express` is a library for using express session for authorization of socket.io-connections.
Tested with socket.io 0.9.10 and express 3

# usage
``` js
    express...
    var express = require('express')
    var RedisStore = require('connect-redis')(express);
    var redisStore = new RedisStore( { host:config.redis.address, port: config.redis.port });
    var cookieParser = express.cookieParser('supersecret');
    app.configure(function(){
    ... // your configurations
    app.use(cookieParser);
    app.use(express.session({store: redisStore}));
    ... // your configurations
    });

    socket.io...

    var authFunction = require('./socket.io-express.js').createAuthFunction(cookieParser, redisStore);
    io.set('authorization', authFunction);


# meta

There were a lot of inaccurate blog posts of how to use express (v.3) sessions with socket.io,
so I created this simple library.

Peter Klaesson
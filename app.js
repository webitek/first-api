var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var pages = require('./data/pages.json');
var posts = require('./data/posts.json');

app.set('views', './views/**/');
app.set('view engine', 'jade'); //haml handelbars pug

app.use(express.static('public'));

var bodyParser = require('body-parser');
var fs = require('fs');
var url = require('url');

app.set('views', './views');
app.set('view engine', 'jade');

// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));//для работы с POST

app.get('/', function (req, res) {
    res.render('index', {title: 'API', pages: pages});
});


app.get('/:page', function (req, res, next) {

    var page = req.params.page;

    if(page == 'blog'){
            res.render('blog', {pages: pages});
    }else{
        next();
    }
});

app.get('/blog/:post', function (req, res, next) {

    //console.log(req.url);

    //var post = req.params.post;

    var post = posts.find(function (post) {

        return post.link === req.params.link;
    });


    if(post === post){
        console.log('if: ' + post);



        // var num = posts.find(function (num) {
        //     console.log(num.id);
        //     return num.id === req.params.id;
        // });

        res.render('post', {pages: pages, post: post});
    }else{
        next();
    }
});

app.get('/:id', function (req, res) {

    var page = pages.find(function (page) {
        return page.id === req.params.id;
    });
    console.log(page.name);
    res.render(page.name, {
        title: page.name,
        pages: pages,
        page: page
    });
});

/*
app.get('/post', function (req, res) {

    // var blog = posts.find(function (link) {
    //     return blog.link === req.params.id;
    // });
    // console.log(blog.link);
    res.render('post');
});*/


// error handler
/*app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: '404'});
});*/


app.use(function(req, res) {
    res.status(404).render('error', {title: '404'});
});

app.use(function(req, res) {
    res.status(500).render('error', {title: '500'});
});

http.listen(3001, function(){
    console.log('Listen 3001 port');
});
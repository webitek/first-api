var express = require('express'),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    pages = require('./data/pages.json'),
    posts = require('./data/posts.json'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    url = require('url'),
    nav = {
        pages: pages,
        posts: posts
    };

app.set('views', './views/');
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));//для работы с POST

app.get('/', function (req, res) {
    res.render('index', {
        title: 'API',
        nav: nav
    });
});

app.get('/:page', function (req, res, next) {

    var page = req.params.page;

    if(page == 'blog'){
        res.render('blog', {
            nav: nav
        });
    }else{
        next();
    }
});

app.get('/:id', function (req, res, next) {

    /*var page = pages.find(function (page) {
        return page.id === req.params.id;
    });
    console.log(page.name);
    res.render(page.name, {
        title: page.name,
        page: page,
        nav: nav
    });*/

    var page = req.params.id;

    var result = pages.find(function (element, index) {
        if(element.name == page){
            res.render(element.name, {title: element.name, page: element, nav: nav});
            return element;
        }
    });

    if(result == undefined) next();
});

app.get('/blog/:post', function (req, res, next) {

    var post = req.params.post,
        result = posts.find(function (element, index) {
            if(element.link == post){
                res.render('post', {post: element, nav: nav});
                return element;
            }
        });

    if(result == undefined) next()

});

app.use(function(req, res) {
    res.status(404).render('error', {title: '404', nav: nav});
});

app.use(function(req, res) {
    res.status(500).render('error', {title: '500', nav: nav});
});

http.listen(3001, function(){
    console.log('Listen 3001 port');
});
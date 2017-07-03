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

// var pages = [
//     {
//         id: 1,
//         name: "greka-synyl-ryky-v-reky-123"
//     },
//     {
//         id: 2,
//         name: "ruby"
//     },
//     {
//         id: 3,
//         name: "java"
//     }
// ];

// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));//для работы с POST

app.get('/', function (req, res) {
    res.render('index', {title: 'API'})
});

app.get('/:id', function (req, res) {

    var page = pages.find(function (page) {
        return page.id === req.params.id;
    });
    console.log(page.name);
    res.render(page.name, {title: page.name, pages: pages})
});

app.get('/blog', function (req, res) {

    // var blog = posts.find(function (link) {
    //     return blog.link === req.params.id;
    // });
    // console.log(blog.link);
    res.render('/blog/post')
});


/*app.get('/c', function (req, res) {
    console.log(req.params);
    // var course = courses.find(function (course) {
    //     console.log(course.id);
    //     return course.id === Number(req.params.id)
    // });
    // res.send(course);
    res.end();
});*/


/*app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
    console.log('User connect');

    socket.on('clientEvent', function(data){
        console.log(data);
    });

    socket.on('disconnect', function(){
        console.log('User disconnect');
    });

});*/

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: '404'});
});

http.listen(3001, function(){
    // for (page in pages){
    //     console.log(pages[page]);
    // }


    console.log('Yes it is');
});
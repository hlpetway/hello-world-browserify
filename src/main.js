var $ = require('jquery');
var Post = require('./post');

var how_to_use_browserify = new Post("How to use Browserify");

$('body').append('<h2>' + how_to_use_browserify.title + '</h2>');
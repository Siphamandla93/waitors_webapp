var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var Funtions = require('./functions');
var Models = require('./models/schema');
var MongoUrl = process.env.MONGO_DB_URL || 'mongodb://localhost/sphajoe';
var models = Models(MongoUrl);

var routes = Funtions(models);

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// app.use(express.cookieParser('keyboard cat'));
app.use(session({
    secret: "keyboard cat",
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());


app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// creating route that will take waitor names
app.get("/waitors/:waitorsName", routes.view);
// a post route to render to the form
app.post("/waitors/:waitorsName", routes.add);

app.get("/days", routes.workdays);




app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

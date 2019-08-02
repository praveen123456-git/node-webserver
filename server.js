const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
   return '@'+new Date().getFullYear()
});

hbs.registerHelper('screamIt', (data) => {
    return data.toUpperCase();
});

app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now} : ${req.method} : ${req.url}`;
   console.log(log);
   fs.appendFile('server.log', log + '\n', (error) => {
     if(error) {
        console.log('Unable to append server log.');
     }
   });
    next();
});

//Mainanence Page showing in website accesing any url of this site
// app.use((req, res, next) => {
//     res.render('maintanence.hbs');
// });

app.use(express.static(__dirname+'/public'));
//Http Handler using arrow function
app.get('/', (req, res) => {
  // response of Http request
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name:'Praveen',
  //   hobbies:['Watching Movies','Playing Criket','Listing Music']
  // })
   res.render('home.hbs',{
     pageTitle:'Home Page',
     heading:'Home',
     welcomeMessage:'Hello Welcome...'
   });

});


app.get('/about',(req, res) => {
    //res.send('About Us Page');
    res.render('about.hbs',{
      pageTitle:'About Us',
      heading:'About Us',
      aboutus:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    });
});


app.get('/projects', (req, res) => {
  res.render('projects.hbs',{
    pageTitle:'Projects',
    heading:'Projects Page',
    message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  });
});
// /bad send back json data with errorMessage
 app.get('/bad', (req, res) => {
     res.send({errorMessage : 'Unable to handle the request'});
 });

//appication bind to the port
app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});

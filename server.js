let express = require('express');
let hbs = require('hbs');
let app = express();
let fs = require('fs');
const port = process.env.PORT || 3000; 

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('screamIt', (text) => text.toUpperCase());
hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear());
app.set('view engine', 'hbs');

// middleware
app.use((req,res,next)=>{

	let log = `You Log in ${new Date()} with ${req.method}:${req.url}`;
	console.log( log );
	fs.appendFile('server.log', log + '\n' , (error) => {
		if(error)
			console.log('unable to write file');
	});
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintance.hbs');
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {

	res.render('home.hbs', {
		titlePage: 'Home Pages'
	});

});

app.get('/about', (req, res) => {

	res.render('about.hbs',{
		titlePage: 'About Pages',
	});

});

app.get('/bad', (req, res) => {

	res.send({
		errorMessage: "203 Bad Request!"
	});

});


app.listen(port, ()=>{
	console.log( `Your server is running in port:${port}` );
});

const express=require('express');
const app=express();
const port=80;
const db=require('./config/mongoose');
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);
//extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

//use express router
app.use('/',require('./routes/index'));


//static files
app.use(express.static('./assets'))
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views')

app.listen(port,function(error){
    if(error){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`server is running on port ${port}`);
})
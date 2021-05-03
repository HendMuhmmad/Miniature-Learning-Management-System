const express = require('express');
var path = require('path');
const courseRoutes = require('./Routes/courseRoutes');
const studentRoutes = require('./Routes/studentRoute');
const app = express();
app.use(express.urlencoded({
    extended: true
  }))
app.use(express.static(path.join(__dirname, './website/css')));
app.use(express.json());
app.use(courseRoutes);
app.use(studentRoutes);
app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:path.join(__dirname, './website')});

});

//PORT
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

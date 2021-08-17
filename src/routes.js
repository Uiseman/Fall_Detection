const express = require("express");

const userControler=require('../src/controllers/userController');


const routes= express.Router();

routes.get('/',(req,res)=>{ res.send('Hello Word')});
routes.post('/register',userControler.create);
routes.post('/falldetected/:id',userControler.falldetected);
module.exports=routes;
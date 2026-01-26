const routes=require('express').Router();
const codeController=require('../controllers/codeController');
routes.get('/',codeController.getAllSnippets)
module.exports=routes;
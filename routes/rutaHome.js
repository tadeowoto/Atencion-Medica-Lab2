import express from "express";

const router = express.Router();

router.get('/', (req,res)=>{res.render('home')});
router.post('/login') // todo -> hay que hacer el enrutamiento 

export { router };
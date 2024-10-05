import express from "express";
import { PORT } from "./config/config.mjs";
import { router } from "./routes/rutaHome.js";

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/', router)
app.listen(PORT, (req,res)=>{console.log(`Server: http://localhost:${PORT}`)})
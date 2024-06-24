import express, { urlencoded } from "express"
import axios from "axios"
import bodyParser from "body-parser"
import env from "dotenv";
//https://www.exchangerate-api.com/
env.config();

const port =3000;
const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",async (req,res)=>{
    res.render("index1.ejs",{
        final_amount:null
    })
})

app.get("/convert-page", (req,res)=>{
    res.render("index.ejs",{
        final_amount:null});
})


app.post("/convert",async (req,res)=>{
    const from_cur=req.body["from-c"];
    const to_cur=req.body["to-c"];
    const response= await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${from_cur}`)
    const result=response.data;
    const value=result.conversion_rates[to_cur];
    const fina=(req.body["amount"])*(result.conversion_rates[to_cur]);
    const finna=fina.toFixed(2);
    res.render("index.ejs",{
        final_amount:finna,
        tocur:to_cur
    });
})

app.listen(port,()=>{
    console.log(`the server is running on port ${port}`);
})
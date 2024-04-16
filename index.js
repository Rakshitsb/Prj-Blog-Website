import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";

const app=express();
const port=3000;
let array=[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs",{array:array});

})

app.get("/Addsection",(req,res)=>{
    res.render("section.ejs");
})

app.get("/Aboutme",(req,res)=>{
    res.render("aboutme.ejs");
})

app.post("/Addsection",(req,res)=>{
    const post = {
        pp:req.body.Post_title,
        pc:req.body.Post_post
    };
    array.push(post);
res.redirect("/");
})


app.get("/posts/:postname",(req,res)=>{
    const reqtitle=_.lowerCase(req.params.postname);
    array.forEach(function(post){
        const storedtie=_.lowerCase(post.pp);
        if(storedtie===reqtitle){
            res.render("post.ejs",{title:post.pp,body:post.pc});
        }
    })
})

    
app.listen(port,()=>{
    console.log(`the server is running at ${port}`);
})

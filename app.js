var express=require("express");
var mysql=require("mysql");
var bodyParser=require("body-parser");
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"expressapp"
    
});

var pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"expressapp"

})

var app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

con.connect(function(err){
    if(err){
        throw err;
    }
    console.log("connected to mysql");
})

app.get("/",function(req,res){
    var sql="select*from image;";
    pool.query(sql,(err,res2,cols)=>{
        if(err){
            throw err;
        }
        res.render("home",{pst:res2});  
    });
    
});

app.post("/home",function(req,res){
    var name=req.body.name;
    var url=req.body.url;
    var sql="insert into image values('"+name+"','"+url+"');";
    pool.query(sql,(err,res2,cols)=>{
        if(err){
            throw err;
        }
        res.redirect("/");
    })

});

app.listen(8080,function(){
    console.log("server has been started");
});
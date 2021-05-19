const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const http=require("http");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index1.html");
})

app.post("/",function(req,res){
console.log("post is received")

    const query=req.body.cityName;
    const url="http://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metrics&appid=788853d7cdb452c29ed38e14072b34f5";
http.get(url,function(response){


console.log(response.statusCode)


response.on("data",function(data){

JSON.parse(data);
const weather=JSON.parse(data);
console.log(weather);
const temp=weather.main.temp;
const des=weather.weather[0].description;
const icon=weather.weather[0].icon;
const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

res.write("<p>The currently weather is"+des+"</p>")
res.write("<h1>The Temperature in jaipur is "+temp +"</h1>");
res.write("<img src="+imgUrl+">");

});
;})
});


app.listen(3000,function(req,res){
    console.log("3000 port")
})
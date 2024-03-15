const express = require("express");
const path = require("path");
const app = express();

const port = 3000 || 8080;
app.listen(port, () => {
  console.log(`${port}`);
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// app.use((res,req)=>{
// console.log("request recieved");
// })

app.get("/", (req, res) => {
  // res.send("HOME");
  res.render("home");
  
});

app.get("/rolldice",(req,res)=>{
  const dicevalue =Math.floor(Math.random()*6 +1   )
 res.render("rolldice",{dicenum:dicevalue});
});
app.get("/ig/:username",(req,res)=>{
  const {username}= req.params;
  res.render("instagram",{username});
});
app.get("/search", (req, res) => {
  console.log(req.query, "query");
  const { name } = req.query;
  res.send(`SignUp ${name}`);
});

// app.get('/:SignUp/:name',(req,res)=>{
//     console.log(req.params.name);
//     const {name,SignUp}=req.params;

//     res.send(`SignUp @${name}`);
// });
// app.get("/api/games", (req, res) => {
//   const games = [
//     {
//       title: "GTA ",
//       version: "5",
//     },
//     {
//       title: "takken ",
//       version: "3",
//     },
//   ];
//   res.send(games);
// });

app.get("*", (req, res) => {
  res.send("Page Not Exist");
});

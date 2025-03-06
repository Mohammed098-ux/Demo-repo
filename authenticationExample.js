const express=require('express');
const jwt =require('jsonwebtoken');
const jwtPassword="123456";
const app=express();

const ALL_USERS=[{
    username:"mohammed@gmail.com",
    password:"1234",
    name:"shaizan"
},{
    username:"mohammedowaiz@gmail.com",
    password:"123334",
    name:"iowaiza"
}
]

app.use(express.json());

function userExists(username,password){
    

    const userExist=false;
    for(let i=0;i<ALL_USERS.length;i++){
        if(ALL_USERS[i].username===username && ALL_USERS[i].password===password){
            userExist=true;
        }
    }
    return userExist;
};

app.get('/users',function(req,res){
    const token=req.headers.authorization;
    try{
        const decoded=jwt.verify(token,jwtPassword);
        const username=decoded.username;
    }
    catch(err){
        return res.status(403).json({
            msg:"Invalid Token"
        })
    }



})

app.post('/signin',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    if(!userExists(username,password)){
        return res.status(403).json({
            msg:"user dosent exists"
        })
    }
    var token=jwt.sign({username:username},jwtPassword);
    return res.json({
        token
    });


});

app.listen(3000);

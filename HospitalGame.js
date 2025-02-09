const express = require("express");
const app=express();

const users=[{       //this is a kind of local database
    name:"John",
    kidneys:[{
        healthy:false
    },{
        healthy:true
    }]
}]
 
app.use(express.json()); //middleware
 

app.get("/",function(req,res){
   const johnKidneys = users[0].kidneys;
   const numberOfKidneys=johnKidneys.length;
   let numberOfHealthyKidneys = 0;
   for(let i=0;i<johnKidneys.length;i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys++;
        }
   }
   const numberOfUnHealthyKidneys=numberOfKidneys-numberOfHealthyKidneys; 
   res.json({
    johnKidneys,
    numberOfHealthyKidneys,
    numberOfUnHealthyKidneys
   })
   
})


app.post("/",function(req,res){
   const  isHealthy = req.body.isHealthy;
   users[0].kidneys.push({
    healthy:isHealthy
   })
   res.json({
    msg:"Done!" 
   })
})

app.put("/",function(req,res){
  if(allAreHealthy){
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({msg:"Kidney Added Succefully"})
  }
  else{
    res.status(411).json({msg:"No Unhealthy Kidneys"})
  }
})

function allAreHealthy(){
    let areHealthy=true;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys.healthy){
            areHealthy=true;
        }

    }
    return allAreHealthy;
}

app.delete("/",function(req,res){
    if(isThereAtLeastOneUnhealthyKidney){ 
       
    const newKidneys=[];
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[i].kidneys[i].healthy){
            newKidneys.push({
                healthy:true
            })

        }
        users[0].kidneys=newKidneys;
        res.json({
            msg:"done"
        })
    }
    }else{
        res.status(411).json({msg:"No UnHealty Kidney"})
    }

    
})

function isThereAtLeastOneUnhealthyKidney(){
    let atLeastOneUnhealthyKidney=false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys.healthy){
            atLeastOneUnhealthyKidney=true;
        }
    }
    return atLeastOneUnhealthyKidney;
}

app.listen(3000,function(){
    console.log("server started on port 3000");
  })
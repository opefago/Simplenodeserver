const express = require('express');
const router = express.Router();
const md5 = require('md5');
const users = [
    {id: 1, name: "Ope Fago", username: "ope", password: md5("fago")},
    {id: 2, name: "Fola Fago", username: "fola", password: md5("fago")},
    {id: 3, name: "Ronke Fago", username: "ronke", password: md5("fago")}
 ];

const profiles = [
    {id: 1, hairColor: "Black", height: 1.75, weight: 91},
    {id: 2, hairColor: "Black", height: 1.65, weight: 55},
    {id: 3, hairColor: "Black", height: 0.7366, weight: 6}
 ];

router.get("/", (req, res)=>{
    res.send("Hello router!");
})

router.post("/verify", (req, res)=>{
    let body = req.body;
    let username = body.username;
    let password = body.password;
    if(!username || !password){
        res.status(400);
        res.json({message: "Invalid parameter"});
        return;
    }
    let currUser = users.filter((user)=>{
        if((user.username === username) && (user.password === md5(password))){
            return true;
        }
    })
    if(currUser.length == 1){
        res.send(currUser[0]);
        return;
    }
    res.status(400);
    res.json({message: "User not found"});
});

router.get("/profile/:profileId/", (req, res)=>{
    let param = req.params;
    console.log(`Profile id ${param.profileId}`)
    let currProfile = profiles.filter((profile)=>{
        if(profile.id == param.profileId){
            return true;
        }
    })

    if(currProfile.length == 1){
        res.send(currProfile[0]);
        return;
    }
    res.status(400);
    res.json({message: `No associated profile for id ${param.profileId}`});
});

module.exports = router;
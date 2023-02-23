//Requiring express
const express = require("express");

//Requiring https
const https = require("https");

//Requiring request
const request = require("request");

//Creating an instance of express
const app = express();

//To create a static folder for CSS
app.use(express.static(__dirname+"/public"));

//Using the inbuilt body-parser
app.use(express.urlencoded());

//Setting the API key and server - server is the last part of the API key after the hypen
client.setConfig({apiKey: "YOURAPIKEY",  server: "us11",});

//Setting the index.html on the main directory
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

//Starting the server on port 3000
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started at port 3000");
})


app.post("/",(req,res)=>{
    //Getting the values of the user input from the HTML 
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    //Creating an object according to mailchimp standards
    const data ={
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : fName,
                    LNAME : lName
                }

            }
        ]
    };

    //Converting the object into a Json file
    const JsonData = JSON.stringify(data);
    
    //Url taken from the 
    const url = 'https://us11.api.mailchimp.com/3.0/lists/52df8b9342';

    const options = {
        method : "POST",
        auth:"angela1:YourAPIKEY" 
    }

    //Request to send data to the MailChimp API 
    const request = https.request(url,options,(response)=>{
        response.on("data",(data)=> {
            console.log(JSON.parse(data));           
        })
    });

    if (response.statusCode == 200) {
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    request.write(JsonData);
    request.end();

})

//Redirecting to index.html, when the try again button is pressed in the failure.html 
app.post("/failure",(req,res)=>{
    res.redirect("/");
})

const express = require("express");
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https')

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
    var firstname = req.body.fName;
    var lastname = req.body.lName;
    var emailadd = req.body.email;

    var data = {
        members: [
            {
                email_address: emailadd,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };


var jsonData = JSON.stringify(data);

const url = "https://us12.api.mailchimp.com/3.0/lists/805be60058";

const options = {
    method: "POST",
    auth: "ankur:bcfb4df37d220f5ad023915c21e6c4a8-us12"
}
var statuscode;

const request=https.request(url,options,function(response){
    response.on("data", function (data) {
        console.log(JSON.parse(data));
      });
    console.log(response.statusCode);
    statuscode=response.statusCode;

    if(statuscode==200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }

});

request.write(jsonData);
request.end();
});

app.post("/failure",(req,res) => {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});


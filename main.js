// Cloned by Moses Crasto on 1 Dec 2023 from World "New Second(clone by Moses Crasto)" by Moses Crasto 
// Please leave this clone trail here.
 
// Cloned by Moses Crasto on 30 Nov 2023 from World "Chat with GPT model" by Starter user 
// Please leave this clone trail here.

var theprompt = "";
var Url = "https://api.d-id.com/";
const openaiURL = "https://api.openai.com/v1/chat/completions";           // can POST to this 3rd party URL
const themodel = "gpt-3.5-turbo";       // the OpenAI model we are going to talk to 
var apikey1 = "";
var apikey2 = "";

// default body is margin 0 and padding 0 
// give it more whitespace:

document.write(`
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Edu+VIC+WA+NT+Beginner:wght@700&family=Poppins&display=swap');
        body {
            display: flex; font-family: "Poppins"; padding: 40px; justify-content: space-evenly; color:#46474b;   
            background-image: linear-gradient(90deg, rgba(255,204,192,1) 0%, rgba(250,255,148,1) 100%);
            background-size: 200% 200%;
            animation: gradient 15s ease infinite;
        }
        @keyframes gradient {0% {background-position: 0% 50%;} 50% {background-position: 100% 50%;} 100% {background-position: 0% 50%;}}
        .but{
            background-color: #1c1c1c;
            border-radius: 5px;
            height:25px;
            border:none;
            color:#ffffff;
        }
    </style>
    <div 
        <div>
            <h1>Chat with your personal Therapeutic AI bot</h1>
            <h3>This uses <a href="https://docs.d-id.com/">D-ID AI</a> and <a href="https://platform.openai.com/docs/models/overview">open AI</a></h3>
            <p>This will take some time to load.<br>You can register for D-ID apikey at <a href="https://studio.d-id.com/account-settings">D-ID AI</a></p>
            <br>
            <div id=enterkey2>
            	<h3>Enter API key for D-ID AI</h3> 
            	<input style='width:25vw;' maxlength='2000' NAME="apikey2" id="apikey2" VALUE='' >  
            	<button onclick='setkey2();'  class="but">Set API key</button>
            </div>
            <div id=enterkey1>
                <h3>Enter API key for openAI</h3> 
            	<input style='width:25vw;' maxlength='2000' NAME="apikey1" id="apikey1" VALUE='' >  
            	<button onclick='setkey1();'  class="but" >Set API key</button>
            </div>
            <div style="width:40vw;">
                <h3>Tell me how you're feeling (The response will take around 20 seconds to generate)</h3>
                <input style="width:80%; height:25px" id="me" value="">
                <button onclick="sendchat();" class="but">Send</button>
            </div>
        </div>
        <div style="width:500px; height:500px; margin:20; padding: 20px;">
            <div style="box-shadow: 5px 5px 10px 5px gray; border-radius: 30px" id="them">Enter API key for D-ID AI for the world to start...</div>
        </div>
    </div>
`);

function setkey1()          
{
	apikey1 =  jQuery("input#apikey1").val();
	apikey1 = apikey1.trim();
	$("#enterkey1").html ( "<b>open AI API key has been set. </b>" );
}

function setkey2()          
{
	apikey2 =  jQuery("input#apikey2").val();
	apikey2 = apikey2.trim();
	$("#enterkey2").html ( "<b><br>D-ID API key has been set. </b>" );
	starting();
}

var thatdata = {
    "source_url": "https://clips-presenters.d-id.com/amy/FLZ1USJl7m/vzswgDCwKZ/image.png",
    "driver_url": "bank://lively/driver-06",
    "script": {
        "type": "text",
        "ssml": true,
        "input": "<break time=\"5000ms\"/>",
        "provider": {
            "type": "microsoft",
            "voice_id": "en-US-JennyNeural"
        }
    },
    "config": {
        "fluent": true, //to get output video that starts and ends with the same frame
        "stitch": true //to get output video that contains the entire and not only a cropped video around the face area
    }
}

// string representing JSON
var thatdatastring = JSON.stringify ( thatdata ); 

function starting(){
    
    // HTTP headers must be set up with API key: 
    $.ajaxSetup({
       headers:
       {
            "Content-Type": "application/json",
            "Authorization": "Basic " + apikey2  
       }
    });
    
    $.ajax({
        type: "POST",
        url: Url+"talks",
        data: thatdatastring,
        dataType: "json",
        success: function ( d, rc ) { successfnthat ( d, rc ); },
        error: function(e) { errorfn (e); }
    });
}

// global variable to examine return data
var answer;
var answerthat;

function successfnthat ( data, rc )
{
    console.log(data);
    id = data["id"];
    setTimeout(doSomething, 5000);
    function doSomething() {
        $.ajax({
            type: "GET",
            url: `${Url}talks/${id}`,
            success: function (d, rc) { successfthat(d, rc); },
            error: function (e) { errorfn(e); }
        });
    }
      
    function successfthat(data, rc) {
        console.log(data);
        answerthat = data.result_url;
        $("#them").html(`<video width="500" height="500" loop autoplay style="border-radius: 30px"><source src="${answerthat}"></video>`);
    }
}

var voice;
var style;

function sendchat()
{
    thisprompt = $("#me").val();

    var thisdata = {
        "model": themodel,
        "temperature": 0.7,
        "messages": [{
            "role": "system", 
            "content": "Pretend you are a therapeutic support. A user is feeling stressed and seeks guidance. Respond like you are a human. Respond accordingly in 2 sentences."
        },
        {
            "role": "user", 
            "content": thisprompt
        }] 
    };
    
    $.ajaxSetup({
       headers:
       {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apikey1  
       }
    });
    
    // then as string representing that JSON:
    var thisdatastring = JSON.stringify ( thisdata );
    
    // POST to 3rd party URL: 
    $.ajax({
        type: "POST",
        url: openaiURL,
        data: thisdatastring,
        dataType: "json",
        success: function ( d, rc ) { successthis ( d, rc ); },
          error: function(e) { errorfn (e); }
    });
    
    function successthis ( data, rc )
    {
        var theprompt = data["choices"][0].message.content;
        console.log( theprompt );
         
         // construct request as JSON
        var thedata = {
            "script": {
                "type": "text", //can also be audio type "type": "audio"
                "ssml": true,
                "input": theprompt, //if type is audio "audio_url": "https://path.to/audio.mp3"
                "provider": {
                	"type": "microsoft",
                	"voice_id": "en-US-JennyNeural",
                	"voice-config": {
                	    "style":"Sad"
                	}
                }
            },
            "presenter_id": "amy-FLZ1USJl7m",
            "driver_id": "vzswgDCwKZ",
            "background": {
                "color": "#1e446b"
            }
          };
           
        // string representing JSON
        var thedatastring = JSON.stringify ( thedata );   
        
        // HTTP headers must be set up with API key: 
        $.ajaxSetup({
           headers:
           {
                "Content-Type": "application/json",
                "Authorization": "Basic " + apikey2  
           }
        });
        
        // POST to 3rd party URL: 
        $.ajax({
            type: "POST",
            url: Url+"clips",
            data: thedatastring,
            dataType: "json",
            success: function ( d, rc ) { successfn ( d, rc ); },
            error: function(e) { errorfn (e); }
        });
    }
}

function successfn ( data, rc )
{
    let id = data["id"];
    console.log(id);
    console.log(data);
    setTimeout(doSomething, 20000);
    function doSomething() {
        // HTTP headers must be set up with API key: 
        $.ajaxSetup({
           headers:
           {
                "Content-Type": "application/json",
                "Authorization": "Basic "+apikey2  
           }
        });
        
        $.ajax({
            type: "GET",
            url: `${Url}clips/${id}`,
            success: function (d, rc) { successf(d, rc); },
            error: function (e) { errorfn(e); }
        });
    }
      
    function successf(data, rc) {
        console.log("In here");
        answer = data.result_url;
        console.log(answer);
        $("#them").html(`<video id="myvideo" width="500" height="500" autoplay style="border-radius: 30px"><source src="${answer}"></video>`);//To autoply instaed of getting controls(if internet speed is good)
        $("#them").html(`<video id="myvideo" width="500" height="500" control style="border-radius: 30px"><source src="${answer}"></video>`);// To get controls instaed of autoplay(if internet speed is slow)
        document.getElementById('myvideo').addEventListener('ended', myHandler, false);
    }
}

function myHandler(e) {
    var videoFile = answerthat;
    $('#myvideo').fadeOut(1000, function () {
        // Change video source
        $('#myvideo source').attr('src', videoFile);
        
        // Load and fade in the new video
        $('#myvideo')[0].load();
        $('#myvideo').fadeIn(1000);
        
        // Set loop attribute
        $('#myvideo').attr("loop", true);
    });
    document.getElementById('myvideo').removeEventListener('ended', myHandler, false)
    $("#me").val("");
}
 
function errorfn(e)
{
    console.log(e);
    $("#them").html ( "<font color=red><b> Unknown error. </b></font>" ); 
}

// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

callOpenCageApi()

function callOpenCageApi(){


    var http = new XMLHttpRequest();

    const url = "http://apilayer.net/api/list?access_key=77a7b2e2a8af085acba3e71dc884d2fa";
        http.open("GET", url);
        http.send();
        http.onreadystatechange = (e) => {
                var response = http.responseText;
                var responseJSON = JSON.parse(response); 
                loadInfo(responseJSON);

        }
}


function loadInfo(responseJSON) {
    //htmlText = "";
    
    loadType(responseJSON.currencies);

    function loadType(obj)
    {
       
        htmlText = "";
        //document.getElementById("type").innerHTML = "";

        document.getElementById("type2").innerHTML = "";
        for (var index in obj) {
            htmlText += '<option value="'+index+'" selected>'+ index +" - "+ obj[index]+'</option>';
            
        }
        //document.getElementById("type").innerHTML = htmlText;
        document.getElementById("type2").innerHTML = htmlText;

     
    }
 }

 function convert(){
       
    var e = document.getElementById("type2");
    var str = e.options[e.selectedIndex].text;
    var val = e.options[e.selectedIndex].value;

    //console.log(val);
    verif("USD"+val);

}

function verif(currency){


    var http = new XMLHttpRequest();

    const url = "http://www.apilayer.net/api/live?access_key=77a7b2e2a8af085acba3e71dc884d2fa&format=1";
        http.open("GET", url);
        http.send();
        http.onreadystatechange = (e) => {
                var response = http.responseText;
                var responseJSON = JSON.parse(response); 
              var obj = responseJSON.quotes;
               for (var index in obj) {

                if(index == currency){
                   console.log(index + " - " + obj[index]);
                   document.getElementById("cal").innerHTML = index + " - " + obj[index];
                  alert(index + " - " + obj[index]);
                }
                
            }
        }
}
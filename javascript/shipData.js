
function getText(numberOfParagraphs,blurb){
        for (var x=0; x<numberOfParagraphs; x++){
            console.log("test")
            $('.actualtext').append($(blurb).find("p:eq(0)"));
            $('.actualtext').append($(blurb).find("p:eq(0)"));
        }
}
function createPhotoContainer(description,urlImage){
    console.log(urlImage);
    $("<img class='materialboxed' data-caption='"+description+"' src='"+urlImage+"'>").appendTo(".photos");
    $('.materialboxed').materialbox();
                           
}
function basicLayoutContentShip(name,data){
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
                //replace Bold text with normal text
                blurb.find('b').each(function() { $(this).replaceWith($(this).html()); });
                // remove any references
                blurb.find('sup').remove();

                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();

                console.log(typeof(blurb))
                // $('#side-panel').html("");
                //Change the title and background

                $("#header h1").text(name);
                $("#imageheader").css('background', 'url("Photos/Backgrounds/shipheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");

                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                //Get Text( number of paragraps,text)
                getText(1,blurb)
                
}
function getImagesSection(pageURL){
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/" + pageURL;
        var title = page.split("/");
        title = title[title.length - 1];

        
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            console.log(data)
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    
                    for (n in data["query"]["pages"]) {
                        if (counter <= 2) {
                           //title for photo
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1,data["query"]["pages"][n].title.indexOf(".")-5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            createPhotoContainer(descriptionImage,fetchImage);
                            counter++;
                        }
                    }
                    })
                }
        })
    }
function setShipContent(name) {
    $('.images').show();

   if (name == "Neptune") { //Neptune
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Neptune_(1780_ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
            }
        });
        //Get Images
        getImagesSection("Neptune_(1780_ship)");
} if (name == "Duke of Portland") { //Duke of Portland
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Duke_of_Portland_(1794_ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                    var urlPage= "https://upload.wikimedia.org/wikipedia/commons/6/6e/StateLibQld_1_99648_Duke_of_Portland_%28ship%29.jpg"
                    createPhotoContainer("Duke of Portland Ship", urlPage);
            }
        });
} if (name == "General Hewitt") { //General Hewitt
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=General_Hewett_(1811_ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                    var urlPage= "https://collections.rmg.co.uk/mediaLib/320/media-320511/large.jpg"
                    createPhotoContainer("General Hewitt Ship", urlPage);
            }
        })
} if (name == "Edward") { //Edward
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Edward_(1806_ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                    var urlPage= "https://i.pinimg.com/564x/1c/9a/0f/1c9a0fdfb04af2f403b89169a54fab46.jpg"
                    createPhotoContainer("Eward Ship", urlPage);
            }
        })
} if (name == "Sarah") { //Sarah
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Simon_Taylor_(ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                    var urlPage= "https://i.pinimg.com/564x/1c/9a/0f/1c9a0fdfb04af2f403b89169a54fab46.jpg"
                    createPhotoContainer("Sarah Ship", urlPage);
            }
        })
} if (name == "George the Third") { //George
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=George_III_(ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                   getImagesSection("George_III_(ship)");
            }
        })
}if (name == "Indian") { //Indian
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Indian_(1809_ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                   getImagesSection("Indian_(1809_ship)");
            }
        })
}if (name == "Surrey") { //Surrey
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Surry_(1811_ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                   getImagesSection("Surry_(1811_ship)");
            }
        })
}if (name == "Maitland") { //Maitland
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Justinian_(1787_ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                   getImagesSection("Justinian_(1787_ship)");
            }
        })
}if (name == "Lord Melville") { //Lord
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=HMS_Lady_Nelson_(1798)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                   getImagesSection("HMS_Lady_Nelson_(1798)");
            }
        })
} if (name == "Lord Lynedoch [Lord Lyndoch]") { //Lord Lynd
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Edwin_Fox&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                   getImagesSection("Edwin_Fox");
            }
        })
} if (name == "Adelaide") { //Adelaide
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=HMS_Buffalo_(1813)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                   getImagesSection("HMS_Buffalo_(1813)");
            }
        })
} if (name == "Mount Stewart Elphinstone") { //Mount Steward
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Hougoumont_(ship)&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                      var urlPage= "https://upload.wikimedia.org/wikipedia/commons/4/4d/William_Clark_-_%E2%80%9ARoger_Stewart%E2%80%98.jpg"
                    createPhotoContainer("Elphinstone Ship", urlPage);
                  
            }
        })
} if (name == "Strathfieldsaye") { //Strathfieldsaye
         $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Scindian&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                    //set basic layout no matter the ship
                    //(name of the ship,data)
                    basicLayoutContentShip(name,data);
                      //Get Images
                      var urlPage= "https://woollydays.files.wordpress.com/2015/08/hive.jpg"
                    createPhotoContainer("Elphinstone Ship", urlPage);
                  
            }
        })
}
}


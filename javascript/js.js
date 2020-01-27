//SlidingMarker.initializeGlobally();
$('html').addClass('hide-scrollbar');
var TILE_URL = 'http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';
var mapEl;
var layer;
var layerID = 'my-custom-layer';
var map;
var scrollBarTimeout;
var ShipsArray = [];
var Vessels;
var geocoder = new google.maps.Geocoder();
var opened = false;
var threadNumber2;
var threadNumber3;
var shipsArray = [];
var randomRoute;
var result = "la";
var clicksA, clicksB, clicksC, clicksD = 0;
var currentPort;
var cityIcons = [];
var currentShip = 0;
var waterArray = [];
var clickedA = true;
var clickedB = true;
var clickedC = true;
var clickedD = true;
var polylineArray = [];
var shipsNumber = 0;
var shipsNumber2 = 0;
//Create Markers Object
var markerIcon = {
    url: "Photos/merope.png",
    scaledSize: new google.maps.Size(60, 60),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(30, 50),
    labelOrigin: new google.maps.Point(20, 60)
};
var waterIcon = {
    url: "Photos/water_anim.gif",
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(30, 60),
    labelOrigin: new google.maps.Point(40, 80)
};
var cityMarker = {
    url: "Photos/PortIcon.png",
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 40)
};
var londonIcon = {
    url: "Photos/Icons/London_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};
var gibraltarIcon = {
    url: "Photos/Icons/Gibraltar_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};
var liverpoolIcon = {
    url: "Photos/Icons/Liverpool_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};
var moretonBayIcon = {
    url: "Photos/Icons/MoretonBay_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};
var newSouthWalesIcon = {
    url: "Photos/Icons/NewSouthWales_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};
var vanDiemensLandIcon = {
    url: "Photos/Icons/VanDiemensLand_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};
var norfolkIslandIcon = {
    url: "Photos/Icons/NorfolkIsland_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};
var portPhilipIcon = {
    url: "Photos/Icons/PortPhilip_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};
var capeOfGoodHopeIcon = {
    url: "Photos/Icons/CapeOfGoodHope_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};
var sydneyIcon = {
    url: "Photos/Icons/Sydney_Icon.png",
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    labelOrigin: new google.maps.Point(40, 90)
};

function addIcons() {
    cityIcons.push(gibraltarIcon);
    cityIcons.push(londonIcon);
    cityIcons.push(liverpoolIcon);
    cityIcons.push(moretonBayIcon);
    cityIcons.push(newSouthWalesIcon);
    cityIcons.push(vanDiemensLandIcon);
    cityIcons.push(norfolkIslandIcon);
    cityIcons.push(portPhilipIcon);
    cityIcons.push(capeOfGoodHopeIcon);
    cityIcons.push(sydneyIcon);
}
addIcons();

function initialize() {
    console.log("document loaded");
    //Map options
    var mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(3.355596, 60.955078),
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: true
    }
    //Create map
    var mapEl = document.querySelector('#map_canvas');
    map = new google.maps.Map(mapEl, mapOptions);
    // Create a tile layer, configured to fetch tiles from TILE_URL.
    layer = new google.maps.ImageMapType({
        name: layerID,
        getTileUrl: function(coord, zoom) {
            var url = TILE_URL.replace('{x}', coord.x).replace('{y}', coord.y).replace('{z}', zoom);
            return url;
        },
        tileSize: new google.maps.Size(256, 256),
        minZoom: 1,
        maxZoom: 15
    });
    // Apply the new tile layer to the map.
    map.mapTypes.set(layerID, layer);
    map.setMapTypeId(layerID);
    //set side window
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById('side-panel'));
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('filterWindow'));
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('shipNumberinfo'));
}
//ADD MARKER
function addMarker(opts, marker, iterator) {
    opts.id = iterator;
    opts.icon = marker;
    opts.position = {
        lat: opts.lat,
        lng: opts.lng,
        duration: opts.duration,
        label: opts.label
    }
    return createMarker(opts);
}
//CREATE MARKER 
function createMarker(opts) {
    opts.map = map;
    opts.easing = "linear"
    return new SlidingMarker(opts);
};
//CHECKS IF WINDOW IS OPEN
function isInfoWindowOpen(infoWindow) {
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}

function getDistanceBetweenPoints(startPointLat, startPointLng) {
    if (startPointLat == 36.738884) {
        var endPoint = PlanCoordinates[6][(PlanCoordinates[6].length) - 2];
    } else if (startPointLat = 51.508742) {
        var endPoint = PlanCoordinates[0][(PlanCoordinates[0].length) - 2];
    } else if (startPointLat = 53.409532) {
        var endPoint = PlanCoordinates[1][(PlanCoordinates[1].length) - 2];
    } else if (startPointLat = 56.022948) {
        var endPoint = PlanCoordinates[2][(PlanCoordinates[2].length) - 2];
    } else if (startPointLat = 47.100045) {
        var endPoint = PlanCoordinates[3][(PlanCoordinates[3].length) - 2];
    } else if (startPointLat = 54.007769) {
        var endPoint = PlanCoordinates[4][(PlanCoordinates[4].length) - 2];
    } else if (startPointLat = 53.304621) {
        var endPoint = PlanCoordinates[7][(PlanCoordinates[7].length) - 2];
    } else if (startPointLat = 50.736455) {
        var endPoint = PlanCoordinates[8][(PlanCoordinates[8].length) - 2];
    } else if (startPointLat = 43.068888) {
        var endPoint = PlanCoordinates[11][(PlanCoordinates[11].length) - 2];
    } else {
        var endPoint = PlanCoordinates[14][(PlanCoordinates[14].length) - 2];
    }
    var latitude1 = startPointLat;
    var longitude1 = startPointLng;
    var latitude2 = endPoint.lat;
    var longitude2 = endPoint.lng;
    var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));
    var distanceKM = distance / 1000;
    return Math.round(distanceKM)
}
//clear the screen to default position
function setDefaultPosition() {
    clearInterval(threadNumber2);
    map.setZoom(3);
    map.setCenter(new google.maps.LatLng(23.355596, 60.955078));
}
// the smooth zoom function
function smoothZoom(map, max, cnt) {
    if (cnt >= max) {
        return;
    } else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event) {
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function() {
            map.setZoom(cnt)
        }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}

function managingSidePanel(item, iterator, type, shipDetails) {
    //when marker clicked event, set screen to center and open/ close sidepanel
    item.addListener("click", function() {
        $("#filterWindow").slideUp(600); //Open Windows for Ports
        $("#shipNumberinfo").slideUp(600);
        if (type == "C") {
            SidePanelAnimatePort();
            if (iterator == 0) { // Gibraltar
                currentPort = 0;
                setContentPort(0);
                opened = false;
            } else if (iterator == 1) { // London
                currentPort = 1;
                setContentPort(1);
                opened = false;
            } else if (iterator == 2) { // Liverpool
                currentPort = 2;
                setContentPort(2);
                opened = false;
            } else if (iterator == 3) { //Moreton Bay
                currentPort = 3
                setContentPort(3);
                opened = false;
            } else if (iterator == 4) { //New South Wales
                currentPort = 4
                setContentPort(4);
                opened = false;
            } else if (iterator == 5) { //Van Diemen's Land
                currentPort = 5
                opened = false;
                setContentPort(5);
            } else if (iterator == 6) { //Norfolk Island
                currentPort = 6
                opened = false;
                setContentPort(6);
            } else if (iterator == 7) { //Port Philip
                currentPort = 7
                opened = false;
                setContentPort(7);
            } else if (iterator == 8) { //Cape of Good Hope
                currentPort = 8
                opened = false;
                setContentPort(8);
            } else if (iterator == 9) { //Sydney
                currentPort = 9
                opened = false;
                setContentPort(9);
            }
        } else {
            SidePanelAnimateShip(); // Open windows for Ship
            currentShip = iterator;
            setContentShip(item, iterator, shipDetails);
        }
        map.panTo(item.position);
        //call smooth zoom
        smoothZoom(map, 8, map.getZoom());
        threadNumber2 = setInterval(function() {
            //follow marker
            map.panTo(item.getAnimationPosition());
            // console.log(item.getAnimationPosition());
        }, 001);
        // map.panTo(item.position);
        //I ZMIEN CONTENT napisac kod
    })
    //when clicking exit close window on port windows and go to default position
    $("#exitPort").click(function() {
        clearInterval(threadNumber2);
        clearInterval(threadNumber3);
        setDefaultPosition();
        $("#side-panel").hide();
        $(".photos").css("visibility", "hidden");
        $("#navigationBarPort").hide();
        $("#navigationBarPort").css("width", "0%");
        $("#filterWindow").slideDown();
        $("#shipNumberinfo").slideDown();
    })
    //when clicking exit on ship navigation  go to default position
    $("#exitShip").click(function() {
        clearInterval(threadNumber2);
        clearInterval(threadNumber3);
        setDefaultPosition();
        $("#side-panel").hide();
        $(".photos").css("visibility", "hidden");
        $("images").css("display", "none");
        $("#navigationBarShips").hide();
        $("#navigationBarShips").css("width", "0%");
        $("#filterWindow").show();
    })
}

function SidePanelAnimatePort() {
    $(".photos").css("visibility", "visible");
    $("#side-panel").animate({
        width: "toggle"
    }, 500, function() {
        opened = true;
        NavigationBarAnimatePort();
    })
}

function NavigationBarAnimatePort() {
    $("#navigationBarPort").css("display", "flex");
    $("#side-panel").css("background-image", "url('Photos/Frames/sidepanelframetest.png')");
    $("#side-panel").css("background-repeat", "no-repeat");
    $("#side-panel").css("background-size", "cover");
    $("#navigationBarPort").animate({
        width: "70%"
    }, 800, function() {})
}

function SidePanelAnimateShip() {
    $(".photos").css("visibility", "visible");
    $("#side-panel").animate({
        width: "toggle"
    }, 500, function() {
        opened = true;
        NavigationBarAnimateShip();
    })
}

function NavigationBarAnimateShip() {
    $("#navigationBarShips").css("display", "flex");
    $("#side-panel").css("background-image", "url('Photos/Frames/sidepanelframetest.png')");
    $("#side-panel").css("background-repeat", "no-repeat");
    $("#side-panel").css("background-size", "cover");
    $("#navigationBarShips").animate({
        width: "70%"
    }, 800, function() {})
}

function setContentShip(ship, iterator, shipData) {
    //setting the content for ship section
    // $("#header").append("Ship Name");
    // $(".convictContainer").remove();
    setShipContent(ship.label.text);
    $("#shipName").html(ship.label.text);
    $("#numberofConvicts").html("Number of convicts: ").append(numberofConvicts[iterator]);
    $("#shipDestination").html("Destination: ").append(shipData[iterator][1]);
    $("#totalDistance").html("Total distance: ").append(getDistanceBetweenPoints(ship.lat, ship.lng) + "km");
    $("#speed").html("Average Speed of the ship: ").append(calculateShipSpeed() + " knots");
    $("#shipDateArrival").html("Date of Arrival: ").append(shipData[iterator][3]);
}

function calculateShipSpeed() {
    var speed = 0;
    var kilometers = 0;
    speed = Math.floor(Math.random() * (30 - 20 + 1) + 20);
    return speed;
}

function nextShip() {
    currentShip += 1
    currentShip = currentShip % shipsArray.length; // if we go too high reset it
    return shipsArray[currentShip]
};

function previousShip() {
    if (currentShip === 0) { // currentPort would become 0
        currentShip = shipsArray.length; // so put it at the other end of the array
    }
    currentShip = currentShip - 1; // decrease by one
    return shipsArray[currentShip] // give us back the item of where we are now
}

function nextPort() {
    currentPort += 1
    currentPort = currentPort % portsArray.length; // if we go too high reset it
    return portsArray[currentPort]
};

function previousPort() {
    if (currentPort === 0) { // currentPort would become 0
        currentPort = portsArray.length; // so put it at the other end of the array
    }
    currentPort = currentPort - 1; // decrease by one
    return portsArray[currentPort] // give us back the item of where we are now
}
//CREATE INFO WINDOW,OPEN IT AND CLOSE IT 
function createOpenWindow(marker, contents) {
    var windowOnDOM = $("#window");
    var infoWindow = new google.maps.InfoWindow({
        content: contents
    });
}
//CREATE OPEN WINDOW FOR POLYLINE
function createOpenWindowPolyline(poly, content) {
    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(content);
    google.maps.event.addListener(poly, 'click', function(event) {
        placeholder = poly;
        infowindow.setPosition(event.latLng);
        infowindow.open(map);
        if (poly == null) {
            infowindow.close();
        }
    });
    google.maps.event.addListener(poly, 'mouseover', function(event) {
        this.setOptions({
            strokeOpacity: 0.5
        });
    });
    google.maps.event.addListener(map, 'dragstart', function(event) {
        infowindow.close();
    });
    google.maps.event.addListener(poly, 'mouseout', function() {
        this.setOptions({
            strokeOpacity: 0
        });
    });
}
//CREATE POLYLINE ROUTE
function creatingPath(ship, routeNumber, color) {
    //CREATE SYMBOL DASH
    var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        strokeWeight: 0.5,
        scale: 4,
        strokeColor: color
    };
    //Creating polylines route same as directions
    var ShipPath = new google.maps.Polyline({
        Shipid: ship.id,
        path: routeNumber,
        strokeOpacity: 0,
        strokeWeight: 4,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '15px'
        }],
    });
    ShipPath.setMap(map);
    var path = ShipPath.getPath();
    polylineArray.push(ShipPath);
    for (var i = 0; i < routeNumber.length; i++) {
        var loc = routeNumber[i];
        path.push(new google.maps.LatLng(loc[0], loc[1]));
    }
    return ShipPath;
}
//CREATE SHIPS ARRAY
function createShipsArray(shipDetails) {
    for (let x = 0; x < PlanCoordinates.length; x++) {
        shipsArray.push({
            lat: (PlanCoordinates[x][0].lat),
            lng: (PlanCoordinates[x][0].lng),
            duration: Math.floor((Math.random() * 60000) + 15000),
            label: {
                text: "",
                // color: getRandomColor(),
                fontSize: "15px",
                fontWeight: "bold"
            }
        })
    }
    return shipsArray
}

function calculateNumberofShips() {
    for (var x = 0; x < shipsArray.length; x++) {
        shipsNumber++;
    }
    return shipsNumber;
}
//GENERATE RANDOM ROUTE FOR THE SHIP
function generateRandomRoutes(PlanCoordinates) {
    var randomRoute = PlanCoordinates[Math.floor(Math.random() * PlanCoordinates.length)];
    return randomRoute
}

function HideShips(shipDetails, shipsArray, iterator) {
    if (filterShips(shipDetails[iterator][3], 1800, 1820) <= 1820) shipsArray.setVisible(false);
}

function getRandomColor(shipDetails, iterator) {
    if ((takeYear(shipDetails, 1807, 1827, iterator) > 1807) && (takeYear(shipDetails, 1807, 1827, iterator) <= 1827)) {
        color = "#8B0000";
    } else if ((takeYear(shipDetails, 1827, 1847, iterator) > 1827) && (takeYear(shipDetails, 1827, 1847, iterator) <= 1847)) {
        color = "#0000FF";
    } else if ((takeYear(shipDetails, 1787, 1807, iterator) > 1787) && (takeYear(shipDetails, 1787, 1807, iterator) <= 1807)) {
        color = "#228B22"
    } else if ((takeYear(shipDetails, 1847, 1867, iterator) > 1847) && (takeYear(shipDetails, 1847, 1867, iterator) <= 1867)) {
        color = "#696969"
    }
    return color;
}

function createWaterMarkers() {
    var waterMarker;
    waterMarker = new google.maps.Marker({
        position: {
            lat: -6.31529854,
            lng: 68.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -6.31529854,
            lng: 50.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 1.31529854,
            lng: 68.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 7.31529854,
            lng: 58.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -20.31529854,
            lng: 58.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 7.31529854,
            lng: 88.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 5.31529854,
            lng: 138.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 3.31529854,
            lng: 158.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 3.31529854,
            lng: 178.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -20.31529854,
            lng: 200.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -10.31529854,
            lng: 230.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -18.31529854,
            lng: 280.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 30.31529854,
            lng: 190.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 20.31529854,
            lng: 170.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 25.31529854,
            lng: 165.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 20.31529854,
            lng: 150.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -47.31529854,
            lng: 78.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -48.31529854,
            lng: 62.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -36.31529854,
            lng: 62.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -57.31529854,
            lng: 62.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -58.31529854,
            lng: 92.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -58.81374172,
            lng: 138.44921875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -63.07486569,
            lng: 17.40234375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -69.53451763,
            lng: -20.56640625
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -53.12040528,
            lng: -1.23046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -18.97902595,
            lng: 4.04296875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -22.91792294,
            lng: -33.33203125
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 11.17840187,
            lng: -45.17578125
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 28.72433966,
            lng: 17.75390625
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 28.54681317,
            lng: 30.76171875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 31.95216224,
            lng: -68.02734375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 36.59788913,
            lng: -51.85546875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 18.59788913,
            lng: -51.85546875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 50.51342653,
            lng: -37.79296875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 58.07787627,
            lng: -84.19921875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 64.6238772,
            lng: 6.15234375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 56.94497418,
            lng: 21.26953125
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 56.17002298,
            lng: -19.16015625
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -9.79567758,
            lng: 97.55859375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 71.74643172,
            lng: 42.01171875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -39.63953756,
            lng: -139.04296875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -50.51342653,
            lng: -175.60546875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -30.14512718,
            lng: -90.52734375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -58.63121664,
            lng: -84.19921875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 37.99616268,
            lng: -135.17578125
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 9.79567758,
            lng: -106.34765625
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 1.05462794,
            lng: -87.71484375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -10.48781188,
            lng: -173.49609375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 16.63619188,
            lng: -141.15234375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 50.73645514,
            lng: -158.02734375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -66.23145748,
            lng: -109.16015625
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 73.7265947,
            lng: 11.77734375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 71.30079292,
            lng: -10.01953125
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 59.35559611,
            lng: -18.80859375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 63.07486569,
            lng: -29.35546875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 60.23981117,
            lng: -57.12890625
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 0.35156029,
            lng: -45.52734375
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 10.21118019,
            lng: -76.81640625
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -40.44694706,
            lng: -47.28515625
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: 10.31529854,
            lng: 180.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -15.31529854,
            lng: 78.73046875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
    waterMarker = new google.maps.Marker({
        position: {
            lat: -53.43144134,
            lng: -36.38671875
        },
        map: map,
        icon: waterIcon,
        optimized: false,
        clickable: false
    })
}
//COPY POLYLINE PATH FOR MARKER
function moveShipAlongPath(ship, routeNumber) {
    //set starting position
    ship.setPosition(PlanCoordinates[routeNumber][1]);
    var counter = 2;
    var threadNumber = setInterval(function() {
        if ((ship.getPosition().lat != ship.getAnimationPosition().lat) && (ship.getPosition().lng != ship.getAnimationPosition().lng)) {} else {
            if (counter < (PlanCoordinates[routeNumber].length)) {
                ship.setPosition(PlanCoordinates[routeNumber][counter]);
                counter += 1;
                // console.log(ship.label.text +  " In checkpoint   and counter is " + counter + "Total Array: " + PlanCoordinates[0].length);
            } else {
                // console.log( ship.label.text +  "Ship finished the route " + counter);
                clearInterval(threadNumber);
            }
        }
    }, 00001);
}

function setInterface(ships, shipsWindow, shipName, iterator, shipDetails) {
    var maxLength = 0;
    if (geocoder) {
        geocoder.geocode({
            'address': shipName[1]
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    // randomRoute = generateRandomRoutes(PlanCoordinates);
                    // console.log(randomRoute);
                    maxLength = PlanCoordinates[iterator].length;
                    PlanCoordinates[iterator][maxLength] = results[0].geometry.location; //update destination for the route
                    shipsArray[iterator] = addMarker(shipsArray[iterator], markerIcon, iterator);
                    shipsArray[iterator].label.color = getRandomColor(shipDetails, iterator); // set color for each ship 
                    ShipWindow = creatingPath(shipsArray[iterator], PlanCoordinates[iterator], shipsArray[iterator].label.color);
                    createPorts(portsArray);
                    createWaterMarkers();
                    managingSidePanel(shipsArray[iterator], iterator, "S", shipDetails);
                    createOpenWindow(shipsArray[iterator], shipsWindow);
                    createOpenWindowPolyline(ShipWindow, shipsWindow);
                    moveShipAlongPath(shipsArray[iterator], iterator);
                    shipsArray[iterator].label.text = shipName[0];
                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    }
}
//GET SHIPS NAMES,Port of destination AND RETURN THE ARRAY
function getShipsDetails(data) {
    var shipsDetailsArray = [];
    for (var i = 0; i < data.length; i++) {
        shipsDetailsArray.push([data[i].Vessel, data[i].PlaceofArrival, data[i].ConvictName, data[i].DateofDeparture]);
    }
    return shipsDetailsArray;
}
//GROUP SHIPS BY CONVICT NAME
function groupShipsbyName(data) {
    Array.prototype.groupBy = function(prop) {
        return this.reduce(function(groups, item) {
            var val = item[prop];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {});
    }
    var array = data.groupBy("Vessel");
    return array;
}

function calculateNumberofConvictsPerShip(shipData) {
    numberofConvicts = [];
    for (let i in shipData) {
        numberofConvicts.push(shipData[i].length);
    }
    return numberofConvicts;
}

function calculateNamesofConvictsPerShip(shipData) {
    var namesofConvicts = [];
    for (let i in shipData) {
        let names = shipData[i].map(item => item.ConvictName);
        namesofConvicts.push(names.join("<br />"));
    }
    return namesofConvicts;
}

function getShipDestinations(shipData) {
    var shipDestinations = [];
    for (let z in shipData) {
        shipDestinations.push(shipData[z])
    }
    return shipDestinations
}

function createPorts(portsArray) {
    var city;
    for (var x = 0; x < portsArray.length; x++) {
        city = addMarker(portsArray[x], cityIcons[x]);
        managingSidePanel(city, x, "C");
    }
}

function removeCrossbar() {
    $('html').addClass('hide-scrollbar');
}

function addCrossBar() {
    $('html').removeClass('hide-scrollbar');
}
//Filter string to only year
function takeYear(shipDetails, minYear, maxYear, x) {
    var year = shipDetails[x][3].split(/[^\d]/).filter(function(n) {
        if ((n >= minYear) && (n <= maxYear)) return n
    });
    return parseInt(year.join());
}

function setsDestinationWithPort(destination) {
    var portmarker;
    for (let z = 0; z < portsArray.length; z++) {
        if (destination == portsArray[z].label.text) {
            setContentPort(z);
            return portsArray[z].label.text
        }
    }
    return "Didn't find the port for this string"
}

function hideShips(shipDetails, minYear, maxYear, active) {
    if (active) {
        for (var x = 0; x < shipsArray.length; x++) {
            if ((takeYear(shipDetails, minYear, maxYear, x) > minYear) && (takeYear(shipDetails, minYear, maxYear, x) <= maxYear)) {
                if (shipsArray[x].setVisible) {
                    shipsArray[x].setVisible(false);
                    //calculate ships
                    for (var z = 0; z < polylineArray.length; z++) {
                        if (polylineArray[z].Shipid == shipsArray[x].id) {
                            polylineArray[z].setVisible(false);
                        }
                    }
                } else {}
            }
        }
    } else {
        for (var x = 0; x < shipsArray.length; x++) {
            if ((takeYear(shipDetails, minYear, maxYear, x) > minYear) && (takeYear(shipDetails, minYear, maxYear, x) <= maxYear)) {
                if (shipsArray[x].setVisible) {
                    shipsArray[x].setVisible(true);
                    for (var z = 0; z < polylineArray.length; z++) {
                        if (polylineArray[z].Shipid == shipsArray[x].id) {
                            polylineArray[z].setVisible(true);
                        }
                    }
                }
            }
        }
    }
}

function setContentPort(city) {
    if (city == 4) {
        $.ajax({ //New South Wales
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=History_of_New_South_Wales&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //remove bold
                blurb.find('b').each(function() {
                    $(this).replaceWith($(this).html());
                });
                //Change the title and background
                $("#header h1").text("New South Wales");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/newsouthwalesheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(0)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/History_of_New_South_Wales";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (var n in data["query"]["pages"]) {
                        if (counter == 0) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='The founding of Australia by Artur Philip' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/The_Founding_of_Australia._By_Capt._Arthur_Phillip_R.N._Sydney_Cove%2C_Jan._26th_1788.jpg/220px-The_Founding_of_Australia._By_Capt._Arthur_Phillip_R.N._Sydney_Cove%2C_Jan._26th_1788.jpg'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else if (counter == 1) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='Artur Philip' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/ArthurPhilip.jpg/220px-ArthurPhilip.jpg'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else if (counter == 2) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='New Holland including New South Wales' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/New_Holland_including_New_South_Wales.jpg/800px-New_Holland_including_New_South_Wales.jpg'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        }
                    }
                });
            }
        });
    }
    if (city == 2) { //Liverpool
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Port_of_Liverpool&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //remove bold
                blurb.find('b').each(function() {
                    $(this).replaceWith($(this).html());
                });
                //Change the title and background
                $("#header h1").text("Liverpool");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/liverpoolheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(5)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/Port_of_Liverpool";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (var n in data["query"]["pages"]) {
                        if (counter == 0) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='Nelson Dock Sign' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Nelson_Dock_sign.jpg/800px-Nelson_Dock_sign.jpg'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else if (counter == 1) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='Liverpool Port' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Liverpool_RJD_42.jpg/800px-Liverpool_RJD_42.jpg'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else if (counter == 2) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed'  data-caption='Port of Liverpool building official' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Port_of_Liverpool_Building_Front.jpg/220px-Port_of_Liverpool_Building_Front.jpg'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        }
                    }
                });
            }
        });
    } else if (city == 1) { //London
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Port_of_London&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //remove bold
                blurb.find('b').each(function() {
                    $(this).replaceWith($(this).html());
                });
                //Change the title and background
                $("#header h1").text("London");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/londonheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(7)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/Port_of_London";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (var n in data["query"]["pages"]) {
                        if (counter <= 2) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "' src='" + fetchImage + "'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else counter++;
                    }
                });
            }
        });
    } else if (city == 0) { //Gibraltar
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Gibraltar&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //remove bold
                blurb.find('b').each(function() {
                    $(this).replaceWith($(this).html());
                });
                //Change the title and background
                $("#header h1").text("Gibraltar");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/gibraltarheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(2)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/Gibraltar";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (var n in data["query"]["pages"]) {
                        if (counter <= 2) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "' src='" + fetchImage + "'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else counter++;
                    }
                });
            }
        });
    } else if (city == 9) { //Sydney
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=4&page=Sydney&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //remove bold
                blurb.find('b').each(function() {
                    $(this).replaceWith($(this).html());
                });
                //Change the title and background
                $("#header h1").text("Sydney");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/sydneyheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(0)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/Sydney";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (var n in data["query"]["pages"]) {
                        if (counter == 0) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Thomas_Watling_-_A_Direct_North_General_View_of_Sydney_Cove%2C_1794.jpg/1024px-Thomas_Watling_-_A_Direct_North_General_View_of_Sydney_Cove%2C_1794.jpg'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else if (counter == 1) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "' src='https://upload.wikimedia.org/wikipedia/commons/a/a1/Sydney_1888.jpg'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else if (counter == 2) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Flag_of_Sydney.jpg/220px-Flag_of_Sydney.jpg'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        }
                    }
                });
            }
        });
    } else if (city == 5) { // Van diemens
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=4&page=Van_Diemen%27s_Land&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //remove bold
                blurb.find('b').each(function() {
                    $(this).replaceWith($(this).html());
                });
                //Change the title and background
                $("#header h1").text("Van Diemen's Land");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/vandiemensheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(0)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/Van_Diemen%27s_Land";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (var n in data["query"]["pages"]) {
                        if (counter <= 2) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "' src='" + fetchImage + "'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else counter++;
                    }
                });
            }
        });
        // Port Philip 7
    } else if (city == 7) {
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&page=Port_Phillip&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //remove bold
                blurb.find('b').each(function() {
                    $(this).replaceWith($(this).html());
                });
                //Change the title and background
                $("#header h1").text("Port Philip");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/portphilipheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(2)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/Port_Phillip";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (var n in data["query"]["pages"]) {
                        if (counter <= 2) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "' src='" + fetchImage + "'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else counter++;
                    }
                });
            }
        });
        //Norfolk Island 6
    } else if (city == 6) {
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=3&page=Norfolk_Island&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                //Change the title and background
                $("#header h1").text("Norfolk Island");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/norfolkislandheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(0)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/Norfolk_Island";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (var n in data["query"]["pages"]) {
                        if (counter <= 2) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "' src='" + fetchImage + "'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else counter++;
                    }
                });
            }
        });
    } else if (city == 8) { //Cape of Good Hope
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Cape_Colony&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                blurb.find('b').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                // $('#side-panel').html($(blurb).find("p"));
                //Change the title and background
                $("#header h1").text("Cape of Good Hope");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/capeofgoodhopeheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(0)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/Cape_Colony";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (var n in data["query"]["pages"]) {
                        if (counter <= 2) {
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "'  src='" + fetchImage + "'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        } else counter++;
                    }
                });
            }
        });
    } else if (city == 3) { //Moreton Bay
        $.ajax({
            type: "GET",
            url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=1&page=Moreton_Bay&callback=?",
            async: false,
            dataType: "jsonp",
            success: function(data, textStatus, jqXHR) {
                var markup = data.parse.text["*"];
                var blurb = $('<div></div>').html(markup);
                // remove links as they will not work
                blurb.find('a').each(function() {
                    $(this).replaceWith($(this).html());
                });
                // remove any references
                blurb.find('sup').remove();
                // remove cite error
                blurb.find('.mw-ext-cite-error').remove();
                // $('#side-panel').html("");
                //Change the title and background
                $("#header h1").text("Moreton Bay");
                $("#imageheader").css('background', 'url("Photos/Backgrounds/moretonbayheader.png") no-repeat scroll 0 0 transparent');
                $("#imageheader").css('background-size', "cover");
                //Set the content text clear text and images
                $('.photos').empty();
                $('.actualtext').empty();
                $('.actualtext').append($(blurb).find("p:eq(3)"));
            },
            error: function(errorMessage) {}
        });
        //GETTING IMAGES SECTION 
        var page = "https://en.wikipedia.org/wiki/Moreton_Bay";
        var title = page.split("/");
        title = title[title.length - 1];
        //Images 
        $.getJSON("https://en.wikipedia.org/w/api.php?action=parse&page=" + title + "&prop=images&format=json&callback=?", function(data) {
            for (img in data["parse"]["images"]) {
                var counter = 0;
                $.getJSON("https://en.wikipedia.org/w/api.php?action=query&titles=Image:" + data["parse"]["images"][img] + "&prop=imageinfo&iiprop=url&meta=siteinfo&siprop=rightsinfo&format=json&callback=?", function(data) {
                    for (n in data["query"]["pages"]) {
                        if (counter <= 2) {
                            //title for photo
                            var descriptionImage = data["query"]["pages"][n].title.substr(data["query"]["pages"][n].title.indexOf(":") + 1, data["query"]["pages"][n].title.indexOf(".") - 5)
                            var fetchImage = (data["query"]["pages"][n]["imageinfo"][0]["url"]);
                            //Create IMG containter for each photo
                            $("<img class='materialboxed' data-caption='" + descriptionImage + "' src='" + fetchImage + "'>").appendTo(".photos");
                            counter++;
                            $('.materialboxed').materialbox();
                        }
                    }
                });
            }
        });
    }
}

function searchShips(shipDetails) {
    var figureDesc;
    var ships = 0; //character found var
    input = document.getElementById("searchbar");
    var value = $(input).val().toUpperCase(); // store input inside a variable
    for (var x = 0; x < shipsArray.length; x++) {
        if (shipDetails[x][0].toUpperCase().indexOf(value) > -1) { // sprawdz czy litera znajduje sie w slowie
            if (shipsArray[x].setVisible) {
                if (shipsArray[x].Visible != false) {
                    shipsArray[x].setVisible(true);
                    shipsArray[x].setAnimation(google.maps.Animation.BOUNCE);
                    //checks the route and hide it
                    for (var z = 0; z < polylineArray.length; z++) {
                        if (polylineArray[z].Shipid == shipsArray[x].id) {
                            polylineArray[z].setVisible(true);
                        }
                    }
                    ships++;
                    $("#shipNumberinfo h1").html(ships + " Vessels");
                }
            } else {}
        } else {
            if (shipsArray[x].setVisible) {
                shipsArray[x].setAnimation(null);
                shipsArray[x].setVisible(false);
                for (var z = 0; z < polylineArray.length; z++) {
                    if (polylineArray[z].Shipid == shipsArray[x].id) {
                        polylineArray[z].setVisible(false);
                    }
                }
            }
        }
        if (value == "") {
            if (shipsArray[x].setVisible) {
                shipsArray[x].setAnimation(null);
            }
        }
    }
}
var data = {
    resource_id: '6ab35f9a-e476-4d29-84de-2e18d1e704c7', // the resource id
    limit: 30, // get 5 results
    q: '' // query for 'jones'
};
$.ajax({
    url: 'https://data.gov.au/api/action/datastore_search',
    data: data,
    cache: true,
    dataType: 'jsonp',
    async: false,
    success: function(data) {
        //Initialize map
        var delay = 9000;
        var data = data.result.records;
        var shipDetails = getShipsDetails(data);
        var shipData = groupShipsbyName(data);
        createShipsArray(shipDetails);
        var numberofConvicts = calculateNumberofConvictsPerShip(shipData);
        var namesofConvicts = calculateNamesofConvictsPerShip(shipData);
        var shipDestinations = getShipDestinations(shipData);
        //CONENT STRING INFOWINDOW
        function setContentWindowSchema(number, shipData) {
            var contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<h1 id="firstHeading" class="firstHeading">' + shipDetails[number][0] + '</h1>' + '<div id="bodyContent">' + '<p> Number of convicts onboard: ' + numberofConvicts[number] + '</p>' + '<p> Names of convicts onboard: <br/> ' + namesofConvicts[number] + '</p>' + '<p> Date of Arrival: ' + shipDetails[number][3] + '</p>' + '<p> Port of Arrival: ' + shipDetails[number][1] + '</p>' + '</div>' + '</div>';
            return contentString;
        }
        //initialize data for each ship on map
        for (var z = 0; z < 10; z++) {
            setInterface(ShipsArray, setContentWindowSchema(z), shipDetails[z], z, shipDetails);
        }
        //delay for geolocation
        setTimeout(function() {
            for (var z = 10; z < 20; z++) {
                setInterface(ShipsArray, setContentWindowSchema(z), shipDetails[z], z, shipDetails);
            }
        }, delay)
        initialize();
        //calculate number of ships
        $("#shipNumberinfo h1").html(18 + " Vessels");
        //When scroll event is used over text area, clear timer to hide Crossbar
        $(".text").scroll(function() {
            addCrossBar();
            clearTimeout(myTimeout);
            myTimeout = setTimeout(removeCrossbar, 1000);
        })
        //Mouse over event over port text to show scrollbar
        $(".text").mouseenter(function() {
            addCrossBar();
            myTimeout = setTimeout(removeCrossbar, 1000); // after 1 second remove scrollbar
        })
        //When mouse leaves the text, hide the scrollbar
        $(".text").mouseleave(function() {
            removeCrossbar();
        })
        //Set next port content 
        $("#nextPort").click(function() {
            clearInterval(threadNumber2);
            map.panTo(nextPort().position);
            setContentPort(currentPort);
        })
        //Set previous port content 
        $("#previousPort").click(function() {
            clearInterval(threadNumber2);
            map.panTo(previousPort().position);
            setContentPort(currentPort);
        })
        //Set next ship content
        $("#nextShip").click(function() {
            clearInterval(threadNumber2);
            clearInterval(threadNumber3);
            var actualShip = nextShip();
            console.log(actualShip)
            if (actualShip.label.text != "") setContentShip(actualShip, currentShip, shipDetails);
            else {
                console.log("bledny ship")
                var actualShip = nextShip();
                setContentShip(actualShip, currentShip, shipDetails);
            }
            threadNumber3 = setInterval(function() {
                //follow marker
                map.panTo(actualShip.getAnimationPosition());
            }, 001);
        })
        //Set previous ship content
        $("#previousShip").click(function() {
            clearInterval(threadNumber2);
            clearInterval(threadNumber3);
            var actualShip = previousShip();
            if (actualShip.label.text != "") setContentShip(actualShip, currentShip, shipDetails);
            else {
                console.log("bledny ship")
                var actualShip = previousShip();
                setContentShip(actualShip, currentShip, shipDetails);
            }
            threadNumber3 = setInterval(function() {
                //follow marker
                map.panTo(actualShip.getAnimationPosition());
            }, 001);
        })
        //sets List of Convicts
        $("#listOfConvicts").click(function() {
            $("#header h1").text("List of Convicts");
            $("#imageheader").css('background', 'url("Photos/Backgrounds/convictheader.png") no-repeat scroll 0 0 transparent');
            $("#imageheader").css('background-size', "cover");
            //get value for number of convicts from DOM
            var r = /\d+/;
            var s = $("#numberofConvicts").text();
            var numberofConvicts = (s.match(r));
            alert(numberofConvicts)
            //Set the content text clear text and images
            $('.images').css("display", "none");
            $('.photos').empty();
            $('.actualtext').empty();
            var cloneContainer = $(".convictContainer");
            //generete Containers depends on how many convicts are there
            for (var x = 0; x < numberofConvicts; x++) {
                //set name
                $(cloneContainer).find("figcaption").text("Test Convict");
                //set photo
                $(cloneContainer).find(".myImage").attr("src", "Photos/Convicts/James Calhoun.jpg")
                // set text
                $(cloneContainer).find(".myheading").text("Convict Biography to be implemented")
                //append this to container
                $(cloneContainer).clone().appendTo(".actualtext").show();
            }
        })
        //sets destination port
        $("#portOfDestination").click(function() {
            var portname = (shipDetails[currentShip][1]);
            portname = portname.replace(/\./ig, "");
            setsDestinationWithPort(portname);
        })
        $("#searchbar").keyup(function() {
            searchShips(shipDetails);
        })
        $("#1787-1807").click(function() {
            if ($(this).hasClass('active')) {
                clickedA = true;
                shipsNumber2 -= 1;
                $(this).removeClass('active')
            } else {
                clickedA = false;
                shipsNumber2 += 1;
                $(this).addClass('active')
            }
            hideShips(shipDetails, 1787, 1807, clickedA);
            hideShips(shipDetails, 1807, 1827, clickedB);
            hideShips(shipDetails, 1827, 1847, clickedC);
            hideShips(shipDetails, 1847, 1867, clickedD);
            $("#shipNumberinfo h1").html(shipsNumber2 + " Vessels");
        });
        $("#1807-1827").click(function() {
            if ($(this).hasClass('active')) {
                clickedB = true;
                shipsNumber2 -= 5;
                $(this).removeClass('active')
            } else {
                clickedB = false;
                shipsNumber2 += 5;
                $(this).addClass('active')
            }
            hideShips(shipDetails, 1787, 1807, clickedA);
            hideShips(shipDetails, 1807, 1827, clickedB);
            hideShips(shipDetails, 1827, 1847, clickedC);
            hideShips(shipDetails, 1847, 1867, clickedD);
            $("#shipNumberinfo h1").html(shipsNumber2 + " Vessels");
        });
        $("#1827-1847").click(function() {
            if ($(this).hasClass('active')) {
                clickedC = true;
                shipsNumber2 -= 10;
                $(this).removeClass('active')
            } else {
                clickedC = false;
                shipsNumber2 += 10;
                $(this).addClass('active')
            }
            hideShips(shipDetails, 1787, 1807, clickedA);
            hideShips(shipDetails, 1807, 1827, clickedB);
            hideShips(shipDetails, 1827, 1847, clickedC);
            hideShips(shipDetails, 1847, 1867, clickedD);
            $("#shipNumberinfo h1").html(shipsNumber2 + " Vessels");
        });
        $("#1847-1867").click(function() {
            if ($(this).hasClass('active')) {
                clickedD = true;
                shipsNumber2 -= 2;
                $(this).removeClass('active')
            } else {
                clickedD = false;
                shipsNumber2 += 2;
                $(this).addClass('active')
            }
            hideShips(shipDetails, 1787, 1807, clickedA);
            hideShips(shipDetails, 1807, 1827, clickedB);
            hideShips(shipDetails, 1827, 1847, clickedC);
            hideShips(shipDetails, 1847, 1867, clickedD);
            $("#shipNumberinfo h1").html(shipsNumber2 + " Vessels");
        });
        $("#reset").click(function() {
            $(".button").removeClass('active');
            reset = false;
            shipsNumber2 = 18;
            hideShips(shipDetails, 1700, 2000, reset);
            clickedA = true;
            clickedB = true;
            clickedC = true;
            clickedD = true;
            $("#shipNumberinfo h1").html(shipsNumber2 + " Vessels");
            shipsNumber2 = 0;
        });
        
    }
})

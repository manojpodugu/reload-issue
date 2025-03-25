// Predefined paths with fake locations
const predefinedPaths = {
    "Entrance-Office": [
        { x: 926, y: 322 },  // Entrance
        { x: 733, y: 323 },  // 🔴 Fake location (Hidden waypoint)
        { x: 730, y: 377 }   // Office
    ],
 "Entrance-Classroom": [
        { x: 926, y: 322 },  // 📍 Entrance
        { x: 733, y: 323 },  // 🔴 Fake location (Hidden waypoint)
        { x: 728, y: 270 }   // 📍 Classroom
    ],
    /*   "Office-Canteen": [
        { x: 700, y: 300 },  // 📍 Office
        { x: 600, y: 350 },  // 🔴 Fake location (Hidden waypoint)
        { x: 500, y: 450 }   // 📍 Canteen
    ],
    "Classroom-Playground": [
        { x: 850, y: 250 },  // 📍 Classroom
        { x: 880, y: 350 },  // 🔴 Fake location (Hidden waypoint)
        { x: 900, y: 500 }   // 📍 Playground
    ]*/
};

// Get values from URL or localStorage
const urlParams = new URLSearchParams(window.location.search);
/*let*/const source = urlParams.get("source") || localStorage.getItem("source");
/*let*/const destination =  urlParams.get("destination") || localStorage.getItem("destination");

// If source/destination are missing, redirect back
/*if (!source || !destination) {
    alert("No route selected! Please go back and choose locations.");
    window.location.href = "index.html";
} else {*/
    const canvas = document.getElementById("mapCanvas");
    const mapImage = document.getElementById("mapImage");

    mapImage.onload = function() {
        canvas.width = mapImage.clientWidth;
        canvas.height = mapImage.clientHeight;
        drawRoute(source, destination);
    };
//}

// Get correct path
function getPath(source, destination) {
    let key1 = `${source}-${destination}`;
    let key2 = `${destination}-${source}`;
    return predefinedPaths[key1] || predefinedPaths[key2] || [];
}

// Draw route with dotted line
function drawRoute(source, destination) {
    const waypoints = getPath(source, destination);
    if (waypoints.length === 0) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([5, 5]);  // Dotted line
    ctx.beginPath();

    waypoints.forEach((point, index) => {
        let x = (point.x / 1152) * canvas.width;
        let y = (point.y / 648) * canvas.height;

        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Back button
function goBack() {
    window.location.href = "index.html";
}

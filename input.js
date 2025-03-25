function navigate() {
    let source = document.getElementById("source").value;
    let destination = document.getElementById("destination").value;
    
    // Store values in localStorage
    localStorage.setItem("source", source);
    localStorage.setItem("destination", destination);

    // Redirect to map page
    window.location.href = /*"map.html";*/`map.html?source=${source}&destination=${destination}`;
}

// Import ArcGIS modules needed for map creation and interaction
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
], function (Map, MapView, Graphic, GraphicsLayer) {

    // Initialize a map with a vector basemap optimized for navigation
    const map = new Map({
        basemap: "streets-navigation-vector"
    });

    // Set up a MapView to display the map within a container, centered on Lagoon's approximate coordinates
    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-111.894, 40.985],
        zoom: 15,
        constraints: {
            rotationEnabled: false,
            minZoom: 16,
            maxZoom: 18
        },
        ui: {
            components: [] // Removes default UI elements to keep the map clean
        }
    });

    // Create a layer to hold the graphics (pins/markers) representing attractions
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // Define an array of attractions with details like type, coordinates, height limit, and thrill level
    const attractions = [
        { name: "Cannibal", type: "Coaster", coordinates: [40.9875, -111.8950], heightLimit: 48, thrillLevel: "Extreme" },
        { name: "Wicked", type: "Coaster", coordinates: [40.9841, -111.8956], heightLimit: 46, thrillLevel: "Extreme" },
        { name: "Fire Dragon", type: "Coaster", coordinates: [40.9834, -111.8952], heightLimit: 46, thrillLevel: "Extreme" },
        { name: "The Spider", type: "Coaster", coordinates: [40.9843, -111.8952], heightLimit: 46, thrillLevel: "Very High" },
        { name: "Wild Mouse", type: "Coaster", coordinates: [40.9839, -111.8942], heightLimit: 46, thrillLevel: "Very High" },
        { name: "Roller Coaster", type: "Coaster", coordinates: [40.9847, -111.8942], heightLimit: 46, thrillLevel: "Very High" },
        { name: "Bombora", type: "Coaster", coordinates: [40.9855, -111.8926], heightLimit: 36, thrillLevel: "Medium" },
        { name: "The Bat", type: "Coaster", coordinates: [40.9864, -111.8926], heightLimit: 42, thrillLevel: "Medium" },
        { name: "Jet Star", type: "Coaster", coordinates: [40.9867, -111.8936], heightLimit: 50, thrillLevel: "Very High" },
        { name: "Primordial", type: "Coaster", coordinates: [40.9881, -111.8927], heightLimit: 36, thrillLevel: "Very High" },
        { name: "Skycoaster", type: "X Venture", coordinates: [40.9866, -111.8944], heightLimit: 46, thrillLevel: "Extreme" },
        { name: "Catapult", type: "X Venture", coordinates: [40.9873, -111.8940], heightLimit: 46, thrillLevel: "Extreme" },
        { name: "Double Thunder Raceway", type: "X Venture", coordinates: [40.9871, -111.8954], heightLimit: 40, thrillLevel: "High" },
        { name: "Rattlesnake Rapids", type: "Water Ride", coordinates: [40.9848, -111.8890], heightLimit: 36, thrillLevel: "High" },
        { name: "The Rocket", type: "Thrill Ride", coordinates: [40.9874, -111.8936], heightLimit: 50, thrillLevel: "Extreme" },
        { name: "Odysea", type: "Family Ride", coordinates: [40.9862, -111.8931], heightLimit: null, thrillLevel: "Medium" },
        { name: "Jumping Dragon", type: "Family Ride", coordinates: [40.9858, -111.8929], heightLimit: null, thrillLevel: "Low" },
        { name: "Memorial Fountain", type: "Other", coordinates: [40.9857, -111.8938], heightLimit: null, thrillLevel: "Low" },
        { name: "Carousel", type: "Family Ride", coordinates: [40.9849, -111.8939], heightLimit: null, thrillLevel: "Low" },
        { name: "Wild Kingdom Train", type: "Steam Train", coordinates: [40.9842, -111.8939], heightLimit: null, thrillLevel: "Low" },
        { name: "Terroride", type: "Dark Ride", coordinates: [40.9854, -111.8940], heightLimit: null, thrillLevel: "Low" },
        { name: "Dracula's Castle", type: "Dark Ride", coordinates: [40.9862, -111.8946], heightLimit: null, thrillLevel: "Low" }
    ];

    // Function to add filtered attractions to the map layer, displaying each as a point on the map
    function addAttractionsToLayer(filteredAttractions) {
        // Remove any existing graphics to avoid duplication
        graphicsLayer.removeAll();
        
        // Loop over filtered attractions and add each as a point on the map
        filteredAttractions.forEach(attraction => {
            const point = {
                type: "point",
                longitude: attraction.coordinates[1],
                latitude: attraction.coordinates[0]
            };

            // Define marker appearance (red pin with white outline)
            const markerSymbol = {
                type: "simple-marker",
                color: "red",
                outline: {
                    color: "white",
                    width: 1
                }
            };

            // Create a Graphic for each attraction, with popup information about it
            const pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol,
                attributes: attraction,
                popupTemplate: {
                    title: attraction.name,
                    content: `
                        <b>Type:</b> ${attraction.type}<br>
                        <b>Height Limit:</b> ${attraction.heightLimit || "N/A"} inches<br>
                        <b>Thrill Level:</b> ${attraction.thrillLevel}
                    `
                }
            });

            // Add the graphic to the graphics layer
            graphicsLayer.add(pointGraphic);
        });
    }

    // Initially add all attractions to the map layer
    addAttractionsToLayer(attractions);

    // Add event listener to the filter dropdown to filter attractions based on selected type
    document.getElementById("typeFilter").addEventListener("change", (event) => {
        const selectedType = event.target.value;
        const filteredAttractions = selectedType === "All"
            ? attractions
            : attractions.filter(attraction => attraction.type === selectedType);

        addAttractionsToLayer(filteredAttractions);
    });

    // Add HTML for a popup box, hidden by default
    document.body.insertAdjacentHTML('beforeend', `
        <div id="popupBox" style="display: none;">
            <span class="close-btn" id="closePopupBtn">×</span>
            <div id="popupContent"></div>
        </div>
    `);

    // Function to close the custom popup box
    function closePopup() {
        document.getElementById("popupBox").style.display = "none";
    }

    // Event listener for the close button on the popup box
    document.getElementById("closePopupBtn").addEventListener("click", closePopup);

    // Add event listener to detect clicks on map view, opening a custom popup if an attraction is clicked
    view.on("click", function(event) {
        view.hitTest(event).then(function(response) {
            const graphic = response.results.find(result => result.graphic.layer === graphicsLayer);
            if (graphic) {
                // Display selected attraction's details in the custom popup box
                const { name, type, heightLimit, thrillLevel } = graphic.graphic.attributes;
                document.getElementById("popupContent").innerHTML = `
                    <h3>${name}</h3>
                    <p><b>Type:</b> ${type}</p>
                    <p><b>Height Limit:</b> ${heightLimit || "N/A"} inches</p>
                    <p><b>Thrill Level:</b> ${thrillLevel}</p>
                `;
                document.getElementById("popupBox").style.display = "block";
            }
        });
    });
});
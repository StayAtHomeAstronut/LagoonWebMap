# Overview

This map software is designed to display and interact with information about amusement park attractions at Lagoon. Built with ArcGIS and JavaScript, the software presents a dynamic map in which users can view and filter points of interest based on different attraction types, such as coasters, family rides, and adventure experiences. Each attraction is marked with a pin, and clicking on a pin reveals detailed information about the attraction, including its type, height requirements, and thrill level.

To use the GIS map, start by exploring the markers on the map, each representing an amusement park attraction. Click on a marker to open a popup that provides details like the attraction’s name, type, height requirement, and thrill level. You can filter the attractions using the dropdown menu at the top of the map; just select the type you want to view, such as "Coaster" or "Family Ride." Choose "All" in the dropdown to see every attraction again. The interactive map is designed to help users quickly find and learn about attractions in the park.

The data used in this software is sourced from Lagoon Amusement Park's public website, which includes a list of attractions and each attraction's ride information. Additionally, this program was developed by a current employee of Lagoon. Each attraction entry includes details such as the attraction's name, type of attraction, minimum height requirement, and thrill level, along with geographic coordinates of the ride station or queue point. While this dataset is currently static, it could be expanded to use a dynamic API or live data source to ensure real-time updates, providing up-to-date information about each attraction.

I wrote this program to become more familiar with web design and the development of GIS software. It is my hope to present a mock "map" webpage and app to Lagoon's Leadership Team in hopes that it will be improved upon and made public in the future.

[Lagoon Amusement Park Map](https://youtu.be/U1_ux80okbY?si=Z6l7atJ2M2n2djvy)

# Development Environment

To develop this GIS map, I used VS Code to write HTML, JavaScript, and the ArcGIS API for JavaScript. HTML provided the structure for the webpage, including the dropdown filter and the main display area for the map. JavaScript powered the interactive elements, like adding and customizing map markers, creating popups with details, and filtering attractions based on type. The ArcGIS API was essential for creating the map itself, enabling marker placement, map view control, and handling user interactions like clicks on markers to reveal detailed popups. Together, these tools made it possible to build a user-friendly map experience.

The GIS map was developed using JavaScript, which enabled user interaction and functionality to the map webpage. JavaScript was essential in this project for creating interactive features like adding map markers, handling user clicks, and filtering displayed content based on user selection. I used the ArcGIS API as the backbone of the webpage. It enabled me to create and customize the map, making it easy to display geographic information, add popups, and manage layers of data. HTML and CSS were also used in the development of the webpage.

# Useful Websites

* [arGIS tutorial](https://developers.arcgis.com/documentation/mapping-and-location-services/tutorials/)
* [W3 School Javascript Tutorial](https://www.w3schools.com/js/)
* [Lagoon Amusement Park](https://www.lagoonpark.com/)


# Future Work

* Introduce more aesthetic styling to the website including more dynamic and appealing webpage styling, custom marker icons, a custom-drawn map, and more.

* Develop and utilize an API to update users with dynamic information such as opening and closing times, ride status, and wait times.

* Finish adding ride attractions to the map, and enable support for additional non-ride attractions such as shops, shows, bathrooms, and other points of interest.

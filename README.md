# Habitapp

# Link to page https://goldironhack.github.io/2017-Purdue-UNAL-IronHack-jonatan360/

### Keywords
Safety, market, budget, recreation, transportation, map, rent, calculate distance, park, police station, libraries.


### Description of the datasets and function design
 * [Climate Data Online](https://www.ncdc.noaa.gov/cdo-web) [data type]  [data columns used] [data amount] basic information
 * [Parks - Chicago Park District Buildings](https://catalog.data.gov/dataset/parks-chicago-park-district-buildings) [Map, X_COORD, Y_COORD, ADDRESS][740] Inventory of buildings located on Chicago Park District premises as of November 4, 2016.
 * [Chicago Public Schools - School Locations SY1617](https://catalog.data.gov/dataset/chicago-public-schools-school-locations-sy1617) [Short_Name, Lat, Long, Address, Grades, Phone Number][670] Locations of educational units in the Chicago Public School District for school year 2016-2017.
 * [Fire Stations](https://catalog.data.gov/dataset/fire-stations-61d88) [NAME, LOCATION, ADDRESS] [92] Fire station locations
 * [Farmers Markets - 2015](https://catalog.data.gov/dataset/farmers-markets-2015) [LATITUDE, LONGITUDE, LOCATION, WEB SITE, INTERSECTION, DAY, START DAY, END DAY ] [47] Chicago's Farmers Markets bring more than 70 vendors selling fresh fruits, vegetables, plants and flowers to neighborhoods throughout the City of Chicago. Markets are held Tuesday, Wednesday, Thursday, Saturday and Sunday around the city.
 * [Libraries - Locations, Hours and Contact Information](https://catalog.data.gov/dataset/libraries-locations-hours-and-contact-information-f3c61) [NAME, LOCATION, SCHEDULE,  PHONE NUMBER, WEB SITE] [80]Chicago Public Library locations, contact information, and hours of operation.
 * [Police Stations](https://catalog.data.gov/dataset/police-stations-3a3a8) [ADDRESS, LATITUDE, LONGITUDE, ADDRESS, PHONE NUMBER, WEB SITE, NAME DISTRICT, NUMBER DISTRICT] [23] Chicago Police district station locations and contact information.
 * [Affordable Rental Housing Developments](https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2) [Latitude, Longitude, address, units, community area, property type, property name, phone number, management company] [263] The affordable rental housing developments listed below are supported by the City of Chicago to maintain affordability 
 standards.
 * [Nearby Cook County Grocery Store Chains](https://catalog.data.gov/dataset/nearby-cook-county-grocery-store-chains-cc102) [ADDRESS, LATITUDE, LONGITUDE, STORE TYPE, COMPANY] A list of grocery stores which are part of a multi-store chain and are located at or within 1 mile of Chicago's city limits. 	
 * [Nearby Independent Cook County Grocery Stores](https://catalog.data.gov/dataset/nearby-independent-cook-county-grocery-stores-180c9)[ADDRESS, LATITUDE, LONGITUDE, SIZE, NAME] A list of independently owned- and operated grocery stores which are located at or within 1 mile of Chicago's city limits. 
 * [Crimes - 2001 to present](https://catalog.data.gov/dataset/crimes-2001-to-present-398a4)[Address, Latitude, Longitude, District][1000] This dataset reflects reported incidents of crime (with the exception of murders where data exists for each victim) that occurred in the City of Chicago from 2001 to present, minus the most recent seven days.
 * [Y] Do you use the primary dataset ”online climate data” from data.gov? 
 * [Y] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

### Brief Description
	The moment a student seeks a safe and affordable place to rent in Chicago, Habitapp appears to give you information about the best places you could find according to your tastes and priorities. This search is based on your convenience, as a mode of transport and favorite places.

### Structued description:
 * Map View:
	1. [Y] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
	2. [Y] Markers for location of markets
	3. [Y] Labels for markets' names
	4. [Y] InfoWindow to show detail information of a market
	5. [N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)

 * Data Visualization:
	1. [Y] [Show crimes in the last year] Pie
	2. [Y] [Click in name for delete o add, change color]
	
 * Interaction Form:
	1. [Y] [HTML]
	2. [Y] [Search distance, select property type] 
	3. [Y] [List] Any information input? List them. (comments, markers, user preference ...)
	4. [N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
	5. [Y] [Heat map]

### Build Case
Works with html, css and JS

### Test Case
Tested in Chrome and Opera

### Additional information 
The weather data does not load due to the http protocol, you must activate the option "insecure content" in the browser to see them

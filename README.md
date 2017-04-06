# Habitapp

### Keywords
Safety, market, budget, recreation, transportation, map, rent, calculate distance, park, police station, libraries.


### Description of the datasets and function design
 * [Climate Data Online](https://www.ncdc.noaa.gov/cdo-web) [data type]  [data columns used] [data amount] basic information
 * [Parks - Chicago Park District Buildings](https://catalog.data.gov/dataset/parks-chicago-park-district-buildings) [Map, X_COORD, Y_COORD][740] Inventory of buildings located on Chicago Park District premises as of November 4, 2016.
 * [Chicago Public Schools - School Locations SY1617](https://catalog.data.gov/dataset/chicago-public-schools-school-locations-sy1617) [Short_Name, Lat, Long][670] Locations of educational units in the Chicago Public School District for school year 2016-2017.
 * [Fire Stations](https://catalog.data.gov/dataset/fire-stations-61d88) [NAME, LOCATION] [92] Fire station locations
 * [Farmers Markets - 2015](https://catalog.data.gov/dataset/farmers-markets-2015) [LATITUDE, LONGITUDE, LOCATION ] [47] Chicago's Farmers Markets bring more than 70 vendors selling fresh fruits, vegetables, plants and flowers to neighborhoods throughout the City of Chicago. Markets are held Tuesday, Wednesday, Thursday, Saturday and Sunday around the city.
 * [Libraries - Locations, Hours and Contact Information](https://catalog.data.gov/dataset/libraries-locations-hours-and-contact-information-f3c61)
 * [Police Stations](https://catalog.data.gov/dataset/police-stations-3a3a8)
 * [Affordable Rental Housing Developments](https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2)
 * [Y] Do you use the primary dataset ”online climate data” from data.gov? 
 * [Y] [List] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?

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
	1. [Y] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
	2. [Y] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)
	
 * Interaction Form:
	1. [Y] [plain HTML] Any information output? list them. (text field, text area, label, plain HTML ...)
	2. [Y] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
	3. [Y] [List] Any information input? List them. (comments, markers, user preference ...)
	4. [Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
	5. [Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)

### Build Case
Works with html, css and JS

### Test Case
Tested in Chrome, Opera and Firefox

### Additional information 
E.g. any problems you faced/fixed, where you reached out to for help, etc.

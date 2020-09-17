# Automated Greenhouse

Dashboard for an automated indoor greenhouse with Photon Particle IoT   

The Photon microcontroller gets the value from the multiple sensors and decide if our plant is at low level of soil humidity or not. If humidity is low it will start the water pump for a couple of seconds depending on the soil humidity level.   
It will gather the ambient humidity, atmospheric pressure and temperature, likewise the plant soil humidity, uv and water tank levels.


### TODO:
- [x] Get ambient values: pressure, humidity and temperature
- [x] Turn on water pump when soil humidity level is low  
- [x] Get into stand by mode for a low power mode, turn on after 2 mins  
- [x] Send the sensor's values to the cloud for them to be plot 
- [ ] Water level sensor
- [ ] UV level sensor
- [ ] Send time at which the water pump turns on
- [ ] Send the exact levels from humidity and temperature sensors at turning the water pump on  
- [ ] Stop the standby from the web
- [ ] Turn the water pump from the web 
- [ ] Send and email if water level is low

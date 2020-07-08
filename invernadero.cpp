#include <Adafruit_BME280.h>
#define ALTITUDE 512.0 

Adafruit_BME280 bme;

int motor = A1;
int sensor = A0;
int sensor_read;
int humedad;
int led = D7;
int TEMPERATURA;
int PRESION;
int HUMEDAD_1;
int water_delay;

//ARREGLOS NUEVOS
int temp[24];
String tempes = "";
int arreglo[5] = {0, 1, 2, 3, 4}; 
String arr = "";
void setup() 
{
    bme.begin(0x76);
    pinMode(motor, OUTPUT);
    pinMode(led, OUTPUT);
    Particle.variable("Temperatura", &TEMPERATURA, INT);
    Particle.variable("Presion", &PRESION, INT);
    Particle.variable("Humedad", &HUMEDAD_1, INT);
    Particle.variable("Planta", &humedad, INT);
    Particle.variable("Temperaturas", &arr, STRING);
}

void loop()
{
    sensor_ambiente();
    water_on();
    Particle.publish("Entering Sleep in 5s");
    delay(5000);
    //System.sleep(D4,RISING,120);
}

void sensor_ambiente() //sensor ambiente
{
    delay(3000);
    sensor_read = analogRead(sensor);
    humedad = map(sensor_read, 4091, 2000, 0, 100);
    Particle.publish("Humidity", String(humedad) + "%");
    TEMPERATURA = bme.readTemperature();
    temp_grafica(TEMPERATURA);
    //mandar_graf();
    mandar_arreglo();
    Particle.publish("Arreglo", String(tempes));
    PRESION = bme.readPressure()/100;
    HUMEDAD_1 = bme.readHumidity();
    delay(3000);
}

void water_on()
{
    digitalWrite(led, HIGH);
    if ((humedad >= 0) && (humedad < 29))
    {
        water_delay = 3000;
        water_pump(water_delay);
    }
    else if ((humedad > 40) && (humedad < 60))
    {
        water_delay = 2000;
        water_pump(water_delay);
    }
    else if ((humedad > 70) && (humedad < 90))
    {
        water_delay = 900;
        water_pump(water_delay);
    }
    else
    {
        Particle.publish("Everything's fine");
    }
    digitalWrite(led, LOW);
    delay(5000);
}

void water_pump(int water_delay)
{
    Particle.publish("Water On");
    digitalWrite(motor, HIGH);
    delay(water_delay);
    digitalWrite(motor, LOW);
    Particle.publish("Water Off");
}

void temp_grafica(int temperatura)
{
    temp[23] = temperatura;
    for (int i = 0; i < 24; i++)
    {
        for (int j = 1; j < 24; j++)
        {
            temp[i] = temp[j]; 
        }
    }
}

void mandar_graf()
{
    for (int k = 23; k>=0; k--)
    {
        tempes = temp[k];
    }
}

void mandar_arreglo()
{
    for( int m = 5; m > 0; m--)
    {
        arr = arreglo[m];
    }
}

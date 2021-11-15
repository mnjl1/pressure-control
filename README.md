
# Blood Pressure Tracking Web APP.
Django REST framework (backend) and React (frontend).

## Main Idea.
Web application where every registered user can track Systolic/Diastolic blood pressure and compare it with the current weather at the moment creating a record.


## How it works.
- Register with email address.
    When registering it is important to choose correct metric system: celsius or fahrenheit.
    The next time you create a record the weather in your region will be displayed correctly.
- Messure your blood pressure and fill in a new "Systolic/Diastolic pressure" form by pressing the '+' button   on Home page.
- Every time you save your messurements the weather at your region is being fetched from openweathe api saved too! This proccess happens behind the scene.
  Then you can see and compare how your blood pressure depends on weather or atmosphere pressure.


## Distinctiveness and Complexity.
- Django-auth Registration,
- JWT Token Authorization
- Postgresql,
- Docker,
- Environment variables for production and more security (environs https://github.com/sloria/environs),
- Openweather API,
- Django deployment checklist

## Project Structure
The Blood Pressure Tracker consists of three apps.
### accounts/




## Running app:
```
docker-compose run -d --build
```
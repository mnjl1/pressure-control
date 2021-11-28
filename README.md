
# Blood Pressure Tracking Web APP
Django REST framework (backend) and React (frontend).

## Main Idea
Web application where every registered user can track Systolic/Diastolic blood pressure and compare it with the current weather at the moment creating a record.


## How it works
- Register with email address.
    When registering it is important to choose correct metric system: celsius or fahrenheit.
    The next time you create a record the weather in your region will be displayed correctly.
- Messure your blood pressure and fill in a new "Systolic/Diastolic pressure" form by pressing the '+' button   on Home page.
- Every time you save your messurements the weather at your region is being fetched from openweathe api saved too! This proccess happens behind the scene.
  Then you can see and compare how your blood pressure depends on weather or atmosphere pressure.


## Distinctiveness and Complexity.
- Django-auth Registration,
- JWT Token Authorization
- Docker,
- Environment variables for production and more security (environs https://github.com/sloria/environs),
- Openweather API,

## Project Structure
The Blood Pressure Tracker consists of three apps, config and frontend folders.

### config project folder:
Here setting.py file exists.
#### view.py
 handles JWT token authentication.

### accounts/ app:
User registration: creating user with BaseUserManager.
#### view.py
 One Class-based views for creating user


### weather/ app:
This app is responsible for fetching weather data from openweather api.
When user saves his pressure data, the weather from where the user lives is saved too (OneToOne database relationship)
#### utils.py
 Two helper methods. One method fetchs weather data from openweather api and the second processes that data.
 Key moment: on frontend part current user IP and city are being detected and trunsfered with request to backend. Knowing the city we can fetch the weather info with the correct metric system (celsious or fahrenheit are defined with registration).

### pressure/ app:
Handles the main functionality. Saving systolic/diastolic pressure for logged in user. The weather is saved accordingly.
#### utils.py
 helper methods calculating average systolic/diastolic pressure
#### views.py
  - getPressureList displaying all the records from database by logged in user. Calculated average pressure is transfered too.
  - getPressure fetchs specific data by user id
  - create_pressure creates new pressure record with fetched weather info
  - update_pressure for editing pressure data fetched by user id
  - delete_pressure deletes pressure record by user id



### frontend/ folder:
Here React part exists.

If user is not logged in, the loging page is displayed, inviting the user to register right away.
Register page offers to enter email/password to register.
When logged in, the user is redirected to home page where all the pressure data list is displayed.
Each pressure info is split on two parts. Left part is pressure data and the left part is the weather info at the moment when the pressure data was saved.
Above the pressure data list the additional info is displayed: whole number of records, average systolic/diastolic pressure.
Clicking any pressure record moves user on the edit page where the record can be edited or deleted.
To create new record the "+" button hovers on the home page at right bottom corner.

## Running app
```
docker-compose run -d --build
```
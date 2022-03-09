
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


# Distinctiveness and Complexity:

## Technologies
- Drango Rest Framework
- React.js
- Django-auth Registration,
- JWT Token Authorization
- Docker
- Environment variables for production and more security (environs https://github.com/sloria/environs),
- Openweather API,

## Project Structure
The Blood Pressure Tracker consists of three apps, config and frontend folders.

### config project folder:
Here setting.py file exists.
#### view.py
 Handles JWT token authentication.

### accounts/ app:
Responsible for user registration
### models.py
 CustomUser class extends BaseUserManager for possibility to register with email as a login.
 CustomAccountManager class is responsible for creating user and superuser
 ### serializers.py
 CustomUserSerializer class. Here I implemented .create() method to save aditional fiels of CustomUser: email and metric system of weather representation.

#### view.py
 One Class-based view for creating custom user.
 BlacklistTokenUpdateView class cheks if refreshed JWT token is in black list.

### weather/ app:
This app is responsible for fetching weather data from openweather api.
When user saves his pressure data, the weather from where the user lives is saved too (OneToOne database relationship)
### models.py
 Weather class holds basic fields for saving weather info in database
### serializers.py
 WeatherSerializer class responsible for serializing all Weather class fields.
#### utils.py
 Two helper methods. One method fetchs weather data from openweather api and the second processes that data.
 Key moment: on frontend part current user IP and city are being detected and trunsfered with request to backend. Knowing the city we can fetch the weather info with the correct metric system (celsious or fahrenheit are defined with registration).

### pressure/ app:
Handles the main functionality. Saving systolic/diastolic pressure for logged in user. The weather is saved accordingly.
### models.py
 BloodPressure class holds hold fiels which reflect Systolic/Diastolic pressure. It has ForeignKey relationship with registered CustomUser and OneToOne relationship with Weather class.
### serializers.py
 BloodPressureSerializer class serializes Pressure class and Weather class.
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

### AuthContext.js
 Here I create AuthProvider to handle user registration, login/logout, refreshing jwt token. And pass  needed function via contextData
### LoginPage.js
  Loging User form
### RegisterPage.js
  Register User form
### PressureListPage.js
 Displays all the user records.
### PressurePage.js
  Displays single pressure by id. Here user can edit or delete record.

## Running app
```
docker-compose up -d --build
```

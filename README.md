# Train&Track Project  
> **Tech Stack**: MongoDB, Express.js, Angular, Node.js  (MEAN Stack)

> **Backend branch**: `dev/backend`

A comprehensive fitness tracking web application that allows users to register and monitor their daily activities, meals, water intake, and body measurements — all in one place. Designed for individuals seeking a centralized solution to manage their health and wellness journey.

### Includes:
- **AI-generated** caloric targets, meal plans, meal entries, and activity entries
- **Email & SMS notifications** for verification and password reset possibilities
- **Secure authentication** using industry standards (JWT, HttpOnly cookies, refresh tokens)

---

## 1. REST API Endpoints:

### 1.1 Authentication & Authorization

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in an existing user |
| POST | `/auth/password/forgot` | Send email or SMS with password reset link |
| POST | `/auth/password/reset-code/validate` | Validate password reset code |
| PUT | `/auth/password/reset` | Resets password based on validated code |
| PUT | `/auth/password/change` | Changes password for the current authenticated user |
| POST | `/auth/token/refresh` | Generates new access- and refresh tokens |
| POST | `/auth/logout` | Log out user by removing refresh token from httponly cookie |

---

### 1.2 User Management (for the current authenticated user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Retrieve the profile details|
| PATCH | `/users/me` | Update the profile details|
| DELETE | `/users/me` | Delete user |
| POST | `/users/me/profile-picture` |Change  profile picture |
| DELETE | `/users/me/profile-picture` | Deletes profile picture |

---

### 1.3 Measurement (for the current authenticated user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/measurements` | Create a new measurement |
| GET | `/users/me/measurements?from=YYYY-MM-DD&until=YYYY-MM-DD` | Retrieve all measurements |
| PATCH | `/users/me/measurements/:measurementId` | Update a measurement |
| DELETE | `/users/me/measurements/:measurementId` | Delete a measurement |

---

### 1.4 Meal Plan  (for the current authenticated user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/meal-plans` | Create a new meal plan |
| GET | `/users/me/meal-plans` | Retrieve all meal plan previews |
| GET | `/users/me/meal-plans/:mealPlanId` | Retrieve meal plan based on its id |
| DELETE | `/users/me/meal-plans/:mealPlanId` | Delete meal plan based on its id |

---

### 1.5 Caloric Target (for the current authenticated user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/caloric-targets` | Create a new caloric target |
| GET | `/users/me/caloric-targets` | Retrieve all caloric targets |
| DELETE | `/users/me/caloric-targets/:caloricTargetId` | Delete caloric target (not current one) |

---

### 1.6 Activity Entry (for the current authenticated user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/entries/:date/activities` | Create a new activity entry |
| GET | `/users/me/entries/:date/activities` | Retrieve all activity entries for the provided date |
| PATCH | `/users/me/entries/:date/activities/:activityEntryId` | Update activity entry |
| DELETE | `/users/me/entries/:date/activities/:activityEntryId` | Delete activity entry |

---

### 1.7 Meal Entry (for the current authenticated user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/entries/:date/meals` | Create a new meal entry|
| GET | `/users/me/entries/:date/meals` | Retrieve all meal entries for the provided date |
| PATCH | `/users/me/entries/:date/meals/:mealEntryId` | Update a meal entry |
| DELETE | `/users/me/entries/:date/meals/:mealEntryId` | Delete a meal entry |

---

### 1.8 Water intake (for the current authenticated user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me/entries/:date/water-intake` | Retrieve water intake |
| POST | `/users/me/entries/:date/water-intake` | Add water intake entry |
| DELETE | `/users/me/entries/:date/water-intake/:entryId` | Delete a water intake entry |

---

### 1.9 Daily Entry (all of above) (for the current authenticated user)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me/entries/:date` | Retrieve water intake, activity- and meal entries for the provided date |

---

## 2. Backend

### 2.1. Modular Architecture with Separation of Concerns:
- **controllers/** – HTTP request logic
- **services/** – Business logic
- **repositories/** – Database queries
- **models/** – Mongoose schemas
- **validators/** – Input validation

## 2.2. Comprehensive Middleware Layer:
- **Authentication** (jwt.js)
- **File handling** (multer.js)
- **Error handling** (errorHandle.js, notFound.js)
- **Logging and success handling** (request.js, successHandle.js)

## 2.3. Centralized Utilities and Logging:
- **utils/ provides shared helpers** (e.g., bcrypt, jwt, sendEmail, sendSMS)
- **loggers/ inside utils/** (e.g., request.js, app.js) handles structured logging, likely via Winston or similar
- **Logging is integrated with morgan middleware to track requests and performance**

## 2.4. Folder Structure:

```bash
.
|-- .env
|-- .env.example
|-- .gitignore
|-- files
|   `-- uploads
|       `-- images
|           `-- users
|-- package-lock.json
|-- package.json
|-- public
|   `-- frontend
|       `-- index.html
`-- src
    |-- app.js
    |-- config
    |   |-- constants.js
    |   |-- db.js
    |   |-- dbDefaults.js
    |   `-- env.js
    |-- controllers
    |   |-- activityEntry.js
    |   |-- auth.js
    |   |-- caloricTarget.js
    |   |-- entry.js
    |   |-- mealEntry.js
    |   |-- mealPlan.js
    |   |-- measurement.js
    |   |-- user.js
    |   `-- waterIntake.js
    |-- dtos
    |   |-- activityEntry.js
    |   |-- caloricTarget.js
    |   |-- entry.js
    |   |-- mealEntry.js
    |   |-- mealPlan.js
    |   |-- measurement.js
    |   |-- trackDay.js
    |   |-- user.js
    |   `-- waterIntake.js
    |-- enums
    |   |-- activityLevelValues.js
    |   |-- activityLevels.js
    |   |-- credentialTypes.js
    |   |-- dietaryPreferences.js
    |   |-- dietaryRestrictions.js
    |   |-- genders.js
    |   |-- goalAdjustments.js
    |   |-- goalSpeed.js
    |   |-- jwtTypes.js
    |   |-- mealPlanTypes.js
    |   |-- mealTypes.js
    |   |-- mealsPerDay.js
    |   |-- physicalGoals.js
    |   |-- resetPasswordStatuses.js
    |   |-- userRoles.js
    |   `-- visbility.js
    |-- errors
    |   |-- BadRequest.js
    |   |-- Conflict.js
    |   |-- Forbidden.js
    |   |-- InternalServer.js
    |   |-- NotFound.js
    |   |-- Unauthorized.js
    |   `-- UnprocessableEntity.js
    |-- middleware
    |   |-- errorHandle.js
    |   |-- jwt.js
    |   |-- multer.js
    |   |-- notFound.js
    |   |-- request.js
    |   `-- successHandle.js
    |-- models
    |   |-- ActivityEntry.js
    |   |-- CaloricTarget.js
    |   |-- MealEntry.js
    |   |-- MealPlan.js
    |   |-- Measurement.js
    |   |-- PasswordReset.js
    |   |-- User.js
    |   `-- WaterIntake.js
    |-- repositories
    |   |-- activityEntry.js
    |   |-- caloricTarget.js
    |   |-- mealEntry.js
    |   |-- mealPlan.js
    |   |-- measurement.js
    |   |-- passwordReset.js
    |   |-- user.js
    |   `-- waterIntake.js
    |-- routes
    |   |-- auth.js
    |   |-- caloricTarget.js
    |   |-- entry.js
    |   |-- index.js
    |   |-- mealPlan.js
    |   |-- measurement.js
    |   `-- user.js
    |-- server.js
    |-- services
    |   |-- activityEntry.js
    |   |-- auth.js
    |   |-- caloricTarget.js
    |   |-- email.js
    |   |-- entry.js
    |   |-- mealEntry.js
    |   |-- mealPlan.js
    |   |-- measurement.js
    |   |-- openAi.js
    |   |-- sms.js
    |   |-- user.js
    |   `-- waterIntake.js
    |-- templates
    |   `-- resetPasswordEmailTemplate.js
    |-- utils
    |   |-- auth
    |   |   |-- bcrypt.js
    |   |   `-- jwt.js
    |   |-- classes
    |   |   `-- SuccessResponse.js
    |   |-- functions
    |   |   |-- catchAsync.js
    |   |   |-- createDirIfNotexists.js
    |   |   |-- detectCredentialType.js
    |   |   |-- generateRandomString.js
    |   |   |-- getDailyFolder.js
    |   |   |-- isDateExpired.js
    |   |   |-- openAi.js
    |   |   |-- sendEmail.js
    |   |   `-- sendSMS.js
    |   |-- loggers
    |   |   |-- app.js
    |   |   `-- request.js
    |   `-- scripts
    |       `-- listRoutes.js
    `-- validators
        |-- activityEntry.js
        |-- auth.js
        |-- caloricTarget.js
        |-- entry.js
        |-- mealEntry.js
        |-- mealPlan.js
        |-- measurement.js
        |-- objectId.js
        |-- user.js
        `-- waterIntake.js

```
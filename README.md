# Train&Track Project  
> **Tech Stack**: MongoDB, Express.js, Angular, Node.js  

> **Backend branch**: `dev/backend`

A fitness tracking web application allowing users to register, track their activities, meals, water intake, and body measurements. Designed for clients, trainers, and admins.

### Includes:
- **AI-generated** caloric targets, meal plans, meal entries, and activity entries
- **Email & SMS notifications** for verification and password reset possibilities
- **Secure authentication** using industry standards (JWT, HttpOnly cookies, refresh tokens)

---

## Authentication & Authorization

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/password/forgot` | Send reset password email or SMS |
| POST | `/auth/password/reset-code/validate` | Verify reset code |
| PUT | `/auth/password/reset` | Reset password using token |
| PUT | `/auth/password/change` | Change password while logged in |
| POST | `/auth/token/refresh` | Refresh JWT tokens |
| POST | `/auth/logout` | Logout user |

---

## User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Get current user via JWT |
| PATCH | `/users/me` | Update current user |
| DELETE | `/users/me` | Delete current user |
| POST | `/users/me/profile-picture` | Upload/change profile picture |
| DELETE | `/users/me/profile-picture` | Delete profile picture |

---

## Track Days

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me/track-days` | Get all track days for user |
| GET | `/users/me/track-days/:date` | Get (or create) a track day by date |
| PUT | `/users/me/track-days/:date/water-target` | Set water target (auto-create track day) |
| PATCH | `/users/me/track-days/:date/water-target` | Add water target (auto-create track day) |

---

## Activity Entries

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/track-days/:date/activities` | Add activity entry |
| GET | `/users/me/track-days/:date/activities` | Retrieve activity entries |
| PATCH | `/users/me/track-days/:date/activities/:activityEntryId` | Update activity entry |
| DELETE | `/users/me/track-days/:date/activities/:activityEntryId` | Delete activity entry |

---

## Meal Entries

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me/track-days/:trackDayId/meal-entries` | Retrieve meal entries |
| POST | `/users/me/track-days/:trackDayId/meal-entries` | Create a meal entry |
| PATCH | `/users/me/track-days/:trackDayId/meal-entries/:mealEntryId` | Update a meal entry |
| DELETE | `/users/me/track-days/:trackDayId/meal-entries/:mealEntryId` | Delete a meal entry |

---

## Meal Plan  

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/meal-plans` | Create meal plan |
| GET | `/users/me/meal-plans` | Retrieve meal plans |
| GET | `/users/me/meal-plans/:mealPlanId` | Retrieve meal plan |
| DELETE | `/users/me/meal-plans/:mealPlanId` | Delete meal plan |

---

## Measurements

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/measurements` | Add a new measurement entry |
| GET | `/users/me/measurements?from=YYYY-MM-DD&until=YYYY-MM-DD` | Retrieve measurements in range |
| PATCH | `/users/me/measurements/:measurementId` | Update a measurement |
| DELETE | `/users/me/measurements/:measurementId` | Delete a measurement |

---

## Caloric Targets

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/caloric-targets` | Create a new caloric target |
| GET | `/users/me/caloric-targets` | Retrieve caloric targets for user |
| DELETE | `/users/me/caloric-targets/:caloricTargetId` | Delete a caloric target (not current) |

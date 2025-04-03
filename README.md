# Train&Track Project  
> **Tech Stack**: MongoDB, Express.js, Angular, Node.js  

> **Backend branch**: `dev/backend`

A fitness tracking web application allowing users to register, track their activities, meals, water intake, and body measurements. Designed for clients, trainers, and admins.

### ✅ Includes:
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
| POST | `/auth/password/reset` | Reset password using token |
| POST | `/auth/password/reset-code/verify` | Verify reset code |
| PUT | `/auth/password/change` | Change password while logged in |
| POST | `/auth/token/refresh` | Refresh JWT tokens |
| DELETE | `/auth/logout` | Logout user |

---

## Activity

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/activities` | Create activity (public or private) |
| GET | `/users/me/activities` | Get all activities (private & public for current user) |
| PATCH | `/users/me/activities/:activityId` | Update user activity (not visibility) |
| DELETE | `/users/me/activities/:activityId` | Delete **private** activity |

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

## Meal Entries

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me/track-days/:trackDayId/meal-entries` | List meal entries |
| POST | `/users/me/track-days/:trackDayId/meal-entries` | Add a meal entry |
| PATCH | `/users/me/track-days/:trackDayId/meal-entries/:mealEntryId` | Update a meal entry |
| DELETE | `/users/me/track-days/:trackDayId/meal-entries/:mealEntryId` | Delete a meal entry |

---

## Meal Plan  
*Reuses Meal Entries endpoints*

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me/track-days/:trackDayId/meal-entries` | Get meal plan entries |
| POST | `/users/me/track-days/:trackDayId/meal-entries` | Create meal plan entry |
| DELETE | `/users/me/track-days/:trackDayId/meal-entries/:mealEntryId` | Delete meal plan entry |

---

## Activity Entries

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me/track-days/:date/activities` | List activity entries |
| POST | `/users/me/track-days/:date/activities` | Add activity entry |
| PATCH | `/users/me/track-days/:date/activities/:activityEntryId` | Update activity entry |
| DELETE | `/users/me/track-days/:date/activity-entries/:activityEntryId` | Delete activity entry |

---

## Measurements

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/me/measurements` | Add a new measurement entry |
| GET | `/users/me/measurements?from=YYYY-MM-DD&until=YYYY-MM-DD` | List measurements in range |
| PATCH | `/users/me/measurements/:measurementId` | Update a measurement |
| DELETE | `/users/me/measurements/:measurementId` | Delete a measurement |

---

## Caloric Targets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me/caloric-targets` | List caloric targets for user |
| POST | `/users/me/caloric-targets` | Create a new caloric target |
| DELETE | `/users/me/caloric-targets/:caloricTargetId` | Delete a caloric target (not current) |

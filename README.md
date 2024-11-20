# Star Wars Starships Web Application 🚀🌌

A modern React-based web application that brings the starships of the Star Wars universe to life! Built using SWAPI (Star Wars API).

## ✨ Features

- Infinite scroll
- User authentication with Firebase
- Comprehensive starships listing
- Detailed starship information
- Pilot and movie appearance details

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/gogamar/star-wars-starships.git
cd star-wars-starships
```

### 2. Add .env

Add `.env` to the root of the project

```bash
touch .env
```

and fill in the values:

```
VITE_SWAPI_1=
VITE_SWAPI_2=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### 5. Run Storybook

```bash
npm run storybook
```

Open your browser and navigate to `http://localhost:6006`

### 6. Run Tests

```bash
npm run test
```

## 🎯 Project Milestones

### Exercise 1: Starships Listing

- Implement main screen with starships list
- Display starship name and model
- Use Storybook for component development

### Exercise 2: Starship Details

- Create detailed view for individual starships
- Enable navigation from list to detailed information

### Exercise 3: Infinite Scroll

- Implement seamless loading of additional starships

### Exercise 4: Star Wars Style

- Redesign UI to match official Star Wars website aesthetic

### Exercise 5: Navigation

- Add welcome page
- Implement React Router
- Create responsive top navigation bar

### Exercise 6: Authentication

- Integrate Firebase for login and registration
- Prevent duplicate email registrations
- Implement intelligent redirect after login

### Exercise 7: Route Protection

- Secure starships list route
- Redirect unauthenticated users to login page

### Exercise 8: Pilot Information

- Enhance starship details with pilot cards
- Create comprehensive pilot information component

### Exercise 9: Movie Appearances

- Display movie cards featuring each starship

### Exercise 10: Testing

- Develop unit tests for 3 components
- Ensure application reliability and maintainability

## 🌐 API Resources

### SWAPI Endpoints

- Starships List: [SWAPI Starships]
  https://swapi.dev/api/starships/
  https://swapi.py4e.com/api/starships/

### Image Resources

- Star Wars Visual Guide: [Starship Images](https://starwars-visualguide.com/)

## 🧰 State Management

- **Redux:** Centralized state management for consistent data flow

**May the Force be with your code! 🌟**

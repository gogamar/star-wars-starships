# Star Wars Starships Web Application

A React-based web app that displays information about Star Wars starships using data from the SWAPI (Star Wars API). This app includes features like listing starships, viewing detailed information, pagination, and user authentication.

### Installation Instructions

1. **Clone the repository:**

   ```bash
   git clone git@github.com:gogamar/star-wars.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd star-wars
   ```

3. **Install the required dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open the app in your browser:**
   Visit `http://localhost:5173` to view the app.

---

### Exercises Overview

#### **Exercise 1: Display Starships List**

- Implement the main screen to display a list of starships.
- Show the name and model of each starship.
- Use **Storybook** to create reusable components.

#### **Exercise 2: Starship Details**

- Create a detailed view for each starship.
- Users can click on a starship from the list to view more details.

#### **Exercise 3: "View More" Button**

- Implement infinite scroll to load more starships from the server.

#### **Exercise 4: Modernize the Site**

- Update the site's styles to resemble the official Star Wars website.
- Focus on UI/UX improvements.

#### **Exercise 5: Welcome Page and Navigation**

- Add a welcome page with a button to navigate to the main starships list.
- Implement React Routing for navigation.
- Create a top navigation bar with links.

#### **Exercise 6: User Authentication (Login & Registration)**

- Implement a login and registration page using a fake backend API ([ReqRes](https://reqres.in/)).
- Ensure users can't register with the same email.
- Redirect users to the correct page after login.

#### **Exercise 7: Protect Routes**

- Protect the starships list route so only authenticated users can access it.
- Redirect unauthenticated users to the login page.

#### **Exercise 8: Show Pilots**

- Enhance the starship details page to show pilot cards.
- Create a new component to display pilot information for each starship.

#### **Exercise 9: Show Movie Appearances**

- Display the movie cards where the starship has appeared.

#### **Exercise 10: Unit Tests**

- Add unit tests for at least three components.
- Ensure the app is robust and easy to maintain.

---

### API Information

This project uses the SWAPI (Star Wars API) to fetch starships data. The following endpoints are useful:

- **Starships list:**
  [SWAPI Starships List](https://swapi.dev/api/starships/)

- **Starships list with pagination:**
  [SWAPI Pagination](https://swapi.dev/api/starships/?page=1)

- **Star Wars Visual Guide (for images):**
  [Star Wars Visual Guide](https://starwars-visualguide.com/)

---

### Notes

- **Redux:** Redux is used for state management. [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

Dynamic Website with APIs – Vanilla JavaScript & Bootstrap

📌 Project Description

The goal of this project is to build a dynamic website using JavaScript, HTML, CSS, and Bootstrap, where information is fetched from external web services (APIs) and presented to the user.

The project demonstrates understanding of DOM nodes, event handling, fetch/Axios, persistence with LocalStorage, and data visualization.

DEMO : https://countries-vanilla-js.onrender.com/ 

https://github.com/user-attachments/assets/167eba03-233f-432f-b065-abbf57097505

🔗 APIs Used

<img width="843" height="621" alt="struktur" src="https://github.com/user-attachments/assets/0f7090e9-c1fa-4ca2-a931-720f909ae217" />

The project uses three APIs to fetch data:

REST Countries API
- Retrieves information about countries (flag, name, capital, languages, area, population).
- Data is used to build country cards and visualize statistics with Chart.js.

Unsplash API
- Fetches images related to countries.
- Images are displayed dynamically on the website.

Cities API
- Implements CRUD (Create, Read, Update, Delete) functionality for cities.

⚙️ Functionality
- Event Handling:
- Search field to filter countries.
- Carousel to display images.

- CRUD Functionality:
For Sweden, users can add, edit, and delete cities using the Cities API. Handled through HTML forms.
- Web Storage:
Users can mark countries as favorites by clicking a star icon.
Favorites are saved locally and loaded on the next visit.
- Data Visualization with Chart.js:
Compare population and area of countries in Europe.

🛠️ Technologies Used
- HTML5 & CSS3 (Flexbox-based layout, responsive design)
- Bootstrap
- JavaScript (Vanilla)
- fetch and Axios for API requests
- Event handling (addEventListener) for interactivity
- DOM manipulation to dynamically build HTML nodes
- Chart.js for data visualization
- LocalStorage for saving user preferences

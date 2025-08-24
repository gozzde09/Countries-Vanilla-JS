Dynamisk webbplats med API:er - Vanilla Javascript & Bootstrap
📌 Projektbeskrivning

Syftet med detta projekt är att bygga en dynamisk webbplats med JavaScript, HTML, CSS och Bootstrap, där information hämtas från externa webbtjänster (API:er) och presenteras för användaren.

Projektet demonstrerar förståelse för DOM-noder, eventhantering, fetch/Axios, persistens med LocalStorage och data­visualisering.

https://github.com/gozzde09/Countries-Vanilla-JS/blob/main/video.mp4

🔗 Använda API:er

Två API:er används för att hämta data:

REST Countries API

- Hämtar information om länder (flagga, namn, huvudstad, språk, yta, befolkning).
- Data används för att bygga kortkomponenter och visualisera statistik med Chart.js.

Unsplash API

- Hämtar bilder som relaterar till länder.
- Bilder visas dynamiskt på webbplatsen.

Cities API

- Implementera CRUD funktioner

⚙️ Funktionalitet

Eventhantering:
Sökfält för att filtrera länder.
Karusel för att visa bilder

CRUD-funktionalitet:
För Sverige kan användaren lägga till, redigera och ta bort städer (Cities-API). Hanteras via HTML-formulär.

Web Storage:

- Användaren kan markera länder som favoriter genom att klicka på en stjärnikon.
- Favoriter och senaste sökningar sparas lokalt och laddas in vid nästa sidbesök.

Visualisering med Chart.js:
Jämförelse av länders befolkning och yta i Europa.

🛠️ Tekniker

HTML5 & CSS3 (Flexbox-baserad layout, responsiv design).

Bootstrap

JavaScript (Vanilla):

- fetch och Axios för att hämta data.

- Eventhantering (addEventListener) för interaktivitet.

DOM-manipulation för att bygga HTML-noder dynamiskt.

Chart.js för datavisualisering.

LocalStorage för att spara användarinställningar.

📂 Struktur

Projektet är uppdelat i flera delar enligt följande:

index.html – Startsida med lista över länder, sökfunktion, statistik.

cities.html – CRUD-exempel för städer i Sverige.

style.css – Styling av kort, layouter och färgschema.

index.js – Hämtning av API-data, DOM-hantering, events.

charts.js – Visualisering med Chart.js.

cities.js - CRUD-funktionalitet kopplad till Cities API

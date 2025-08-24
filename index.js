f();
async function f() {
  const response = await axios.get(
    "https://restcountries.com/v3.1/region/europe" // 53 EUROPA LÄNDER
  );
  const countries = response.data; // Axios countries data

  //ALFABETISK ORDNING
  countries.sort((a, b) =>
    a.translations.swe.common.localeCompare(b.translations.swe.common, "sv")
  );

  //FOR-EACH FÖR ATT SKAPA CARDS OCH VISA LÄNDERNAS INFO
  countries.forEach((country) => {
    let countryName = country.translations.swe.common; //Svenska info
    const searchQuery = country.name.common; //Engelska

    const cardDiv = document.createElement("div");
    async function addImagesAndCards() {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchQuery}`,
        {
          headers: {
            Authorization:
              "Client-ID YXkvGz4I8Jzxgr9QCjb3uCZC7y4_wyYabGwGEtXUJJg",
          },
        }
      );
      // console.log(response.data);
      let images = response.data; // Axios images data
      let slidesLinks = []; // Tom array för image länkar
      images.results.forEach((image) => {
        slidesLinks.push(image.urls.regular); // Push regular images till array:en
      });
      //? RandomBild funkar inte pga limit på Unsplash. VÄLJER FÖRSTA BILD
      // // let randomIndex = Math.floor(Math.random() * slidesLinks.length);

      // SKAPA KORT med Bootstrap struktur
      cardDiv.innerHTML = `
  <div class="card country-card" style="width: 18rem;">
    <div class="card-body">
      <img class="bild" alt="Picture of ${countryName} " loading="lazy" style="width: 100%; height: 200px;" src="${
        slidesLinks[0]
      }">
      <img src="${
        country.flags.svg
      }" alt="Flag of ${countryName}" style="width: 30px; height: 20px;">
      <h5 class="card-title">${countryName}</h5>
      <button class="star-button" style="color:#343a40;">★</button>
      <p class="card-text">Landets huvudstad är ${
        country.capital
      }, och det officiella språket är ${
        Object.values(country.languages)[0]
      }.</p>
      <a class=" btn btn-outline-warning" href="login.html">Boka resa</a>
    </div>
  </div>
`;
      //KARUSELS BILDER
      const slides = document.querySelectorAll(".slides");
      slides.forEach((slides) => {
        let randomInd = Math.floor(Math.random() * slidesLinks.length);
        slides.style.backgroundImage = "url(" + slidesLinks[randomInd] + ")";
      });
      search(); //SÖK RUTAS FUNKTION
      controlFav(); // Kontollera local storage för stars och tillägga favorites
    }
    addImagesAndCards();

    // Tillägga allt i card
    // VISA RESULTAT SOM EN CARD-LIST
    const listItem = document.createElement("li");
    listItem.appendChild(cardDiv); //Kortet

    // TA <ul> FÖR RESULTAT
    const countryList = document.getElementById("countryList"); // ul
    countryList.appendChild(listItem); //Tillägga alla kort
  });

  // SEARCH
  function search() {
    const searchInput = document.querySelector(".search-input");
    const error = document.querySelector(".p404");
    const cards = document.querySelectorAll(".country-card");
    const resultsContainer = document.querySelector(".search-results");

    searchInput.value = "";

    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();
      resultsContainer.innerHTML = ""; // töm tidigare resultat
      let found = false;

      cards.forEach((card) => {
        const countryName = card
          .querySelector(".card-title")
          .textContent.toLowerCase();
        if (countryName.includes(value)) {
          const clone = card.cloneNode(true); // kopiera kortet
          resultsContainer.appendChild(card);
          found = true;
        }
      });

      if (found) {
        error.style.display = "none";
        error.textContent = "";
      } else {
        error.style.display = "block";
        error.textContent = "Inget land hittades. Försök igen!";
      }
    });
  }

  // FAVORIT STARS
  // KONTOLLERA LOCAL STORAGE och TILLÄGGA / TA BORT
  function controlFav() {
    const starButtons = document.querySelectorAll(".star-button");
    starButtons.forEach((starButton) => {
      starButton.addEventListener("click", addFavorite);
    });

    let favorites = JSON.parse(localStorage.getItem("favorites")) || []; //LOCAL-STORAGE
    starButtons.forEach((starButton) => {
      const card = starButton.closest(".card");
      const link = card.querySelector(".card-title");
      const cardTitel = link.textContent;

      //Om title finns i local storage, stjärna blir guld i början
      // for (let i = 0; i < favorites.length; i++) {
      //   if (cardTitel === favorites[i].name) {
      //     starButton.style.color = "#ffc107";
      //   }
      // }
      if (favorites.some((item) => item.name === cardTitel)) {
        starButton.style.color = "#ffc107";
      }
    });
  }
  function addFavorite() {
    const starButton = this.closest(".star-button"); // NÄRMASTE STAR SOM MAN KLICKAR
    const card = this.closest(".card"); // NÄRMASTE CARD SOM MAN KLICKAR
    const link = card.querySelector(".card-title"); // VÄLJA CARDS TITLE
    const cardTitel = link.textContent; //INNEHÅLL--COUNTRYS NAME
    // console.log(cardTitel);
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // console.log(favorites);

    if (!favorites.some((item) => item.name === cardTitel)) {
      // Landet finns ej i listan
      starButton.style.color = "#ffc107"; //Guld
      favorites.push({ name: cardTitel, status: "favourite" }); //Tillägga till array
      localStorage.setItem("favorites", JSON.stringify(favorites)); //Tillägga till storage
      //  alert("ADDED TO FAVORIT " + cardTitel);
    } else {
      starButton.style.color = "black";
      favorites = favorites.filter((item) => item.name !== cardTitel); //Ta bort från array
      localStorage.setItem("favorites", JSON.stringify(favorites)); //Ta bort från storage
      //   alert("DELETED FRÅN FAVORIT " + cardTitel);
    }
  }
  document.getElementById("countryList").addEventListener("click", (e) => {
    if (e.target.classList.contains("star-button")) {
      addFavorite.call(e.target);
    }
  });

  document.querySelector(".search-results").addEventListener("click", (e) => {
    if (e.target.classList.contains("star-button")) {
      addFavorite.call(e.target);
    }
  });
}

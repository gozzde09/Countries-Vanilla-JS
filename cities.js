f();
async function f() {
  getCities(); //HÄMTA STÄDER

  //Bilder på Sverige
  let slidesLinks = [];
  fetch(`https://api.unsplash.com/search/photos?query=sweden&per_page=100`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID YXkvGz4I8Jzxgr9QCjb3uCZC7y4_wyYabGwGEtXUJJg",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((image) => {
        slidesLinks.push(image.urls.regular);
      });
      addImages(); //Anropa images funktionen
    })
    .catch((err) => console.log(err));

  function addImages() {
    const slides = document.querySelectorAll(".slides");
    slides.forEach((slides) => {
      //SLIDE BILDER REGULAR
      let randomInd = Math.floor(Math.random() * slidesLinks.length);
      slides.style.backgroundImage = "url(" + slidesLinks[randomInd] + ")";
    });
  }

  const cityList = document.getElementById("cityList"); // TABEL
  const cityForm = document.getElementById("cityForm"); // FORM
  const saveButton = document.getElementById("save");
  const cancelButton = document.getElementById("cancel");

  //TODO GET
  function getCities() {
    fetch("https://avancera.app/cities/")
      .then((response) => response.json())
      .then((cities) => {
        cityList.innerHTML = ""; // Clean

        cities.forEach((city, index) => {
          const row = document.createElement("tr");
          row.setAttribute("data-id", `${city.id}`);
          //EN RAD
          row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${city.name}</td>
                        <td>${city.population}</td>
                        <td>
                        <button class="edit btn btn-outline-success" data-id="${
                          city.id
                        }">ÄNDRA</button>
                        <button class="delete btn btn-outline-danger" data-id="${
                          city.id
                        }">TA BORT</button>
                        </td>
                    `;
          cityList.appendChild(row);
        });

        //DELETE BUTTONS
        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const cityId = button.getAttribute("data-id");
            deleteCity(cityId); //ANROPA DELETE FUNKTIONEN
          });
        });

        // EDIT BUTTONS
        const editButtons = document.querySelectorAll(".edit");
        editButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const cityId = button.getAttribute("data-id");
            cityForm.style.display = "block"; //ÖPPNA FORM
            editCity(cityId); //ANROPA PUT FUNKTIONEN
          });
        });
      })
      .catch((error) => {
        console.error("Misslyckats GET! :  ", error);
      });
  }

  // TODO  DELETE
  function deleteCity(cityId) {
    fetch(`https://avancera.app/cities/${cityId}`, {
      method: "DELETE",
    })
      .then(() => {
        getCities(); // LADDA OM CITIES
      })
      .catch((error) => {
        console.error("Städen kunde inte raderats! ", error);
      });
  }

  // TODO PUT - EDIT
  function editCity(cityId) {
    // Välja raden via ID
    const selectedRow = document.querySelector(`tr[data-id="${cityId}"]`);
    let cells = selectedRow.getElementsByTagName("td");
    console.log(cells);
    // Hämta stadens namn och befolkning till ändring form
    let cityName = cells[1].textContent;
    let cityPop = cells[2].textContent;

    // VISA FORMULÄR MED VALT STADENS UPPGIFTER
    cityForm.style.display = "block";
    document.querySelector("#name").value = cityName;
    document.querySelector("#pop").value = cityPop;

    // AVBRYT- Dölj formulär
    cancelButton.addEventListener("click", () => {
      cityForm.style.display = "none";
    });
    //SPARA - Spara ändringar
    saveButton.addEventListener("click", () => {
      let inputName = document.querySelector("#name").value;
      let inputPop = document.querySelector("#pop").value;
      inputPop = Number(inputPop);

      fetch(`https://avancera.app/cities/${cityId}`, {
        body: JSON.stringify({
          id: cityId,
          name: inputName,
          population: inputPop,
        }),

        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      })
        .then((response) => {
          if (response.ok) {
            cityForm.style.display = "none"; // Dölj formulär
            //  document.getElementById("cityForm").reset(); //CLEAN THE FORM
            getCities(); // Uppdatera
            location.reload(); // Ladda om sidan
          } else {
            console.error("RESPONSE OK MEN EJ PUT");
          }
        })
        .catch((error) => {
          console.error("MISSLYCKATS PUT ", error);
        });
    });
  }

  // TODO POST -NY STAD
  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", () => {
    cityForm.style.display = "block";
    addCity();
  });
  function addCity() {
    // VISA TOMT FORM
    document.getElementById("cityForm").reset();
    cityForm.style.display = "block";

    //AVBRYT
    cancelButton.addEventListener("click", () => {
      cityForm.style.display = "none";
    });
    //SPARA
    saveButton.addEventListener("click", () => {
      let inputName = document.querySelector("#name").value;
      let inputPop = document.querySelector("#pop").value;
      inputPop = Number(inputPop);
      fetch(`https://avancera.app/cities/`, {
        body: JSON.stringify({
          name: inputName,
          population: inputPop,
        }),

        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            cityForm.style.display = "none"; // Dölj form
            document.getElementById("cityForm").reset(); //Tömma form
            getCities(); // Uppdatera
            location.reload(); // Ladda om sidan
          } else {
            console.error("RESPONSE OK MEN EJ POST");
            alert("Något gick fel, försök igen!");
          }
        })
        .catch((error) => {
          console.error("MISSLYCKATS ", error);
        });
    });
  }
}
f();

async function f() {
  const response = await axios.get(
    "https://restcountries.com/v3.1/region/europe" // EUROPE COUNTRIES
  );
  const countries = response.data; // Axios data
 const rainbowColors = [
   "rgba(255, 153, 153, 1)",
   "rgba(255, 178, 102, 1)",
   "rgba(255, 204, 102, 1)",
   "rgba(255, 229, 153, 1)",
   "rgba(255, 255, 153, 1)",
   "rgba(229, 255, 153, 1)",
   "rgba(204, 255, 153, 1)",
   "rgba(153, 255, 153, 1)",
   "rgba(153, 255, 204, 1)",
   "rgba(153, 255, 255, 1)",
   "rgba(153, 204, 255, 1)",
   "rgba(153, 178, 255, 1)",
   "rgba(153, 153, 255, 1)",
   "rgba(178, 153, 255, 1)",
   "rgba(204, 153, 255, 1)",
   "rgba(229, 153, 255, 1)",
   "rgba(255, 153, 255, 1)",
   "rgba(255, 153, 229, 1)",
   "rgba(255, 153, 204, 1)",
   "rgba(255, 153, 178, 1)",
   "rgba(255, 153, 153, 1)",
   "rgba(255, 178, 178, 1)",
   "rgba(255, 204, 204, 1)",
   "rgba(255, 229, 229, 1)",
   "rgba(245, 245, 220, 1)",
   "rgba(240, 240, 215, 1)",
   "rgba(235, 235, 210, 1)",
   "rgba(230, 230, 205, 1)",
   "rgba(225, 225, 200, 1)",
   "rgba(220, 220, 195, 1)",
 ];
  countries.forEach(() => {
    // ORDNA LÄNDER ENLIGT DERAS YTA
    const sortedCountriesArea = countries.sort((a, b) => b.area - a.area);
    // VÄLJA FÖRSTA 14 LÄNDER
    const largestAreaCountries = sortedCountriesArea.slice(1, 15);
    //TA BORT RUSSIA SOM ÄR SÅ STORT FÖR CHART:D

    // NAMN
    const countryNames = largestAreaCountries.map(
      (country) => country.translations.swe.common
    );
    //AREAS
    const countryAreas = largestAreaCountries.map((country) => country.area);

    //TODO CHART1 -AREAS
    const ctx1 = document.getElementById("areaChart").getContext("2d");
    new Chart(ctx1, {
      type: "polarArea",
      data: {
        labels: countryNames,
        datasets: [
          {
            label: "Yta (km²)",
            data: countryAreas,
            backgroundColor: rainbowColors,
            borderColor: "rgba(173, 216, 230, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Polar Area Chart",
          },
        },
      },
    });

    //TODO CHART2 -POPULATION
    const ctx2 = document.getElementById("popChart").getContext("2d");
    const sortedCountriesPop = countries.sort(
      (a, b) => b.population - a.population
    );
    const biggestPopCountries = sortedCountriesPop.slice(1, 15);
    // NAMN
    const countryNamesP = biggestPopCountries.map(
      (country) => country.translations.swe.common
    );

    //BEFOLKNING
    const countryPopulationP = biggestPopCountries.map(
      (country) => country.population
    );
    new Chart(ctx2, {
      type: "bar",
      data: {
        labels: countryNamesP,
        datasets: [
          {
            label: "Befolkning",
            data: countryPopulationP,
            backgroundColor: rainbowColors,
            borderColor: "rgba(173, 216, 230, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        // Elements options apply to all of the options unless overridden in a dataset
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: true,
            text: " Horizontal Bar Chart",
          },
        },
      },
    });

    //TODO CHART3 -POPULATION & AREAS
    // TA 30 COUNTRIES
    const bigCountries = sortedCountriesArea.slice(1, 31);
    //console.log(bigCountries);
    // NAMN
    const bigCountriesNames = bigCountries.map(
      (country) => country.translations.swe.common
    );
    //AREAS
    const bigCountriesAreas = bigCountries.map((country) => country.area);
    //BEFOLKNING
    const bigCountriesPopulation = bigCountries.map(
      (country) => country.population
    );
    // HA EN GENOMSNITT VÄRDE
    function normalize(data) {
      const max = Math.max(...data);
      return data.map((value) => value / max);
    }
    const normalizedPopulation = normalize(bigCountriesPopulation);
    const normalizedAreas = normalize(bigCountriesAreas);

    const ctx3 = document.getElementById("combinedChart").getContext("2d");
    new Chart(ctx3, {
      data: {
        labels: bigCountriesNames,
        datasets: [
          {
            label: "Befolkning",
            data: normalizedPopulation,
            backgroundColor: "rgba(112, 128, 144, 1)",
            borderColor: "rgba(112, 128, 144, 1)",
            borderWidth: 2,
            type: "line",
          },
          {
            label: "Area",
            data: normalizedAreas,
            backgroundColor: rainbowColors,
            borderColor: "rgba(112, 128, 144, 1)",
            borderWidth: 2,
            type: "bar",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Combined Bubble Chart",
          },
        },
      },
    });
  });
}

f();

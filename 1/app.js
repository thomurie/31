function displayData(obj) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      $("body").append(`<p>${key} : ${element}</p>`);
    }
  }
}

let numberPromise = axios.get(`http://numbersapi.com/52..62?json`);

numberPromise
  .then((data) => displayData(data.data))
  .catch((err) => console.log(err));

favNumFacts = [];

for (let i = 0; i < 4; i++) {
  favNumFacts.push(axios.get(`http://numbersapi.com/42?json`));
}

Promise.all(favNumFacts)
  .then((numFactsArr) =>
    numFactsArr.forEach((fact) => $("body").append(`<p>${fact.data.text}</p>`))
  )
  .catch((err) => console.log(err));

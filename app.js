// 1.
let drawACard = axios.get(
  `http://deckofcardsapi.com/api/deck/new/draw/?count=1`
);

drawACard
  .then((data) =>
    console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`)
  )
  .catch((err) => console.log(err));

// 2.
let newDeck = axios.get(
  `http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
);

let deckID = null;
let first = null;
let second = null;
// newDeck.then((data) => data.data.deck_id).catch((err) => console.log(err));

newDeck
  .then((data) => {
    deckID = data.data.deck_id;
    return axios.get(
      `http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    );
  })
  .then((data) => {
    first = data.data.cards[0];
    return axios.get(
      `http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    );
  })
  .then((data) => {
    second = data.data.cards[0];
    [first, second].forEach((card) =>
      console.log(`${card.value} of ${card.suit}`)
    );
  })
  .catch((err) => console.log(err));

// 3.
let threeDeckID = null;
const $btn = $(".button");
let threeDrawCard = null;
const $cardbdy = $(".card");
$btn.hide();

newDeck.then((data) => {
  threeDeckID = data.data.deck_id;
  threeDrawCard = axios.get(
    `http://deckofcardsapi.com/api/deck/${threeDeckID}/draw/?count=1`
  );
  $btn.show();
});

$btn.on("click", function () {
  threeDrawCard
    .then((data) => {
      $cardbdy.html("");
      $cardbdy.html(`<img src="${data.data.cards[0].image}" alt="Card" />`);
      threeDrawCard = axios.get(
        `http://deckofcardsapi.com/api/deck/${threeDeckID}/draw/?count=1`
      );
    })
    .catch((err) => {
      $btn.hide();
      console.log(err);
    });
});

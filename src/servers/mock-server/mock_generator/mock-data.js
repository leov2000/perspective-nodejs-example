const securitiesConfig = [
  "AAPL.N",
  "AMZN.N",
  "QQQ.N",
  "NVDA.N",
  "TSLA.N",
  "FB.N",
  "MSFT.N",
  "TLT.N",
  "XIV.N",
  "YY.N",
  "CSCO.N",
  "GOOGL.N",
  "PCLN.N",
];

const clientsConfig = [
  "JPMorgan Chase",
  "Credit Suisse",
  "MLI",
  "Goldman Sachs",
  "AMEX",
  "Santander Bank",
  "Citi",
  "Banco do Brasil",
  "Lloys Bank",
];

const pluck = (configArray) => {
  return configArray[Math.floor(Math.random() * configArray.length)];
};

const randomRows = (randomNum) => {
  return Array
    .from({ length: randomNum })
    .map(_ => (
      {
        name: pluck(securitiesConfig),
        client: pluck(clientsConfig),
        lastUpdate: new Date(),
        chg: Math.random() * 20 - 10,
        bid: Math.random() * 10 + 90,
        ask: Math.random() * 10 + 100,
        vol: Math.random() * 10 + 100,
      }
    ));
};

const generateData = () => {
  return randomRows(Math.ceil(Math.random() * 50));
};

module.exports = { generateData };

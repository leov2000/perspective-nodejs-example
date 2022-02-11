const broadCastData = (clientsArray, dataGenerator) => {
  const data = dataGenerator();

  clientsArray.forEach((client) => {
    client.send(JSON.stringify(data));
  });
};

module.exports = {
  broadCastData
};

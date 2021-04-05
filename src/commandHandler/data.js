const reqEvent = event => require(`./${event}`);

module.exports = client => {
  client.on('message', reqEvent('commandHandler'))
};
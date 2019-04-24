const PubSub = {
  publish: function(channel, payload) {
    const event = new CustomEvent(channel, { detail: payload });
    document.dispatchEvent(event);
  },
  subscribe: function(channel, callback) {
    document.addEventListener(channel, callback);
    return callback;
  }
};

module.exports = PubSub;

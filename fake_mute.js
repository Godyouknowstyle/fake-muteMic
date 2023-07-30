module.exports = class FakeMuteDeafen {
  start() {

    let React = BdApi.React;
    let Patcher = BdApi.Patcher;
    
    var text = new TextDecoder("utf-8");

    WebSocket.prototype.original = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
      if (Object.prototype.toString.call(data) === "[object ArrayBuffer]") {
        if (text.decode(data).includes("self_deaf")) {
          data = data.replace('"self_mute":false');
        }
      }
      WebSocket.prototype.original.apply(this, [data]);
    };
    BdApi.alert("Enabled", `You can now unmute or undeafen yourself and it will show for others. The plugin will be disabled by default.`);
    BdApi.Plugins.disable('FakeMute&Deafen')
  }
  stop() {}
};
 (function (window) {
  var hiSpeaker = {};
  var speakWord = "Hi";
  hiSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  }

  window.hiSpeaker = hiSpeaker;

})(window);
// var helloSpeaker = {
// 	name: "Yaakov",
// 	speakWord: "Hello"
// }

// function sayHello () {
// 	console.log(helloSpeaker.speakWord + " " + helloSpeaker.name);
// }
// sayHello();
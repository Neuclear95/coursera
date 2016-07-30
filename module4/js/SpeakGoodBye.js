  (function (window) {
  var byeSpeaker = {};
  var speakWord = "Bye";
  byeSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  }

  window.byeSpeaker = byeSpeaker;

})(window);
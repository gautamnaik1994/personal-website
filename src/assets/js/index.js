"use strict";

// fetch(
//   'https://api.stackexchange.com/2.2/users/2376317?order=desc&sort=reputation&site=stackoverflow',
// )
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });
var deferredPrompt;
window.onload = function(e) {
  var expert = document.querySelectorAll('[data-skillLevel="Expert"]');
  var intermediate = document.querySelectorAll(
    '[data-skillLevel="Intermediate"]'
  );
  var beginner = document.querySelectorAll('[data-skillLevel="Beginner"]');
  if (expert.length > 0) addSkills(expert);
  if (intermediate.length > 0) addSkills(intermediate);
  if (beginner.length > 0) addSkills(beginner);

  var years = document.querySelector("#years");
  var months = document.querySelector("#months");
  var days = document.querySelector("#days");
  var hours = document.querySelector("#hours");
  var minutes = document.querySelector("#minutes");
  var seconds = document.querySelector("#seconds");

  var res = document.querySelector("#res");
  var date = new Date(parseInt(1438778579000));
  setInterval(function() {
    var dateData = dateDiff(date.getTime());
    years.textContent = dateData.years;
    months.textContent = dateData.months;
    days.textContent = dateData.days;
    hours.textContent = dateData.hours;
    minutes.textContent = dateData.minutes;
    seconds.textContent = dateData.seconds;
  }, 1000);
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function(registration) {
        console.log("SW registered: ", registration);
      })
      .catch(function(registrationError) {
        console.log("SW registration failed: ", registrationError);
      });
  });
  window.addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault();
    deferredPrompt = e;
  });
  window.addEventListener("appinstalled", function(evt) {
    //localStorage.setItem('appInstalled', true);
  });
}

function addSkills(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    var skillNodeValue = nodes[i].attributes["data-skillLevel"].nodeValue;
    nodes[i].querySelector(".skill-level").textContent = skillNodeValue;
    //nodes[i].getElementsByClassName("skill-level")[0].innerHTML = skillNodeValue;
    //nodes[i].classList.add(skillNodeValue.toLowerCase() + '');
  }
}

function dateDiff(timestamp) {
  var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
  var r = {};
  var s = {
    years: 31536000,
    months: 2592000,
    weeks: 604800,
    days: 86400,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };

  Object.keys(s).forEach(function(key) {
    r[key] = Math.floor(d / s[key]);
    d -= r[key] * s[key];
  });

  return r;
}

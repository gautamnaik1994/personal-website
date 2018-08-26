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
window.onload = function (e) {
  let expert = document.querySelectorAll('[data-skillLevel="Expert"]');
  let intermediate = document.querySelectorAll(
    '[data-skillLevel="Intermediate"]',
  );
  let beginner = document.querySelectorAll('[data-skillLevel="Beginner"]');
  if (expert.length > 0) addSkills(expert);
  if (intermediate.length > 0) addSkills(intermediate);
  if (beginner.length > 0) addSkills(beginner);
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
  window.addEventListener('beforeinstallprompt', (e) => {
     e.preventDefault();
    deferredPrompt = e;
  });
  window.addEventListener('appinstalled', (evt) => {
    //localStorage.setItem('appInstalled', true);
  });

}

function addSkills(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    let skillNodeValue = nodes[i].attributes['data-skillLevel'].nodeValue;
    nodes[i].querySelector(".skill-level").textContent=skillNodeValue;
    //nodes[i].getElementsByClassName("skill-level")[0].innerHTML = skillNodeValue;
    //nodes[i].classList.add(skillNodeValue.toLowerCase() + '');
  }
}

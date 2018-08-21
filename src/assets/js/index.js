// fetch(
//   'https://api.stackexchange.com/2.2/users/2376317?order=desc&sort=reputation&site=stackoverflow',
// )
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });

window.onload = function(e) {
 
  let expert = document.querySelectorAll('[data-skillLevel="Expert"]');
  let intermediate = document.querySelectorAll(
    '[data-skillLevel="Intermediate"]',
  );
  let beginner = document.querySelectorAll('[data-skillLevel="Beginner"]');
  if (expert.length > 0) addSkills(expert);
  if (intermediate.length > 0) addSkills(intermediate);
  if (beginner.length > 0) addSkills(beginner);
};
function addSkills(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    let skillNodeValue = nodes[i].attributes['data-skillLevel'].nodeValue;
    nodes[i].textContent = skillNodeValue;
    //nodes[i].classList.add(skillNodeValue.toLowerCase() + '');
  }
}

function init() {
  console.log("Initing")
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
  }
}
init();
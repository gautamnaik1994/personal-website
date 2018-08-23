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
var installBtn;
window.onload = function (e) {
  init();
  //startTimer();
  let expert = document.querySelectorAll('[data-skillLevel="Expert"]');
  let intermediate = document.querySelectorAll(
    '[data-skillLevel="Intermediate"]',
  );
  let beginner = document.querySelectorAll('[data-skillLevel="Beginner"]');
  if (expert.length > 0) addSkills(expert);
  if (intermediate.length > 0) addSkills(intermediate);
  if (beginner.length > 0) addSkills(beginner);
  //installBtn = document.querySelector('#installApp');
  // installBtn.addEventListener('click', (e) => {

  //   // Show the prompt
  //   deferredPrompt.prompt();
  //   // Wait for the user to respond to the prompt
  //   deferredPrompt.userChoice
  //     .then((choiceResult) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('User accepted the A2HS prompt');
  //       } else {
  //         console.log('User dismissed the A2HS prompt');
  //       }
  //       deferredPrompt = null;
  //     });
  // });
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
    console.log("serviceWorker ")
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


    // window.addEventListener('beforeinstallprompt', (e) => {
    //   // Prevent Chrome 67 and earlier from automatically showing the prompt
    //   e.preventDefault();
    //   // Stash the event so it can be triggered later.
    //   deferredPrompt = e;
    //   deferredPrompt.prompt();
    //   deferredPrompt.userChoice
    //     .then((choiceResult) => {
    //       if (choiceResult.outcome === 'accepted') {
    //         console.log('User accepted the A2HS prompt');
    //       } else {
    //         console.log('User dismissed the A2HS prompt');
    //       }
    //       deferredPrompt = null;
    //     });
    // });

    // window.addEventListener('appinstalled', (evt) => {
    //   //localStorage.setItem('appInstalled', true);
    //  // installBtn.style.display = 'none';
    // });



  }
}






// function checkIfAppInstalled() {
//   if (localStorage.getItem('appInstalled') == null) {
//     localStorage.setItem('appInstalled', false);
//     console.log('App First time');
//     return 0;
//   } else if (localStorage.getItem('appInstalled') == true) {
//     console.log('App Installed');
//     return 1;
//   } else {
//     console.log('App Not Installed');
//     return 2;
//   }

// }

// function startTimer() {
//   console.log("insede satrt Timer");
//   if (checkIfAppInstalled == 0 || checkIfAppInstalled == 2) {
//     setTimeout(() => {
//       deferredPrompt.prompt();
//       console.log("Timer Satrted");
//       // Wait for the user to respond to the prompt
//       deferredPrompt.userChoice
//         .then((choiceResult) => {
//           if (choiceResult.outcome === 'accepted') {

//             console.log('User accepted the A2HS prompt');
//           } else {
//             console.log('User dismissed the A2HS prompt');
//           }
//           deferredPrompt = null;
//         });
//     }, 25000);
//   }
// }
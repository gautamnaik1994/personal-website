fetch(
  'https://api.stackexchange.com/2.2/users/2376317?order=desc&sort=reputation&site=stackoverflow',
)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });

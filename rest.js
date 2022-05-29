
(async () => {
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url  , {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }

} );

let commits = await response.json(); // читаем ответ в формате JSON

console.log(commits );
})()


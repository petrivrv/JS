
(async () => {
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url  , {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
//, body: ''
} );

let commits = await response. json(); // ������ ����� � ������� JSON

console.log(commits );
})()


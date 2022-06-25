

"use strict";

//returns false, since 'this' refers to global object and '!this' becomes false

function isStrictMode(y){   
    
    return this;
}
let rr=44
console.log('trtrtrrt ${rr}');
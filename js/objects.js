// This script file is just a bunch of messing around with objects, all the results are spit out to the console it does not affect the page itself

"use strict";

var person = {
    name: 'Felix',

    //this function returns Hello and this objects name property
    sayHello: function() {
        return 'Hello ' + this.name;
    }
}

console.log(person.name); //spits out name of object person
console.log(person.sayHello()); //runs sayHello function in object person
person.name = 'Dave'; //resets person's name to Dave
console.log(person.sayHello()); //runs sayHello function in object person, this time the name will be Dave

person.coolnessFactor = 100; //adds a NEW property to our object person

//adds a NEW property that is a function to our object person
person.reportCoolness = function() {
    if(this.coolnessFactor > 50) {
        return 'very cool';
    } else {
        return 'total nerd';
    }
};

console.log(person.reportCoolness()); //runs our new function in person

person.coolnessFactor = 22;
console.log(person.reportCoolness()); //does it again with our new coolnessFactor
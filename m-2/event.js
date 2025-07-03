// node: deya optional
const EventEmitter = require("node:events");

class SchoolBell extends EventEmitter {}

const mySchoolBell = new SchoolBell();

mySchoolBell.on("ring", () => {
  console.log("Yahoooooooo! Class Sesh");
});
mySchoolBell.on("ring", () => {
  console.log("Another Class");
});

mySchoolBell.on("broken", () => {
  console.log("Dhurrrr! Bell Bajena");
});

// mySchoolBell.emit("ring");
mySchoolBell.emit("ring");

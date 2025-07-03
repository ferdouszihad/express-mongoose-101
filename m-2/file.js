const fs = require("fs");

const writeMultiplication = (number) => {
  let mulText = `Multiplication Table of ${number}\n`;

  for (let i = 1; i <= 10; i++) mulText += `${number} x ${i} = ${number * i}\n`;
  mulText += `--------------\n`;

  let prevText = fs.readFileSync("./hello.txt", { encoding: "utf-8" });
  fs.writeFileSync("./hello.txt", prevText + `\n${mulText}`);

  const newData = fs.readFileSync("./hello.txt", { encoding: "utf-8" });
  console.log(newData);
};

const resetFile = (dir) => {
  fs.writeFileSync(dir, ``);
};
console.log("task-1");

fs.writeFile(
  "./hello.txt",
  "Mewooo Mewoooo",
  { encoding: "utf-8" },
  (err, data) => {
    if (err) {
      console.log("Opps! Error", err);
      return;
    }
    console.log("data written");
  }
);

const data = fs.readFile("./hello.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) {
    console.log("Opps! Error", err);
    return;
  }
  console.log(data);
});

// for (let i = 0; i < 10000; i++) console.log("Hello ", i);
console.log(data);
console.log("task 3");

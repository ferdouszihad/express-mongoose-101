const fs = require("fs");

// fs.readFile("input.txt", { encoding: "utf-8" }, (err, data) => {
//   if (err) {
//     console.log("something went wrong\n", err);
//   }
//   console.log(data);

//   fs.writeFile("./output.txt", data, { encoding: "utf-8" }, (err) => {
//     if (err) {
//       console.log("something went wrong on writting\n", err);
//     }
//     console.log("Data written successfully");
//   });
// });

const readSteram = fs.createReadStream("./input.txt", { encoding: "utf8" });
const writeSstram = fs.createWriteStream("./output.txt", { encoding: "utf8" });

readSteram.on("data", (data) => {
  console.log(data);
  writeSstram.write(data, (err) => {
    if (err) throw new Error(err);
  });
});

readSteram.on("error", (err) => {
  if (err) throw new Error(err);
});
writeSstram.on("error", (err) => {
  if (err) throw new Error(err);
});

readSteram.on("end", () => {
  console.log("reading end");
  writeSstram.end();
});

writeSstram.on("finish", () => {
  console.log("written successfully");
});

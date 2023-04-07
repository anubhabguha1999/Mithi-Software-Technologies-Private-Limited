const fs = require("fs").promises;

const readFiles = async (path) => {
  try {
    const data = await fs.readFile(path, "utf-8");
    return data;
  } catch (e) {
    console.log(e);
  }
};
const { EOL } = require("os");
let pageno1;
let pageno2;
let pageno3;
let w1 = [];
let w2 = [];
let excl;

const writeIndex = (exclude, d1, d2, d3) => {
  pageno1 = d1.split(/\r?\n?\s/);
  pageno2 = d2.split(/\r?\n?\s/);
  pageno3 = d3.split(/\r?\n?\s/);
  excl = exclude.split(/\r?\n?\s/);
  pageno1.map((ele) => {
    console.log(ele.match(/^[a-zA-Z]*$/));
    if (!w1.includes(ele) && !excl.includes(ele) && !ele.match(/\d+/g)) {
      w1.push(ele + ":  " + 1);
    }
  });
  pageno2.map((ele) => {
    if (!excl.includes(ele) && !ele.match(/\d+/g)) {
      if (!w1.includes(ele)) {
        w1.push(ele + ":  " + 2);
      }
      if (pageno1.includes(ele)) {
        let j = w1.indexOf(ele + ":  " + 2);
        w1.splice(j, 1);
        let i = w1.indexOf(ele + ":  " + 1);
        w1.splice(i, 1);
        w1.push(ele + ":  " + 1 + "," + 2);
      }
    }
  });
  pageno3.map((ele) => {
    if (!excl.includes(ele) && !ele.match(/\d+/g)) {
      if (!w1.includes(ele)) {
        w1.push(ele + ":  " + 3);
      }
      if (pageno1.includes(ele) && pageno2.includes(ele)) {
        let k = w1.indexOf(ele + ":  " + 1 + "," + 2);
        w1.splice(k, 1);
        let j = w1.indexOf(ele + ":  " + 3);
        w1.splice(j, 1);
        let i = w1.indexOf(ele + ":  " + 1);
        w1.splice(i, 1);

        w1.push(ele + ":  " + 1 + "," + 2 + "," + 3);
      } else if (pageno1.includes(ele)) {
        let j = w1.indexOf(ele + ":  " + 3);
        w1.splice(j, 1);
        let i = w1.indexOf(ele + ":  " + 1);
        w1.splice(i, 1);
        w1.push(ele + ":  " + 1 + "," + 3);
      } else if (pageno2.includes(ele)) {
        let j = w1.indexOf(ele + ":  " + 3);
        w1.splice(j, 1);
        let i = w1.indexOf(ele + ":  " + 2);
        w1.splice(i, 1);
        w1.push(ele + ":  " + 2 + "," + 3);
      }
    }
  });
  w1.map((ele) => {
    if (!w2.includes(ele)) {
      w2.push(ele);
    }
  });
  w2.sort();
  w2.map((ele) => {
    fs.appendFile("index12.txt", ele + EOL, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
};

(async function () {
  const d1 = await readFiles("Page1.txt");
  const d2 = await readFiles("Page2.txt");
  const d3 = await readFiles("Page3.txt");
  const exclude = await readFiles("exclude.txt");
  writeIndex(exclude, d1, d2, d3);
})();

/**
 * This script reads messages.xlf and creates new messages.sudo.json that contains sudo translations
 */

const fs = require("fs");
const xml2js = require("xml2js");
var sax = require("sax");

const isObject = function (inp) {
  return typeof inp === "object" && inp !== null;
};

const sudoMap = {
  a: "á",
  b: "β",
  c: "ç",
  d: "δ",
  e: "è",
  f: "ƒ",
  g: "ρ",
  h: "λ",
  i: "ï",
  j: "J",
  k: "ƙ",
  l: "ℓ",
  m: "₥",
  n: "ñ",
  o: "ô",
  p: "ƥ",
  q: "9",
  r: "ř",
  s: "ƨ",
  t: "ƭ",
  u: "ú",
  v: "Ʋ",
  w: "ω",
  x: "ж",
  y: "¥",
  z: "ƺ",
  A: "Â",
  B: "ß",
  C: "Ç",
  D: "Ð",
  E: "É",
  F: "F",
  G: "G",
  H: "H",
  I: "Ì",
  J: "J",
  K: "K",
  L: "£",
  M: "M",
  N: "N",
  O: "Ó",
  P: "Þ",
  Q: "Q",
  R: "R",
  S: "§",
  T: "T",
  U: "Û",
  V: "V",
  W: "W",
  X: "X",
  Y: "Ý",
  Z: "Z",
};

const translateICU = function (inp) {
  inp = inp.substr(1, inp.length - 2);

  const regex = new RegExp("({[^}]*})", "gi");
  var match;
  var indx = 0;
  var res = ["{"];

  while ((match = regex.exec(inp)) !== null) {
    if (match && match.length > 1) {
      if (match.index > indx) {
        res.push(inp.substring(indx, match.index));
      }
      res.push(translateToSudo(match[1]));
      indx = match.index + match[1].length;
    }
  }
  if (indx < inp.length) {
    res.push(translateToSudo(inp.substr(indx)));
  }
  res.push("}");
  return res.join("");
};

const translateToSudo = function (inp) {
  if (inp.indexOf("VAR_PLURAL") > 0 || inp.indexOf("VAR_SELECT") > 0) {
    return translateICU(inp);
  }

  var out = [];
  for (var i = 0; i < inp.length; i++) {
    var inpCh = inp.charAt(i);
    out.push(sudoMap[inpCh] || inpCh);
  }
  return out.join("");
};

const parseJson = function (obj, transMap) {
  if (isObject(obj)) {
    for (var key in obj) {
      if (key === "source") {
        const source = obj[key][0];
        let target = JSON.parse(JSON.stringify(source));

        if (typeof target === "string") {
          target = translateToSudo(target);
        } else if (isObject(target) && target["_"]) {
          target["_"] = translateToSudo(target["_"]);
        }

        obj.target = target;
      } else {
        parseJson(obj[key], transMap);

        if (key === "trans-unit") {
          const units = obj[key];
          units.forEach(function (unit) {
            console.log(1, JSON.stringify(unit));
            const id = unit["$"].id;
            if (id) {
              transMap[id] = unit["target"];
            }
          });
        }
      }
    }
  }
};

console.log("Sudo-lang: start");

const parseSax = (xml) => {
  const parser = sax.parser(false);
  const json = {};
  let curTag = null;

  const createTag = (node, parent) => {
    const newItem = {
      parent,
      name: node.name,
      children: [],
    };
    if (parent) {
      parent.children.push(newItem);
    }
    return newItem;
  };

  const buildSourceString = (tag) => {
    // console.log(tag);
    const res = [];
    tag.children.forEach((item) => {
      if (typeof item === "string") {
        res.push(item);
      } else {
        res.push("{$" + item.id + "}");
      }
    });
    return res.join("");
  };

  parser.onerror = function (err) {
    // an error happened.
    console.log("sax error", err);
  };
  parser.onopentag = function (node) {
    // opened a tag.  node has "name" and "attributes"
    // console.log("sax opentag", node);
    if (node.name === "TRANS-UNIT") {
      curTag = createTag(node);
    } else if (curTag) {
      if (node.name === "SOURCE") {
        curTag.source = createTag(node, curTag);
        curTag = curTag.source;
      } else {
        curTag = createTag(node, curTag);
      }
    }

    if (curTag && node.attributes) {
      curTag.id = "" + node.attributes.ID;
    }
  };
  parser.onclosetag = function (nodeName) {
    // opened a tag.  node has "name" and "attributes"
    // console.log("sax closetag", nodeName);
    if (nodeName === "TRANS-UNIT") {
      json[curTag.id] = buildSourceString(curTag.source);
      curTag = null;
    } else if (curTag) {
      curTag = curTag.parent;
    }
  };
  parser.onattribute = function (attr) {
    // an attribute.  attr has "name" and "value"
    // console.log("sax attribute", attr);
    if (attr.name === "ID" && curTag) {
      // console.log("sax attribute", attr);
      curTag.id = "" + attr.value;
    }
  };
  parser.ontext = function (t) {
    // got some text.  t is the string of text.
    // console.log("sax text", JSON.stringify(t));
    if (curTag) {
      curTag.children.push(t);
    }
  };
  parser.onend = function () {
    // parser stream is done, and ready to have more stuff written to it.
    // console.log("sax end");
  };

  // console.log("sax start");
  parser.write(xml).close();

  console.log("sax json", json);
  return json;
};

const parser = new xml2js.Parser();
fs.readFile(__dirname + "/messages.xlf", "utf8", function (err, data) {
  const xml = data + "";
  parseSax(xml);

  // parser.parseString(xml, function (err, result) {
  //   if (err) {
  //     console.error("Sudo-lang: read file error", err);
  //   } else {

  //     const map = {};
  //     parseJson(result, map);
  //     // console.log(JSON.stringify(result));
  //     // console.log(map);

  //     const builder = new xml2js.Builder();
  //     const newXml = builder.buildObject(result);

  //     fs.writeFile(__dirname + "/messages.sudo.xlf", newXml, (err) => {
  //       if (err) {
  //         console.error("Sudo-lang write file error", err);
  //       } else {
  //         console.log("Sudo-lang: success");
  //       }
  //     });
  //   }
  // });
});

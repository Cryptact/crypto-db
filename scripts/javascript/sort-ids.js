const fs = require('fs-extra');

function sortKeys(o) {
  return Object.keys(o).sort().reduce((out, key) => {
    out[key] = o[key];
    return out;
  }, {});
}

function sortIds() {
  return fs.readFile("lib/ids.json", { encoding: "utf8" }).then((value) => {
    return JSON.parse(value);
  }).then((ids) => {
    return Object.keys(ids).map((id) => {
      return ids[id];
    }).sort((a, b) => {
      if (a.symbol > b.symbol) {
        return 1;
      } else if (a.symbol < b.symbol) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      }
      return 0;
    }).reduce((o, v) => {
      o[v.id] = sortKeys(v);
      return o
    }, {});
  }).then((sortedIds) => {
    return fs.writeFile("lib/ids.json", JSON.stringify(sortedIds, null, 2) + "\n");
  });
}


function sortMaps(dirpath) {
  return fs.readdir(dirpath).then((files) => {
    return Promise.all(files.map((file) => {
      if (file.substr(file.length - 5, 5) !== ".json") {
        return Promise.resolve();
      }

      return fs.readFile(`${dirpath}/${file}`, { encoding: "utf8" }).then(JSON.parse).then((data) => {
        const map = data.map.map(sortKeys).sort((a, b) => {
          if (a.ns_id > b.ns_id) {
            return 1;
          } else if (a.ns_id < b.ns_id) {
            return -1;
          } else if ((a.to && !b.to) || a.to > b.to) {
            return 1;
          } else if ((b.to && !a.to) || a.to < b.to) {
            return -1;
          } else if ((a.from && !b.from) || a.from > b.from) {
            return 1;
          } else if ((b.from && !a.from) || a.from < b.from) {
            return -1;
          }
        });
        data.map = map;
        return sortKeys(data);
      }).then((sortedData) => {
        return fs.writeFile(`${dirpath}/${file}`, JSON.stringify(sortedData, null, 2) + "\n");
      });
    }))
  });
}

Promise.all([sortIds(), sortMaps("lib/map_for_accuracy"), sortMaps("lib/map_for_coverage")]);

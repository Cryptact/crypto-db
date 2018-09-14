/**
 * exporting composite
 *
 * Copyright (C) 2018 Cryptact, LTD.
 */

// ls | sed -e "s/^/\"/g" -e "s/\.json/\",/g"
const namespaces = ["cryptact"];

module.exports = namespaces.reduce(
  (all, ns) => (all[ns] = require("./" + ns)),
  {}
);

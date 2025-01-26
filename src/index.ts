// Import promise to initiate it's overrides.
import { exec, execAll } from "./exec";
import "./promise";

execAll([], {
  type: "in-order",
}).then((results) => {
  console.debug(results);
});

import commandLineArgs from "command-line-args";
import os from "os";
import { join } from "path";

export interface CommandLineArguments {
  minecraft: string;
  fabric: string;
  launcher: string;
}

let defaultMCLauncherDir: string;
if (/win/.test(os.platform())) {
  defaultMCLauncherDir = join(
    os.userInfo().homedir,
    "/AppData/Roaming/.minecraft"
  );
} else if (/darwin/.test(os.platform())) {
  defaultMCLauncherDir = join(
    os.userInfo().homedir,
    "/Library/Application Support/minecraft"
  );
} else {
  defaultMCLauncherDir = join(os.userInfo().homedir, "/.minecraft");
}

const commandLineOpts = [
  {
    name: "minecraft",
    alias: "m",
    type: String,
    defaultValue: "latest",
    defaultOption: true,
  },
  { name: "fabric", alias: "f", type: String, defaultValue: "latest" },
  {
    name: "launcher",
    alias: "l",
    type: String,
    defaultValue: defaultMCLauncherDir,
  },
];

export const args = <CommandLineArguments>commandLineArgs(commandLineOpts);
export default args;

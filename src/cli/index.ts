#!/usr/bin/env node

import { program } from "commander";
import { name, description, version } from "../../package.json";

// Set name, desc, and vers from package.json
program.name(name).description(description).version(version);

// Commands

// Initiate
program.command("init").description("Initiates a new Crystal Ball project.");

// Initiate
program.parse();

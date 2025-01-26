import { join } from "path";
import TOML from "@iarna/toml";
import { readdir, readFile, writeFile } from "fs/promises";

const MOD_SOURCE = "advanced";

async function getModMetadata(source) {
  return await new Promise((resolve, reject) => {
    readdir(join(process.cwd(), source, "./mods"))
      .then((modFiles) => {
        const fetchRequests = [];

        for (const modFileName of modFiles) {
          fetchRequests.push(
            new Promise((resolve, reject) => {
              readFile(
                join(process.cwd(), source, "./mods", modFileName),
                "utf-8"
              )
                .then((rawToml) => {
                  const file = TOML.parse(rawToml);
                  Promise.all([
                    fetch(
                      `https://api.modrinth.com/v2/project/${file.update.modrinth["mod-id"]}`
                    ).then((res) => res.json()),
                    fetch(
                      `https://api.modrinth.com/v2/project/${file.update.modrinth["mod-id"]}/members`
                    ).then((res) => res.json()),
                  ])
                    .then((responses) => {
                      resolve({
                        pkg: responses[0],
                        members: responses[1],
                      });
                    })
                    .catch(reject);
                })
                .catch(reject);
            })
          );
        }

        Promise.all(fetchRequests)
          .then((mods) => {
            resolve(
              mods.sort((a, b) => {
                a.pkg.slug.localeCompare(b.pkg.slug);
              })
            );
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

function isFromOrganization(pkg, members) {
  return pkg.organization !== null && members.length <= 0;
}

console.info("Generating credits...");

const mods = await getModMetadata(MOD_SOURCE);

let output =
  "# Mod Credits\n\n{{mods}}\n### Limits\n\nDue to a limitation with the Modrinth API (or potentially my stupidity) I am unable to fetch the names of organizations. Please follow the org's link to see more information.\n\n### Licences\n\nPlease see the linked mod pages for licencing info.";

let modCredits = "";
for (const { pkg, members } of mods) {
  const author = isFromOrganization(pkg, members)
    ? `Organization (${pkg.organization})`
    : `${members[0].user.username}`;

  console.info(`  - Generating for ${pkg.title} by ${author}...`);

  modCredits = `${modCredits}- [${pkg.title}](https://modrinth.com/mod/${
    pkg.slug
  }) by [${author}](https://modrinth.com/${
    isFromOrganization(pkg, members) ? "organization" : "user"
  }/${
    isFromOrganization(pkg, members)
      ? pkg.organization
      : members[0].user.username
  })\n`;
}

output = output.replace(/{{mods}}/g, modCredits);
await writeFile(join(process.cwd(), "./CREDITS.md"), output, "utf-8");

console.info("Done!");

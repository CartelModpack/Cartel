# Modules
import os
import tomllib
import requests
import json 

# Source
credits_source = "# Credits\n\n## Mods\n\n{{mods}}";

# Get Credits (All will use "plus" version because it tends to be the most complete :P)

# Mods
print("Getting mods list...")
mods_list = os.listdir("./plus/mods")

mod_credits = ""

for mod in mods_list:
    with open("./plus/mods/" + mod, "rb") as mod_file:
        mod_file_data = tomllib.load(mod_file)
        # Gets data from Modrinth
        mod_meta_data = json.loads(requests.get("https://api.modrinth.com/v2/project/" + mod_file_data.get("update").get("modrinth").get("mod-id")).text)
        mod_user_data = json.loads(requests.get("https://api.modrinth.com/v2/project/" + mod_file_data.get("update").get("modrinth").get("mod-id") + "/members").text)
        print("Generating credits for " + mod_meta_data.get("title") + " by " + mod_user_data[-1].get("user").get("username") + "...")
        mod_credits = mod_credits + "- [" + str(mod_meta_data.get("title")) + "](https://modrinth.com/mod/" + str(mod_meta_data.get("slug")) + ") by [" + str(mod_user_data[-1].get("user").get("username")) + "](https://modrinth.com/user/" + str(mod_user_data[-1].get("user").get("username")) + ") (" + str(mod_meta_data.get("license").get("name")) + ")\n"

print("Mod credits generated!")

# Replace
credits_out = credits_source.replace("{{mods}}", mod_credits)

# Generate File
print("Writing credits to disk...")
credits_file = open("./CREDITS.md", "w")
credits_file.write(credits_out)
credits_file.close()
print("Done!")
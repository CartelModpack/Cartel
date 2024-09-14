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
        mod_project_id = mod_file_data.get("update").get("modrinth").get("mod-id")
        # Gets data from Modrinth
        mod_meta_data = json.loads(requests.get("https://api.modrinth.com/v2/project/" + mod_project_id).text)
        mod_user_data = json.loads(requests.get("https://api.modrinth.com/v2/project/" + mod_project_id + "/members").text)
        if (mod_meta_data.get("organization") and len(mod_user_data) <= 0):
            author_link = "https://modrinth.com/organization/"
            author_tag = mod_meta_data.get("organization")
            author_name = "Organization {" + author_tag + "}"
        else:
            author_link = "https://modrinth.com/user/"
            author_name = str(mod_user_data[-1].get("user").get("username"))
            author_tag = author_name
        print("Generating credits for " + mod_meta_data.get("title") + " by " + author_name + "...")
        mod_credits = mod_credits + "- [" + str(mod_meta_data.get("title")) + "](https://modrinth.com/mod/" + str(mod_meta_data.get("slug")) + ") by [" + author_name + "](" + author_link + author_tag + ") (" + str(mod_meta_data.get("license").get("name")) + ")\n"

print("Mod credits generated!")

# Replace
credits_out = credits_source.replace("{{mods}}", mod_credits)

# Generate File
print("Writing credits to disk...")
credits_file = open("./CREDITS.md", "w")
credits_file.write(credits_out)
credits_file.close()
print("Done!")
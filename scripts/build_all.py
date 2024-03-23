# Modules
import subprocess

# Run the export command for Modrinth and Curseforge on all types
subprocess.call(["cd", "../lite", "&&", "packwiz", "modrinth", "export"], shell=True)
subprocess.call(["cd", "../lite", "&&", "packwiz", "curseforge", "export"], shell=True) 

subprocess.call(["cd", "../normal", "&&", "packwiz", "modrinth", "export"], shell=True)
subprocess.call(["cd", "../normal", "&&", "packwiz", "curseforge", "export"], shell=True)

subprocess.call(["cd", "../plus", "&&", "packwiz", "modrinth", "export"], shell=True)
subprocess.call(["cd", "../plus", "&&", "packwiz", "curseforge", "export"], shell=True)
# Modules
import subprocess

# Run the refresh command for all projects
subprocess.call(["cd", "./lite", "&&", "packwiz", "refresh"], shell=True) 
subprocess.call(["cd", "./normal", "&&", "packwiz", "refresh"], shell=True)
subprocess.call(["cd", "./plus", "&&", "packwiz", "refresh"], shell=True)
---
description: Development Environment Verification
auto_execution_mode: 1
---

Step 0 — Development Environment Verification and Installation
	1.	Verify if NVM is installed.
	•	If not installed, install NVM according to the operating system (Linux, Mac or Windows).
	2.	Verify if Node.js is installed and that the active version is exactly 22.x.
	•	If Node doesn't exist, install it with NVM using:
	•	nvm install 22
	•	nvm use 22
	•	If it exists but is another version, switch to the correct one with:
	•	nvm install 22 (if not downloaded)
	•	nvm use 22
	3.	Verify that npm is available and that it corresponds to the version included with Node 22.
	•	If not, reinstall Node 22 with NVM to force the installation of the correct npm.
	4.	At the end, show a clear summary:
	•	Which dependencies are ready.
	•	Which were installed or updated during this process.
	5.	If everything is correct, print a ✅ indicating that the environment is ready to continue with the project construction.

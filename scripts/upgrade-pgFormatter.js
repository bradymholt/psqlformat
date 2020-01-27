#!/usr/bin/env npx jbash
const path = require("path");
const fs = require("fs");

const latestRelease = JSON.parse(
  $(
    `curl -H "Authorization: token $GITHUB_API_TOKEN" -H "Content-Type: application/json" \
 https://api.github.com/repos/darold/pgFormatter/releases/latest`
  )
);

const latestReleaseFile = path.join(__dirname, "../vendor/pgFormatter/latestRelease.json");
if (fs.existsSync(latestReleaseFile)) {
  const localRelease = JSON.parse(cat(latestReleaseFile));

  echo(`Local version: ${localRelease.tag_name}`);
  echo(`Latest version: ${latestRelease.tag_name}`);

  const newVersionAvailable = localRelease.tag_name != latestRelease.tag_name;
  if (!newVersionAvailable) {
    echo("No new version available.");
    exit(0);
  }
}

const releaseDownloadFileName = "release.zip";
const releaseDownloadFolder = "release/";

echo("Downloading latest release...");
eval(`wget -O ${releaseDownloadFileName} ${latestRelease.zipball_url}`);
eval(`unzip ${releaseDownloadFileName} -d ${releaseDownloadFolder}`);

const targetFilePath = "../vendor/pgFormatter/";
echo(`Extracting and copying source files to ${targetFilePath} ...`);

eval(`find . -type f -name "pg_format" -exec cp {} ${path.join(__dirname, targetFilePath)} \\;`);
eval(`find . -type d -name "pgFormatter" -exec cp -r {} ${path.join(__dirname, targetFilePath, "lib/")} \\;`);

eval(`rm ${releaseDownloadFileName}`);
eval(`rm -rf ${releaseDownloadFolder}`);
echo(JSON.stringify(latestRelease, null, 2), latestReleaseFile);

echo("Done!");

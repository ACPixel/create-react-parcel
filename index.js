#!/usr/bin/env node

const ora = require('ora');
const d = require('make-dir');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const wjf = require('write-json-file');
const nrc = require('node-run-cmd');
const files = require("./lib/files");


var dir = "react-parcel";

if (argv._[0]) {
    dir = argv._[0];
}

const s1 = ora(`Creating directory (${dir})`).start();
const s2 = ora(`Adding package.json`);
const s3 = ora(`Creating Other files and foler structure`);
const s4 = ora(`Installing node modules(this could take a minute)`)

if (fs.existsSync(dir)) {
    s1.fail(`Directory (${dir}) Already exists`);
} else {
    d(dir).then(path => {
        s1.succeed(`${dir} directory created successfully`);
        s2.start();
        wjf(`${dir}/package.json`, files.package()).then(() => {
            s2.succeed(`Created Package.json`);
            s3.start();
            d(`${dir}/src`).then(path => {
                fs.writeFile(`${dir}/src/index.html`, files.html(), (err) => {
                    if (err) {
                        s3.fail("Failed to write index.html")
                    } else {
                        fs.writeFile(`${dir}/src/index.js`, files.js(), (err) => {
                            if (err) {
                                s3.fail("Failed to write index.js")
                            } else {
                                fs.writeFile(dir + "/src/main.scss", files.scss(), (err) => {
                                    if (err) {
                                        s3.fail("Failed to write main.scss")
                                    } else {
                                        s3.succeed(`Files and structure created`);
                                        s4.start();
                                        s4.text = `Installing node modules using yarn(this could take a minute)`;
                                        nrc.run(`yarn --cwd ${dir}`).then(function(exitCodes) {
                                            s4.succeed("Modules installed");
                                            console.log("Project initialization complete!");
                                            console.log(`CD into ${dir} and run \`npm run start\` to start the dev server and \`npm run build\` to build a production version to /dist`)
                                        }).catch(()=>{
                                            s4.text = `Installing node modules using npm(this could take a minute)`;
                                            nrc.run(`npm i --prefix ./${dir}`).then(function(exitCodes) {
                                                s4.succeed("Modules installed");
                                                console.log("Project initialization complete!");
                                                console.log(`CD into ${dir} and run \`npm run start\` to start the dev server and \`npm run build\` to build a production version to /dist`)
                                            }).catch(()=>{
                                                s4.error("Failed to install modules")
                                            })
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            })
        });
    })
}
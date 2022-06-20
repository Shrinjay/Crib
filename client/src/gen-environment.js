const fs = require('fs')

ENVIRONMENT_DIRECTORY = "./environments"
VALID_ENVIRONMENTS = ["dev", "prod"]

function buildProdEnvObject() {
  require('dotenv').config()
  let environment = {
    production: true,
    mapbox_key: process.env.MAPBOX_KEY || "",
    base_url: "http://crib-dev-2.eba-fk2xzjmn.us-west-2.elasticbeanstalk.com",
    crime_data_base_url: "http://crimeetl2-env.eba-2eude4sp.us-west-2.elasticbeanstalk.com/",
    business_data_base_url: "http://business-etl.eba-kxrirbab.us-west-2.elasticbeanstalk.com"
  }
  return environment
}

function buildDevEnvObject() {
  require('dotenv').config()
  let environment = {
    production: false,
    mapbox_key: process.env.MAPBOX_KEY || "",
    base_url: "http://localhost:8080",
    crime_data_base_url: "http://localhost:5000",
    business_data_base_url: "http://localhost:5001"
  }
  return environment
}

function buildEnvFile(envObject) {
  return `export const environment = ${JSON.stringify(envObject)}`
}

var envFileContent;
var fileName;

if (process.argv.length <= 2 || !VALID_ENVIRONMENTS.includes(process.argv[2])) {
  console.log("Specify prod or dev environment")
}

if (process.argv[2] == "prod") {
  console.log("Generating prod environment.ts")
  envFileContent = buildEnvFile(buildProdEnvObject())
  fileName = "environment.prod.ts"
}

else if (process.argv[2] == "dev") {
  console.log("Generating dev environment.ts")
  envFileContent = buildEnvFile(buildDevEnvObject())
  fileName = "environment.ts"
}

fs.writeFile(`${ENVIRONMENT_DIRECTORY}/${fileName}`, envFileContent, err => {
  if (err) throw err
  console.log("Generated env file")
})

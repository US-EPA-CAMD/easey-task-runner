require('dotenv').config();

import { Pool } from 'pg';

let pgHost = process.env.EASEY_DB_HOST || "database";
let pgPort = +process.env.EASEY_DB_PORT || 5432;
let pgUser = process.env.EASEY_DB_USER || "postgres";
let pgPwd = process.env.EASEY_DB_PWD || "password";
let pgDb = process.env.EASEY_DB_NAME || "postgres";

if (process.env.VCAP_SERVICES) {
  const vcapSvc = JSON.parse(process.env.VCAP_SERVICES);
  const vcapSvcCreds = vcapSvc["aws-rds"][0].credentials;

  pgHost = vcapSvcCreds.host;
  pgPort = +vcapSvcCreds.port;
  pgUser = vcapSvcCreds.username;
  pgPwd = vcapSvcCreds.password;
  pgDb = vcapSvcCreds.name;
}

export const pgPool = new Pool({
  application_name: "easey-task-runner",
  user: pgUser,
  host: pgHost,
  database: pgDb,
  password: pgPwd,
  port: pgPort,
  max: 20,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
  maxUses: 500,
});

export default pgPool;
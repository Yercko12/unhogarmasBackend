import pkg from 'pg';
const {Pool} = pkg

export const pool =  new Pool({
 user: "postgres",
 host: "localhost",
 database: "unhogarmas",
 password: "postgres",
 port: 5432,
 allowExitOnIdle: true,
 })


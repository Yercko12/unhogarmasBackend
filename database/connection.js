import pkg from 'pg';
import 'dotenv/config'
const {Pool} = pkg


export const pool =  new Pool({
    
 allowExitOnIdle: true,
 })


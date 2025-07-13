import { pool } from "../database/connection.js";
import format from "pg-format";

const findUser = async (id) => {
    const query = "select * from users where id = $1";
    const {rows} = await pool.query(query, [id])
    return rows[0]
} 
/* const  findByEmail = */
const create = async (user) => {
    const query = "Insert into users (firstName, lastName, email, rut, photo, userRole) values $1, $2, $3, $4, $5, $6 returning *"
    const {rows} = await pool.query(query, [user.name, user.lastName, user.email, user.rut, user.photo, user.role])
    return rows[0]

}

const update = async (id, updatedFields) => {
  const fields = [];

  for (const key in updatedFields) {
    const value = updatedFields[key];
    if (value !== undefined) {
      // formatea cada campo como: columna = 'valor'
      fields.push(format('%I = %L', key, value));
    }
  }

  if (fields.length === 0) return null; 

  const query = format(
    'UPDATE users SET %s WHERE id = %L RETURNING id, first_name, last_name, email, rut',
    fields.join(', '),
    id
  );

  const { rows } = await pool.query(query);
  return rows[0];
};




export const userModel = {findUser, create, update }
import { pool } from "../database/connection.js";

const findUser = async (id) => {
    const query = "select * from users where id = $1";
    const {rows} = await pool.query(query, [id])
    return rows[0]
} 

const create = async (user) => {
    const query = "Insert into users (firstName, lastName, email, rut, photo, userRole) values $1, $2, $3, $4, $5, $6 returning *"
    const {rows} = await pool.query(query, [user.name, user.lastName, user.email, user.rut, user.photo, user.role])
    return rows[0]

}

const update = async (id, updatedInfo) => {
  const query = "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *";

  const values = [
    updatedInfo.first_name,
    updatedInfo.last_name,
    updatedInfo.email,
    id
  ];

  const { rows } = await pool.query(query, values);
  return rows[0]; // Devuelve el usuario actualizado
};




export const userModel = {findUser, create, update }
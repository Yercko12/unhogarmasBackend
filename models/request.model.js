import { pool } from '../database/connection.js';

const findAllRequest = async () =>{
    const query = "Select * from request";
    const {rows} = await pool.query(query)
    return rows
}

const create = async (request) => {
    const query = "INSERT INTO adoption_requests (age, phone,  address,  housing_type, allows_pets, pet_name, reason, household,  user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning * "
    const {rows} =  await pool.query(query, [request.age, request.phone, request.address, request.housing_type, request.allows_pets, request.pet_name, request.reason, request.household, request.user_id])
    return rows[0]
}

const update = async (newStatus, id) => {
  const query = "UPDATE adoption_requests SET status = $1 WHERE id = $2 RETURNING * ";
  const {rows} = await pool.query(query, [newStatus, id])
  return rows[0]
}

const remove = async (id) => {
     const query = "DELETE FROM adoption_requests WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0]; 
};


export const requestModel = {findAllRequest, create, update, remove}
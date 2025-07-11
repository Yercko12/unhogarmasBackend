import { pool } from '../database/connection.js'

const findAllPets = async () => {
 const { rows } = await pool.query("SELECT * FROM pets");
 return rows;
 };

const findById = async (id) => {
    const query = "Select * from pets where id = $1";
    const {rows} = await pool.query(query, [id]);
    return rows[0]
}

const create = async (pet) => {
    const query = "Insert into pets (name, breed, age, gender, chip, photo, description) values ($1, $2, $3, $4, $5, $6, $7) returning *"
    const {rows} = await pool.query(query, [pet.name, pet.breed, pet.age, pet.gender, pet.chip, pet.photo, pet.description])
    return rows[0]
}

const remove = async (id) => {
    const query = "delete from pets where id = $1 returning *";
    const {rows} = await pool.query(query, [id])
    return rows[0]

}

const update = async () => {

}

export const petModel = {
 findAllPets, findById, create, remove, update
 };
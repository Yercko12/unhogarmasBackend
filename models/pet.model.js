import { pool } from '../database/connection.js'

const findAllPets = async ({ limit = 8 }) => {
    const query = "SELECT * FROM pets order by created_at limit $1"
    const { rows } = await pool.query(query, [limit]);
    return rows;
};

const findByFilter = async (type, age, weight) => {
    const query = "Select * from pets where type = $1 and age = $2 and weight = $3 returning *"
    const {}
} 

/* Lógica js para calcular y clasificar tamaño según peso kg*/

const findById = async (id) => {
    const query = "Select * from pets where id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

const create = async (pet, userid) => {
    const query = "Insert into pets (name, breed, age, gender, chip, photo, description, author_post) values ($1, $2, $3, $4, $5, $6, $7) returning *"
    const { rows } = await pool.query(query, [pet.name, pet.breed, pet.age, pet.gender, pet.chip, pet.photo, pet.description])
    return rows[0]
}

const remove = async (id) => {
    const query = "delete from pets where id = $1 returning *";
    const { rows } = await pool.query(query, [id])
    return rows[0]

}

const update = async () => {

}

export const petModel = {
    findAllPets, findById, create, remove, update
};
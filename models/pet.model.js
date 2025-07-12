import { pool } from '../database/connection.js'

const findAllPets = async ({ limit = 8, species, size, age }) => {
    let query = "SELECT * FROM pets WHERE 1=1";
    const values = [];
    let index = 1;

    if (species) {
        query += ` AND species = $${index++}`;
        values.push(species);
    }

    if (size) {
        if (size === '1kg-5kg') {
            query += ` AND weight BETWEEN $${index} AND $${index + 1}`;
            values.push(1, 5);
            index += 2;
        } else if (size === '5kg-10kg') {
            query += ` AND weight BETWEEN $${index} AND $${index + 1}`;
            values.push(5, 10);
            index += 2;
        } else if (size === '+10kg') {
            query += ` AND weight > $${index}`;
            values.push(10);
            index++;
        }
    }

    if (age) {
        if (age === 'menos de 1 año') {
            query += ` AND age < $${index}`;
            values.push(1);
            index++;
        } else if (age === '1 a 3 años') {
            query += ` AND age BETWEEN $${index} AND $${index + 1}`;
            values.push(1, 3);
            index += 2;
        } else if (age === 'más de 4 años') {
            query += ` AND age > $${index}`;
            values.push(4);
            index++;
        }
    }
    query += ` ORDER BY created_at DESC LIMIT $${index}`;
    values.push(limit);

    const { rows } = await pool.query(query, values);
    return rows;
};



const findById = async (id) => {
    const query = "Select * from pets where id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

const create = async (pet, userid) => {
    const query = "Insert into pets (name, breed, age, gender, chip, photo, description, author_post) values ($1, $2, $3, $4, $5, $6, $7) returning *"
    const { rows } = await pool.query(query, [pet.name, pet.breed, pet.age, pet.gender, pet.chip, pet.photo, pet.description, userid])
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
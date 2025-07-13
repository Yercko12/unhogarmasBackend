import { pool } from '../database/connection.js'

import format from 'pg-format';

const findAllPets = async ({ limit = 8, species, size, age }) => {
  let baseQuery = 'SELECT * FROM pets WHERE true';
  const conditions = [];
  const values = [];

  if (species) {
    conditions.push(format('species = %L', species));
  }


  if (size) {
    if (size === '1kg-5kg') {
      conditions.push('weight BETWEEN 1 AND 5');
    } else if (size === '5kg-10kg') {
      conditions.push('weight BETWEEN 5 AND 10');
    } else if (size === '+10kg') {
      conditions.push('weight > 10');
    }
  }


  if (age) {
    if (age === 'menos de 1 año') {
      conditions.push('age < 1');
    } else if (age === '1 a 3 años') {
      conditions.push('age BETWEEN 1 AND 3');
    } else if (age === 'más de 4 años') {
      conditions.push('age > 4');
    }
  }

 
  if (conditions.length > 0) {
    baseQuery += ' AND ' + conditions.join(' AND ');
  }

  baseQuery += format(' ORDER BY created_at DESC LIMIT %L', limit);

  const { rows } = await pool.query(baseQuery);
  return rows;
};



const findById = async (id) => {
    const query = "Select * from pets where id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0]
}

const findByUser = async (userId) => {
  const query = " SELECT * FROM pets WHERE author_post = $1 ORDER BY created_at DESC";
  const { rows } = await pool.query(query, [userId]);
  return rows; 
};


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

const update = async (petId, userId, updatedPet) => {
  const query = "UPDATE pets SET name = $1, breed = $2, age = $3, weight = $4, gender = $5, chip = $6, photo = $7, description = $8 WHERE id = $9 AND author_post = $10 RETURNING *";

  const values = [
    updatedPet.name,
    updatedPet.breed,
    updatedPet.age,
    updatedPet.weight,
    updatedPet.gender,
    updatedPet.chip,
    updatedPet.photo,
    updatedPet.description,
    petId,
    userId 
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};



export const petModel = {
    findAllPets, findById, create, remove, update, findByUser
};
import connection from "../database.js";

export async function selectAllCategories(){
    const categories = await connection.query('select * from categories');
    return categories.rows;
}

export async function createNewCategory(name){
    await connection.query('insert into categories (name) values ($1)', [name]);
}

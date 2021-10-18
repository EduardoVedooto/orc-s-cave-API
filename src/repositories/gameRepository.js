import connection from "../database.js";

export async function selectAllGames(){
    const gamesList = await connection.query(
        `SELECT games.*, categories.name as "categoryName"
        FROM games JOIN categories
        ON games."categoryId" = categories.id`
    );
    return gamesList.rows;
}

export async function selectGamesByName(name){
    const gamesList = await connection.query(
        `SELECT games.*, categories.name as "categoryName"
        FROM games JOIN categories
        ON games."categoryId" = categories.id
        WHERE games.name ILIKE $1%`,
        [name]
    );
    return gamesList.rows;
}


export async function createGame(game){
    const {name, image, stockTotal, categoryId, pricePerDay} = game;
    await connection.query(
        `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        VALUES ($1, $2, $3, $4, $5)`, 
        [name, image, stockTotal, categoryId, pricePerDay]
    );
}

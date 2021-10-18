import connection from "../database.js";

export async function getRentals(req, res){
    try {
        const returnDate = dayjs();
        const id = req.params.id;
        let delayFee;
        const foundId = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if (!foundId){
            return res.sendStatus(404);
        }
        if (foundId.rows[0].returnDate){
            return res.sendStatus(400);
        }
        let {rentDate, daysRented, originalPrice} = foundId.rows[0];
        rentDate = dayjs(rentDate);
        const delay = returnDate.diff(rentDate, "day");
        if(delay > daysRented){
            delayFee = (delay - daysRented) * originalPrice;
            await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`, [returnDate, delayFee, id]);
            return res.sendStatus(200);
        }
        await connection.query(`UPDATE rentals SET "returnDate" = $1 WHERE id = $2`, [returnDate, id]);
        res.sendStatus(200);
    } catch(e){
        console.log(e);
    }
}

export async function postRentals(req, res){
    try {
        const {customerId, gameId, daysRented} = req.body;
        const foundCustomer = await connection.query('SELECT id FROM customers WHERE id = $1', [customerId]);
        const foundGame = await connection.query('SELECT * FROM games WHERE id = $1', [gameId]);
        if ( !foundCustomer || !foundGame || foundGame.rows[0].stockTotal < 1 || daysRented < 1 ){
            return res.sendStatus(400);
        }
        const rentDate = dayjs();
        const gamePrice = await connection.query(`SELECT "pricePerDay" FROM games WHERE id = $1`, [gameId]);
        const originalPrice = daysRented * gamePrice.rows[0].pricePerDay;
        await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES ($1, $2, $3, $4, $5)', [customerId, gameId, rentDate, daysRented, originalPrice]);
        res.sendStatus(201);
    } catch(e) {
        console.log(e)
    }
}



export async function postReturnRentals(req, res){    
    try {
        const returnDate = dayjs();
        const id = req.params.id;
        let delayFee;
        const foundId = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if (!foundId){
            return res.sendStatus(404);
        }
        if (foundId.rows[0].returnDate){
            return res.sendStatus(400);
        }
        let {rentDate, daysRented, originalPrice} = foundId.rows[0];
        rentDate = dayjs(rentDate);
        const delay = returnDate.diff(rentDate, "day");
        if(delay > daysRented){
            delayFee = (delay - daysRented) * originalPrice;
            await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`, [returnDate, delayFee, id]);
            return res.sendStatus(200);
        }
        await connection.query(`UPDATE rentals SET "returnDate" = $1 WHERE id = $2`, [returnDate, id]);
        res.sendStatus(200);
    } catch(e){
        console.log(e);
    }
}

export async function deleteRentals(req, res){
    try {
        const id = req.params.id;
        const foundId = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if (!foundId.rows[0]){
            return res.sendStatus(404);
        } if (foundId.rows[0].returnDate){
            return res.sendStatus(400);
        }
        await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
        res.sendStatus(200);
    } catch(e) {
        console.log(e);
    }
}
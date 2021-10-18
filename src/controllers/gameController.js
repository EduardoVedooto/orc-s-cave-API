import * as gameService from '../services/gameService.js';

export async function getGames(req, res){
    try {
        const gameList = await gameService.getGames(req.query.name);
        return (gameList) ? res.status(200).send(gameList) : res.sendStatus(400);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function postGame(req, res){
    try {
        const validateGameInfo = await gameService.validateGameInfo(req.body);
        if (!validateGameInfo){
            return res.sendStatus(400);
        }

        const gameAlreadyExists = await gameService.checkGameAlreadyExists(req.body.name);
        if (gameAlreadyExists){
            return res.sendStatus(409);
        }

        await gameService.postGame(req.body);
        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}
import * as gameRepository from '../repositories/gameRepository.js';
import { checkCategoryById } from './categoryService.js';

export async function getGames(name){
    const gameList = await (name.length) ? gameRepository.selectGamesByName(name) : gameRepository.selectAllGames();
    return (gameList.length === 0) ? false : gameList;
}

export async function validateGameInfo(game){
    const {name, stockTotal, categoryId, pricePerDay} = game;
    const categoryExists = await checkCategoryById(categoryId);
    return (name && stockTotal > 0 && pricePerDay > 0 && categoryExists);
}

export async function checkGameAlreadyExists(name){
    const gameList = await gameRepository.selectAllGames();
    const foundGame = gameList.find((g)=>g.name === name);
    return foundGame;
}

export async function postGame(game){
    await gameRepository.createGame(game);
}
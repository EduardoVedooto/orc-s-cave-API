import * as categoryService from '../services/categoryService.js'

export async function getCategories (req, res) {
    try {
        const categoriesList = await categoryService.getCategories();
        return (categoriesList) ? res.status(200).send(categoriesList) : res.sendStatus(400);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
};

export async function postCategories (req, res) {
    try {
        const {name} = req.body;
        if(!name){
            return res.sendStatus(400);
        }
        const found = await categoryService.checkCategoryByName();
        if (found) {
            return res.sendStatus(409);
        }
        await categoryService.postCategory(name);
        res.sendStatus(201);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}

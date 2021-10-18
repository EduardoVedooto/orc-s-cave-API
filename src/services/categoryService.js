import * as categoryRepository from '../repositories/categoryRepository.js'

export async function getCategories () {
    const categoriesList = await categoryRepository.selectAllCategories();
    return (categoriesList.length === 0) ? false : categoriesList;
}

export async function checkCategoryByName (name) {
    const categoriesList = await categoryRepository.selectAllCategories();
    return categoriesList.find((c) => c.name === name);
}

export async function postCategory (name) {
    await categoryRepository.createNewCategory(name);
}

export async function checkCategoryById (id) {
    const categoriesList = await categoryRepository.selectAllCategories();
    return categoriesList.find((c) => c.id === id);
}
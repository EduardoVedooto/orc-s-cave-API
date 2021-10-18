import Joi from 'joi';
import * as customerRepository from '../repositories/customerRepository.js'

export async function getCustomers(cpf){
    const customerList = await (cpf) ? customerRepository.selectCustomersByCpf(cpf) : customerRepository.selectAllCustomers();
    return (customerList.length === 0) ? false : customerList;
}

export async function getCustomerById(id){
    const customer = await customerRepository.selectCustomerById(id);
    return (customer.length === 0) ? false : customer;
}

export async function validateCustomer(info){
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().min(10).max(11).required(),
        cpf: Joi.string().length(11).required(),
        birthday: Joi.date().less('now')
    });
    const {error, value} = schema.validate(info);
    return !error
}

export async function checkCustomerAlreadyExists(cpf){
    const customerList = await customerRepository.selectAllCustomers();
    return customerList.find((c) => c.cpf === cpf);
}

export async function checkCpfAlreadyExists(id, cpf){
    const otherCustomers = await customerRepository.selectAllCustomersExcept(id);
    const foundCpf = otherCustomers.find((c) => c.cpf === cpf);
    return foundCpf;
}

export async function postCustomer(info){
    await customerRepository.createCustomer(info);
}

export async function putCustomer(info, id){
    await customerRepository.updateCustomer(info, id);
}
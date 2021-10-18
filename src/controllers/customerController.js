import * as customerService from '../services/customerService.js'

export async function getCustomers(req, res){
    try {
        const customerList = await customerService.getCustomers(req.query.cpf);
        return (customerList) ? res.status(200).send(customerList) : res.sendStatus(400);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getCustomerById(req, res){
    try {
        const customer = await customerService.getCustomerById(req.params.id)
        return (customer) ? res.send(customer) : res.sendStatus(404);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function postCustomer(req, res){
    try{
        const validateCustomerInfo = await customerService.validateCustomer(req.body)
        if (!validateCustomerInfo){
            return res.sendStatus(400);
        }

        const customerAlreadyExists = await customerService.checkCustomerAlreadyExists(req.body.cpf)
        if (customerAlreadyExists){
            return res.sendStatus(409);
        }

        await customerService.postCustomer(req.body);
        return res.sendStatus(201);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function putCustomer(req, res){
    try {
        const validateCustomerInfo = await customerService.validateCustomer(req.body)
        if (!validateCustomerInfo){
            return res.sendStatus(400);
        }
        const {cpf} = req.body;
        const {id} = req.params;
        const cpfAlreadyExists = await customerService.checkCpfAlreadyExists(id, cpf)
        if (cpfAlreadyExists){
            return res.sendStatus(409);
        }
       
        await customerService.putCustomer(req.body, id);
        res.sendStatus(200);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}
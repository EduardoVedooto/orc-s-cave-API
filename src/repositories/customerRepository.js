import connection from "../database.js";

export async function selectCustomersByCpf(cpf){
    const customersList = await connection.query(`SELECT * FROM customers WHERE cpf LIKE $1%`, [cpf]);
    return customersList.rows;
}

export async function selectAllCustomers(){
    const customersList = await connection.query('SELECT * FROM customers');
    return customersList.rows;
}

export async function selectCustomerById(id){
    const customer = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id]);
    return customer.rows;
}

export async function selectAllCustomersExcept(id){
    const customers = await connection.query(`
        SELECT cpf FROM customers WHERE id <> $1
    `, [id])
    return customers.rows;
}

export async function createCustomer(info){
    const {name, phone, cpf, birthday} = info;
    await connection.query(`insert into customers (name, phone, cpf, birthday) values ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
}

export async function updateCustomer(info, id){
    const {name, phone, cpf, birthday} = info;
    await connection.query(`UPDATE customers
    SET name = $1, phone = $2, cpf = $3, birthday = $4
    WHERE id = $5`, 
    [name, phone, cpf, birthday, id]);
}
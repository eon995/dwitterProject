import { response } from 'express';
import { check } from 'express-validator';
import bcrypt from 'bcrypt';

let accountList = [{
    id: 'abc123',
    password: '123123',
    name: 'eon',
    username: 'Eon',
    email: 'abc123@gmail.com'
},
{
    id: 'abc456',
    password: '456456',
    name: 'bob',
    username: 'Bob',
    email: 'abc456@gmail.com'
}];
//find ps by id (login)

export async function checkId(id) {

    return accountList.find((t) => t.id == id) || null;
}

export async function checkPassword(id, password) {
    const check = checkId(id);
    if (check) {
        return check.password;
    }
    return 0;
}

export async function findPasswordById(id) {
    const check = checkId(id);
    if (check) {
        console.log(check.password);
        return check.password;
    }
    return 0;
}

export async function checkUsername(username) {
    const check = accountList.find((t) => t.username == username);
    return check || null;
}

export async function checkEmail(email) {
    const check = accountList.find((t) => t.email == email);
    return check || null;
}



//create account (sign up)
export async function createAccount(account) {
    const created = { ...account };
    accountList.push(account);

    return created.id;

}

export async function findOverlap(id, username, email) {
    const checkI = await checkId(id);
    const checkU = await checkUsername(username);
    const checkE = await checkEmail(email);


    if (checkI) {
        console.log(checkI);
        console.log(checkU);
        return id;
    } else if (checkU) {
        return username;
    } else if (checkE) {
        return email;
    } else {
        return 0;
    }

}






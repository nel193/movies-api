//DEBUG=app:* node scripts/mongo/seedUsers.js

const bcrypt = require('bcrypt');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const MongoLib= require('../../lib/mongo')
const {config} = require('../../config/index');

const users=[
    {
        email:'root@undefined.sh',
        name: 'ROOT',
        password: config.defaultAdminPassword,
        isAdmin:true
    },
    {
        email:'nel@undefined.sh',
        name: 'Nel',
        password: config.defaultUserPassword,
        isAdmin:false
    },
    {
        email:'pogo@undefined.sh',
        name: 'Pogo',
        password: config.defaultUserPassword,
        isAdmin:false
    }
]

async function createUser(mongoDB, user){
    const {name, email,password, isAdmin} = user;
    const hashedPassword = await bcrypt.hash(password, 10)

    const userId = await mongoDB.create('users', {
        name,
        email,
        password: hashedPassword,
        isAdmin: Boolean(isAdmin)
    })

    return userId
}

async function seedUsers(){
    try{
        const mongoDB = new MongoLib();

        const promises = users.map( async user => {
            const userId = await createUser(mongoDB, user);
            debug(chalk.green('User Created with id:', userId))
        });

        await Promise.all(promises);
        return process.exit(0);
    } catch(error){
        debug(chalk.red(error))
        return process.exit(1)
    }
}

seedUsers()
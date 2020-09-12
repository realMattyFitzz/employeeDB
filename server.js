const cTable = require('console.table');
require('dotenv').config();
const inquirer = require('inquirer');
const db = require('./db/database');
const menu = require('./js/menu');

menu()  
.then(()=> {
    console.log('\n');
})
.catch(err => {
    console.log(err);
});
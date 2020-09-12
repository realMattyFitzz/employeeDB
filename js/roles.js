const cTable = require('console.table');
const connect = require('../db/database');

//add a new department
const addRole = (role) => {
    let getid = role.menuChoice.split(".");
    let depId = parseInt(getid);
   return connect.promise().query(
        `INSERT INTO roles SET ?`,
        {
            title: role.title,
            salary: role.salary,
            department_id: depId
        },
        )
        .then(([rows, fields]) => {
            console.log('new role added')
            console.log(role.title)
        })
        .catch(error =>{
            if (error){
                console.log('error adding a new role:',error)
            }
        })
};

//Get All Roles
const displayAllRoles = () => {
    return connect.promise().query(
        `SELECT roles.id, title AS Job_Title, salary, name AS Department_Name 
        FROM roles
            INNER JOIN departments ON roles.department_id = departments.id;`)
        .then(([rows, fields]) => {
            console.log('\n \n Roles......')
            console.table(rows);
        })
        .catch(error =>{
            if (error){
                console.log('error connecting with database to display all roles: ',error)
            }
        })
};

//get roles to display on prompt
const getAllRoles = () => {
    return connect.promise().query("SELECT id, title FROM roles")
}

// delete a role
const deleteRole = (role) =>{
    let id = 0;
    // to get the Id from the employee string
    let getId = role.role.split(".");
    id = parseInt(getId[0]);
    return connect.promise().query(
        `DELETE FROM roles WHERE roles.id = ?`, id)
        .then(([rows, fields]) => {
            console.log(`role ${getId[1]} deleted`)
        })
        .catch(error =>{
            if (error){
                console.log(`error deleting role: `, error)
            }
        })
}


module.exports = { displayAllRoles, addRole, getAllRoles, deleteRole };
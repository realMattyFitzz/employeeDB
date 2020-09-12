const cTable = require('console.table');
const connect = require('../db/database');

//new department
const addDepartment = name => {
    return promise().query(
        `INSERT INTO departments SET ?`,
        {
            name: name
        },
        )
        .then(([rows, fields])=>{
            console.log('department added')
        })
        .catch(error =>{
            if (error){
                console.log(error)
            }
        })
};

//display departments
const displayAllDepartments = () => {
   return connect.promise().query("SELECT * FROM departments")
        .then(([rows, fields]) => {
            console.log('\n\n Departments......');
            console.table(rows);
        })
        .catch(error =>{
            if (error){
                console.log('error connecting with database')
            }
        })
};

//promptdepartments to display
const getAllDepartments = () => {
   return connect.promise().query("SELECT * FROM departments")
}

//function to delete a department
const deleteDep = (data)=> {
    let id = 0;
    let getId = data.department.split(".");
    id = parseInt(getId[0]);
    return connect.promise().query(
        `DELETE FROM departments WHERE departments.id = ?`, id)
        .then(([rows, fields]) => {
            console.log(`department ${getId[1]} deleted`)
        })
        .catch(error =>{
            if (error){
                console.log(`error deleting department: `, error)
            }
        })
}

//total budget utilized by department 
const viewBudget = () => {
    return connect.promise().query(
        `SELECT name AS Department_name, SUM(salary) AS total  
        FROM employees
        LEFT JOIN roles ON role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        GROUP BY name;`)
        .then(([rows, fields]) => {
            console.log(`Total Budget utilized by deprtments`)
            console.table(rows)
        })
        .catch(error =>{
            if (error){
                console.log(`error viewing budget: `, error)
            }
        })
}
module.exports = { displayAllDepartments, addDepartment, getAllDepartments, deleteDep, viewBudget};
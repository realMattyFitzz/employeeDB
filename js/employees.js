const cTable = require('console.table');
const con = require('../db/database');

//add a new Employee
const addEmployee = (employee) => {

    //get the Id from the role string
    let getId = employee.role.split(".");
    let roleId = parseInt(getId);

    //define query depending on if manager's Id is NULL or not
    let data = {}
    if(employee.manager !== 'None'){
        //get the Id from the manager string
        let getMId = employee.manager.split(".");
        let managerId ='';
        managerId = parseInt(getMId);
        data = {
            first_name: employee.firstName,
            last_name: employee.lastName,
            manager_id: managerId,
            role_id: roleId
        }
    } else if(employee.manager === 'None'){
        data = {
            first_name: employee.firstName,
            last_name: employee.lastName,
            role_id: roleId
        }
    }
    
    return con.promise().query(
        `INSERT INTO employees SET ?`,
        data,
        )
        .then(([rows, fields]) => {
            console.log('new employee added')
            console.log(employee.firstName, ' ', employee.lastName);
        })
        .catch(error =>{
            if (error){
                console.log('error adding new employee: ', error)
            }
        })
};

//Update Employees Role
const updateRole = (data)=>{
    console.log(data)
    //get the Id from the employee string
    let getId = data.employee.split(".");
    let employeeId = parseInt(getId[0]);

    //get the Id from the role string
    let splitId = data.role.split(".");
    let roleId = parseInt(splitId[0]);

    return con.promise().query(
        `UPDATE employees SET ? WHERE employees.id = ?`,
        [{role_id: roleId }, employeeId]
        )
        .then(([rows, fields]) => {
            console.log('employee updated')
            console.log(getId[1], 'New Role:',splitId[1])
        })
        .catch(error =>{
            if (error){
                console.log(`error updating employee's role: `, error)
            }
        }) 
};

//Display All Employees
const displayAllEmployees = (view) => {
    let param = '';
    //view all employees
    if (view === 1){
        param = `SELECT e.id, e.first_name, e.last_name, title AS Job_Title, salary, name AS Department_Name, 
        IFNULL(CONCAT(m.first_name, ', ', m.last_name),'NULL') AS 'Manager'
        FROM employees e
        LEFT JOIN employees m ON e.manager_id = m.id
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        ORDER BY e.id  ASC;`
     //view all by manager
    } else if (view === 2){
        param = `SELECT e.id, e.first_name, e.last_name, title AS Job_Title, salary, name AS Department_Name, 
        IFNULL(CONCAT(m.first_name, ', ', m.last_name),'NULL') AS 'Manager'
        FROM employees e
        LEFT JOIN employees m ON e.manager_id = m.id
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        ORDER BY Manager;`
    //view by department
    } else if (view === 3){
        param = `SELECT e.id, e.first_name, e.last_name, title AS Job_Title, salary, name AS Department_Name, 
        IFNULL(CONCAT(m.first_name, ', ', m.last_name),'NULL') AS 'Manager'
        FROM employees e
        LEFT JOIN employees m ON e.manager_id = m.id
        LEFT JOIN roles ON e.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        ORDER BY name;`
    }

    return con.promise().query(param)
        .then(([rows, fields]) => {
            console.log('Employees......')
            console.table(rows);
        })
        .catch(error =>{
            if (error){
                console.log('error viewing all employees: ', error)
            }
        })
};

//Get All Employees to be use to create a new employee
const getAllEmployees = () => {
    return con.promise().query(
        `SELECT id , first_name, last_name
         FROM employees`)
};

//Update Employee's manager
const updateManager = (data)=>{

    //get the Id from the employee string
    let getId = data.employee.split(".");
    let employeeId = parseInt(getId[0]);

    //define param depending on manager's Id 
    let param = [];
    if(data.manager !== 'None'){    
        // get the Id from the manager string
        let splitId = data.manager.split(".");
        let managerId = parseInt(splitId[0]);
        param = [managerId, employeeId]
    } else if(data.manager === 'None'){
        param = [null, employeeId]
    }
    return con.promise().query(
        `UPDATE employees SET manager_id = ? WHERE employees.id = ?`,
        param
        )
        .then(([rows, fields]) => {
            console.log('employee updated')
            console.log(getId[1])
        })
        .catch(error =>{
            if (error){
                console.log(`error updating employee's manager: `, error)
            }
        }) 
};

const deleteEmployee = (data)=> {
    let id = 0;
    // to get the Id from the employee string
    let getId = data.employee.split(".");
    id = parseInt(getId[0]);
    return con.promise().query(
        `DELETE FROM employees WHERE employees.id = ?`, id)
        .then(([rows, fields]) => {
            console.log(`employee ${getId[1]} deleted`)
        })
        .catch(error =>{
            if (error){
                console.log(`error deleting employee: `, error)
            }
        })
}
module.exports = { addEmployee, updateRole, displayAllEmployees, getAllEmployees, updateManager, deleteEmployee};
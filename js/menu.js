const inquirer = require('inquirer');
const { displayAllDepartments, addDepartment, getAllDepartments, deleteDep, viewBudget} = require('../js/departments');
const { displayAllRoles, addRole, getAllRoles, deleteRole } = require('../js/roles');
const { addEmployee, updateRole, displayAllEmployees, getAllEmployees, updateManager, deleteEmployee} = require('../js/employees');
const {MenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, UpdEmpRoleQuestions, updateMangerQuestions, deleteEmployeeQuestions, deleteDepQuestions, deleteRoleQuestions, viewBudgetQuestions} = require('../js/questions')
const connect = require('../db/database');


//display menu
const displayMenu =() => {
  return inquirer.prompt(MenuQuestions)
  .then((answers) => {
    if (answers.menuChoice === 'Exit'){
      con.end();
      console.log('BYE!')
      return;
    }else if (answers.menuChoice === 'View all departments') {
      console.log('\n');
      displayAllDepartments()
      .then(() => {
        console.log('\n')
        displayMenu();
      })
    } else if (answers.menuChoice === 'View all roles') {
        console.log('\n');
        displayAllRoles()
        .then(() => {
          console.log('\n')
          displayMenu();
        })
    } else if (answers.menuChoice === 'View all employees') {
      console.log('\n');
      displayAllEmployees(1)
        .then(() => {
          console.log('\n');
          displayMenu();
        })
    } else if (answers.menuChoice === 'View all employees by manager') {
      console.log('\n');
      displayAllEmployees(2)
        .then(() => {
          console.log('\n');
          displayMenu();
        })
    } else if (answers.menuChoice === 'View all employees by department') {
      console.log('\n');
      displayAllEmployees(3)
        .then(() => {
          console.log('\n');
          displayMenu();
        })
    } else if (answers.menuChoice === 'Add a department'){
        console.log('\n');
        promptAddDepartment();
    } else if (answers.menuChoice === 'Add a role'){
        getAllDepartments()
        .then(([rows, fields]) => {
          promptAddRole(rows)
        })
    } else if (answers.menuChoice === 'Add an employee'){
      getAllEmployees()
      .then(([managers, fields]) => {
        promptAddEmployee(managers)
      })
    } else if (answers.menuChoice === `Update an employee's role`){
      getAllEmployees()
      .then(([employees, fields]) => {
        promptUpdateEmployeeRole(employees)
      })
    } else if (answers.menuChoice === `Update an employee's manager`){
      getAllEmployees()
      .then(([employees, fields]) => {
        promptUpdateManager(employees)
      })
    } else if (answers.menuChoice === 'Delete department') {
      console.log('\n');
      getAllDepartments()
      .then(([departments, fields]) => {
        promptDeleteDep(departments)
      })
    } else if (answers.menuChoice === 'Delete role') {
      console.log('\n');
      getAllRoles()
      .then(([roles, fields]) => {
        promptDeleteRole(roles)
      })
    } else if (answers.menuChoice === 'Delete employee') {
      console.log('\n');
      getAllEmployees()
      .then(([employees, fields]) => {
        promptDeleteEmployee(employees)
      })
    } else if (answers.menuChoice === `View total budget utilized by department`) {
      console.log('\n');
      viewBudget()
      .then(() => {
        console.log('\n')
        displayMenu();
      })
    }
  })
};

//add a new department
const promptAddDepartment = () =>{
  inquirer.prompt(addDepartmentQuestions)
  .then((answer)=>{
    addDepartment(answer.name)
    .then(() => {
      console.log('\n')
      displayMenu();
    })
  })
  .catch(err => {
    console.log('error addind department:', err);
  })
}

//add a new role
const promptAddRole = (departments) =>{
  let questions= addRoleQuestions(departments);
  inquirer.prompt(questions)
  .then((answer)=>{
    addRole(answer)
    .then(() => {
      console.log('\n')
      displayMenu();
    })
  })
  .catch(err => {
    console.log('error adding role:', err);
  })
}

//function to add a new employee
const promptAddEmployee = (managers) =>{
  getAllRoles()
  .then(([roles, fields]) => {
    let questions= addEmployeeQuestions(roles,managers);
    inquirer.prompt(questions)
    .then((answer)=>{
      addEmployee(answer)
      .then(() => {
        console.log('\n')
        displayMenu();
      })
    })
    .catch(err => {
      console.log('error adding employee:', err);
    })
  })
}

//update employee's role
const promptUpdateEmployeeRole = (employees) =>{
  getAllRoles()
  .then(([roles, fields]) => {
    let questions= UpdEmpRoleQuestions(roles,employees);
    inquirer.prompt(questions)
    .then((answer)=>{
      updateRole(answer)
      .then(() => {
        console.log('\n')
        displayMenu();
      })
    })
    .catch(err => {
      console.log('error adding employee:', err);
    })
  })
}

//update employee's manager
const promptUpdateManager = (employees) =>{
  let questions= updateMangerQuestions(employees);
  inquirer.prompt(questions)
  .then((answer)=>{
    updateManager(answer)
    .then(() => {
      console.log('\n')
      displayMenu();
    })
  })
  .catch(err => {
    console.log('error updating manager:', err);
  })  
}

//delete department
const promptDeleteDep = (Deps) =>{
  let question= deleteDepQuestions(Deps);
  inquirer.prompt(question)
  .then((answer)=>{
    if (answer.department === 'None'){
      displayMenu();
    }else if (answer.department !== 'None'){
      deleteDep(answer)
      .then(() => {
        console.log('\n')
        displayMenu();
      })
    }
    })
  .catch(err => {
    console.log('error deleting department:', err);
  })
}

//delete role
const promptDeleteRole = (roles) =>{
  let question= deleteRoleQuestions(roles);
  inquirer.prompt(question)
  .then((answer)=>{
    if (answer.role === 'None'){
      displayMenu();
    } else if (answer.role !== 'None'){
      deleteRole(answer)
      .then(() => {
        console.log('\n')
        displayMenu();
      })
    }
  })
  .catch(err => {
    console.log('error deleting role:', err);
  })
}

//delete employee
const promptDeleteEmployee = (employees) =>{
  let question= deleteEmployeeQuestions(employees);
  inquirer.prompt(question)
  .then((answer)=>{
    if (answer.employee === 'None'){
      displayMenu();
    } else if (answer.employee !== 'None'){
      deleteEmployee(answer)
      .then(() => {
        console.log('\n')
        displayMenu();
      })
    }
  })
  .catch(err => {
    console.log('error deleting employee:', err);
  })
}

module.exports = displayMenu;

//menu questions
const MenuQuestions =  {
    type: 'list',
    name: 'menuChoice',
    message: 'What would you like to do?',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'View all employees by manager',
        'View all employees by department',
        'Add a department',
        'Add a role',
        'Add an employee',
        `Update an employee's role`,
        `Update an employee's manager`,
        `Delete department`,
        `Delete role`,
        `Delete employee`,
        `View total budget utilized by department`,
        'Exit',
    ],
};

//questions to add a new adepartment
const addDepartmentQuestions =  {
  type: 'input',
  name: 'name',
  message: "Please enter Department's name: (Required)",
  validate: nameInput => {
    if (nameInput) {
      return true;
    } else {
      console.log(`Please enter a Department's name`);
      return false;
    }
  },
};

//questions to add a new role
const addRoleQuestions = (departments)=>{
  let departmentsArr=[]; 
  departments.forEach(department =>{
    let aux = department.id +'.'+ department.name;
    departmentsArr.push(aux);
  })
  let Questions = [
  {
    type: 'input',
    name: 'title',
    message: "Please enter Role's title: (Required)",
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log(`Please enter a role's title`);
        return false;
      }
    },
  },
  {
    type: 'number',
    name: 'salary',
    message: "Please enter Role's salary: (Required)",
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log(`Please enter a role's salary`);
        return false;
      }
    }
  },
  {
   type: 'list',
    name: 'menuChoice',
    message: 'Please select the department that role belongs to:',
    choices: departmentsArr,
  },
  ];
  return Questions;
} 

//questions that add a new employee
const addEmployeeQuestions = (roles,managers)=>{
    //get info from roles and fix it to display it
    let rolesArr=[]; 
    roles.forEach(role =>{
      let aux = role.id +'.'+ role.title;
      rolesArr.push(aux);
    })
    //get info from managers and fix it to display it
    let managersArr=[]; 
    //add option NULL to the manager's array
    managersArr.push('None')
    managers.forEach(manager =>{
      let aux = manager.id +'.'+ manager.first_name +' '+ manager.last_name;
      managersArr.push(aux);
    })


    let Questions = [
    {
      type: 'input',
      name: 'firstName',
      message: "Please enter Employee's first name: (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log(`Please enter Employee's first name`);
          return false;
        }
      },
    },
    {
        type: 'input',
        name: 'lastName',
        message: "Please enter Employee's last name: (Required)",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log(`Please enter Employee's last name`);
            return false;
          }
        },
    },
    {
        type: 'list',
        name: 'role',
        message: `Please select the employee's role: `,
        choices: rolesArr,
    },
    {
        type: 'list',
         name: 'manager',
         message: `Please select the manager: `,
         choices: managersArr,
    },
    ];
    return Questions;
} 

//questions to display when updating an employee's role
const UpdEmpRoleQuestions = (roles,employees) => {
  //get info from employees and apply it to display
  let employeesArr=[]; 
  employees.forEach(employee =>{
    let aux = employee.id +'.'+ employee.first_name +' '+ employee.last_name;
    employeesArr.push(aux);
  })

  //get info from roles and apply it to display
  let rolesArr=[]; 
  roles.forEach(role =>{
    let aux = role.id +'.'+ role.title;
    rolesArr.push(aux);
  })

  // question's array
  let questions = [
    {
      type: 'list',
       name: 'employee',
       message: `Please select the employee to modify: `,
       choices: employeesArr,
    },
    {
      type: 'list',
       name: 'role',
       message: `Please select the new role: `,
       choices: rolesArr,
  },  
  ]
  return questions;
}

//create question's array to update an employee's manager
const updateMangerQuestions = (employees) => {
  //get info from employees and apply it to display 
  let employeesArr=[]; let managersArr=[]; 
  //add option NULL to the manager's array
  managersArr.push('None')
  employees.forEach(employee =>{
    let aux = employee.id +'.'+ employee.first_name +' '+ employee.last_name;
    employeesArr.push(aux);
    managersArr.push(aux);
  })
    // create question's array
  let questions = [
    {
      type: 'list',
        name: 'employee',
        message: `Please select the employee to modify: `,
        choices: employeesArr,
    },
    {
      type: 'list',
        name: 'manager',
        message: `Please select the new manager: `,
        choices: managersArr,
  },  
  ]
  return questions;
}

//delete employee's questions
const deleteEmployeeQuestions = (employees) => {
  //get info from employees and apply it to display
  let employeesArr=[]; 
  //add option NULL to the manager's array
  employeesArr.push('None')
  employees.forEach(employee =>{
    let aux = employee.id +'.'+ employee.first_name +' '+ employee.last_name;
    employeesArr.push(aux);  
  });
  // create questions array
  const question = {
    type: 'list',
    name: 'employee',
    message: `Please select the employee to delete: `,
    choices: employeesArr,
  }
  return question;
}

//question to delete a department
const deleteDepQuestions = (Deps)=> {
  //get info from employees and apply it to display
  let depsArr=[]; 
  //add option NULL to the manager's array
  depsArr.push('None')
  Deps.forEach(dep =>{
    let aux = dep.id +'.'+ dep.name;
    depsArr.push(aux);  
  });
  // create questions array
  const question = {
    type: 'list',
    name: 'department',
    message: `Please select the department to delete: `,
    choices: depsArr,
  }
  return question;
}

//question to delete a role
const deleteRoleQuestions = (roles)=> {
  //get info from employees and apply it to display 
  let rolesArr=[]; 
  rolesArr.push('None')
  roles.forEach(role =>{
    let aux = role.id +'.'+ role.title;
    rolesArr.push(aux);  
  });
  //questions array
  const question = {
    type: 'list',
    name: 'role',
    message: `Please select the role to delete: `,
    choices: rolesArr,
  }
  return question;
}

//question to View budget
const viewBudgetQuestions = (departments)=> {
  //get info from departments and apply to display it
  let departmentsArr=[]; 
  departments.forEach(department =>{
    let aux = department.id +'.'+ department.title;
    departmentsArr.push(aux);  
  });
  // create questions array
  const question = {
    type: 'list',
    name: 'department',
    message: `Please select the department to view Total Budget utilized: `,
    choices: departmentsArr,
  }
  return question;
}
module.exports = {MenuQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, UpdEmpRoleQuestions, updateMangerQuestions, deleteEmployeeQuestions, deleteDepQuestions, deleteRoleQuestions, viewBudgetQuestions}

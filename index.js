// The payroll system populates a record from an Array
// has a function called createEmployeeRecord
// createEmployeeRecord populates a firstName field from the 0th element
// populates a familyName field from the 1th element
// populates a title field from the 2th element
// populates a payPerHour field from the 3th element
// initializes a field, timeInEvents, to hold an empty Array
// initializes a field, timeOutEvents, to hold an empty Array
function createEmployeeRecord(array){
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

// process an Array of Arrays into an Array of employee records
// has a function called createEmployeeRecords
// createEmployeeRecords
// creates two records
// correctly assigns the first names
// creates more than 2 records
function createEmployeeRecords(){
    let employeeRecords;

      let twoRows = [
        ["moe", "sizlak", "barkeep", 2],
        ["bartholomew", "simpson", "scamp", 3]
      ]

     employeeRecords = twoRows.map(createEmployeeRecord)
     return (console.log(employeeRecords))

}


//it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
//has a function called createTimeInEvent
//createTimeInEvent
//creates the correct type
//extracts the correct date
//extracts the correct hour
function createTimeInEvent(employee, timeStamp){
    const[date, time] = timeStamp.split(" ")
    
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(time)
    });

    return employee;
}


//it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
// has a function called createTimeOutEvent
// createTimeOutEvent
// creates the correct type
// extracts the correct date
// extracts the correct hour
function createTimeOutEvent(employee, timeStamp){
    const[date, time] = timeStamp.split(" ")
    
    employee.timeInEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(time)
    });

    return employee;
}



//Given an employee record with a date-matched timeInEvent and timeOutEvent
//hoursWorkedOnDate calculates the hours worked when given an employee record and a date
//hoursWorkedOnDate
//calculates that the employee worked 2 hours
function hoursWorkedOnDate(employee, date){
    let timein = employee.timeInEvents.find(event => event.date === date)
    let timeout= employee.timeOutEvents.find(event => event.date === date)
    return (timeout.hour - timein.hour)/100
}



//Given an employee record with a date-matched timeInEvent and timeOutEvent
//wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
//wagesEarnedOnDate
//calculates that the employee earned 54 dollars
function wagesEarnedOnDate(employee, date){
    let hours = hoursWorkedOnDate(employee, date)
    let wage = employee.payPerHour;
    return hours * wage
}

//Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
//allWagesFor aggregates all the dates' wages and adds them together
//allWagesFor
//calculates that the employee earned 378 dollars
function allWagesFor(employee) {
    let allDates = employee.timeInEvents.map(event => event.date);
    let totalPay = allDates.reduce((accumulator, nextDate) => {
        return accumulator + wagesEarnedOnDate(employee, nextDate);
    }, 0);
    return totalPay;
}

//Given an array of multiple employees
//calculatePayroll aggregates all the dates' wages and adds them together
//calculatePayroll
//calculates that the employees earned 770 dollars
function calculatePayroll(employees) {

    let payroll = employees.reduce((accumulator, employee) => {
        return accumulator + allWagesFor(employee);
    }, 0);

    return payroll;

}

//runs payroll using the mock data provided by Ultron data systems
//Dependent functions: createEmployeeRecords
//takes CSV data, returns an array of employee records exists
//returns an Array with 2 records for Loki and Natalia
//       Full Payroll Test
//         from several imported CSV structures
//           calculatePayroll
//             30) exists
//             31) correctly sums the payroll burden to $11,880 when passed an array of employee records

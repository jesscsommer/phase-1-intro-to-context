// Your code here

function createEmployeeRecord(array) {
    const employeeObj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj;
}

function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(arr => createEmployeeRecord(arr))
}

// example time stamp "2018-01-01 2300" 

function createTimeInEvent(employeeObj, dateStamp){
    employeeObj.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeObj;
}

function createTimeOutEvent(employeeObj, dateStamp){
    employeeObj.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, date){
    let startHour = 0
    let endHour = 0
    for (let timeIn of employeeObj.timeInEvents){
      if (timeIn.date === date) {
        startHour = timeIn.hour
      }
    }
    for (let timeOut of employeeObj.timeOutEvents){
      if (timeOut.date === date) {
        endHour = timeOut.hour
      }
    }
  
    let hoursWorked = endHour-startHour 
    return hoursWorked / 100;
  }
  
  function wagesEarnedOnDate(employeeObj, date){
    const hours = hoursWorkedOnDate(employeeObj, date)
    return hours * parseInt(employeeObj['payPerHour'])
  }

  function allWagesFor(employeeObj){
    const allDatesWorked = employeeObj.timeInEvents.map(el => el.date)
    const allWages = []
    for (let date of allDatesWorked){
        allWages.push(wagesEarnedOnDate(employeeObj, date))
    }
    const sumWages = allWages.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0)
    return sumWages
  }

  function calculatePayroll(arrayOfEmployeeRecords){
    const allWagesOwed = []
    for (let employeeObj of arrayOfEmployeeRecords){
       allWagesOwed.push(allWagesFor(employeeObj))
    }
    const sumAllWagesOwed = allWagesOwed.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0)
    return sumAllWagesOwed
  }
// Project Types
export const CREATE = 'CREATE' // the project object with empty problems and notes [lastEdit=createdAt]
export const UPDATE = 'UPDATE' // updates the project title , description, startDate, deadLine and status [set lastEdit]
export const DELETE = 'DELETE' // Delete the project

// Problems todos Types
export const ADDTODO = 'ADDTODO' // add todo to the given & update project lastEdit
export const TOGGELTODO = 'TOGGELTODO' // toggel !done & update project lastEdit
export const DELETEDTODO = 'DELETETODO' // update project lastEdit

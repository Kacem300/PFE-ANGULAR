import { FileHandle } from "./file-handle.model"


export interface User {
    Role:[],
    userFirstName:string,
    userLastname:string,
    userName:string,
    userPassword:string,
    userImage: FileHandle,
    userEmail:string,
    enabled:string,
    registrationDate:Date |null,
}

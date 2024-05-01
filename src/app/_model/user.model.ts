import { FileHandle } from "./file-handle.model"

export interface User {
    Role:[],
    userFirstName:string,
    userLastname:string,
    userName:string,
    userPassword:string,
    userImage: FileHandle[],
}

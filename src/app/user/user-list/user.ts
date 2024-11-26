export interface User {
    id?:number,
    name:string,
    email:string,
    role:Role,
    status:Status
}
export enum Role{
    admin="Admin",
    user="User",
    guest="Guest",

}
export enum Status{
    active="Active",
    inActive="InActive",
 
}
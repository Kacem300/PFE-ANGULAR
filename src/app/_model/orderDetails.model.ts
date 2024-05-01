import { orderquantity } from "./orderquantity.model";

export interface orderDetails{
    fullName: string;
    fullAddress: string;
    contactNumber: string;

     orderQuantities : orderquantity[];}

import { orderquantity } from "./orderquantity.model";

export interface orderDetails{
    fullName: string;
    fullAddress: string;
    contactNumber: string;
    alternateContactNumber: string;
     orderQuantities : orderquantity[];}

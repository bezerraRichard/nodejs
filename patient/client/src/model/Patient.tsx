
export class Patient {

    
    id?: any;
   
    firstName?: string;
  
    lastName?: string;

    age?: number;

    constructor(id?:any,firstName?:string,lastName?:string,age?:number){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;

    }

}
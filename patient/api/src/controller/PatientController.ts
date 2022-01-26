import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Patient} from "../entity/Patient";
import HttpException from "../exceptions/HttpException";

export class PatientController {

    private patientRepository = getRepository(Patient,'default');

    
    async all(request: Request, response: Response, next: NextFunction) {
        
        try {
            return await this.patientRepository.find();
        } catch (e) {
            return new HttpException(500,e.message);;
        }
       
    }

    async one(request: Request, response: Response, next: NextFunction) {
         try {
            return await this.patientRepository.findOne(request.params.id);
        } catch (e) {
            return new HttpException(500,e.message);;
        }
        
    }

    async save(request: Request, response: Response, next: NextFunction) {

        try {
            return await this.patientRepository.save(request.body);
        } catch (e) {
            return new HttpException(500,e.message);;
        }
        
    }

    async update(request: Request, response: Response, next: NextFunction) {
 
        try {
            await this.patientRepository.update(request.params.id,request.body)
            return request.body

        } catch (e) {
            return new HttpException(500,e.message);;
        }

    }

    async remove(request: Request, response: Response, next: NextFunction) {
         try {
             let patientToRemove = await this.patientRepository.findOne(request.params.id);
            return await this.patientRepository.remove(patientToRemove);
        } catch (e) {
            return new HttpException(500,e.message);;
        }

    }

}
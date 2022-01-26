import axios from'axios';
import { Patient } from '../model/Patient';

export default class PatientService {
    baseUrl="http://localhost:3000/patients";

    async all() {
        try {
            const response = await axios.get(`${this.baseUrl}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async one(id:any){
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async save(data:Patient) {
         try {
            const response = await axios.post(`${this.baseUrl}`,data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

 async update(id:any,data:Patient) {
         try {
            const response = await axios.put(`${this.baseUrl}/${id}`,data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }    

    async remove(id:any) {
        try {
            const response = await axios.delete(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
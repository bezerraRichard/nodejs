
import { PatientController } from "./PatientController";

import {createConnection} from "typeorm";

// describe("PatientController", () => {

//   const patientRepository = (typeorm as any).getRepository.mockReturnValue({
//           find: () => Promise.resolve(undefined),
//           findOne: (id?: string | number | Date | ObjectID) => Promise.resolve(undefined),
//           save: (entity: any) => Promise.resolve(),
//           delete: (id?: string | number | Date | ObjectID) => Promise.resolve(),
//         });

//   describe("all", () => {
//     test("should return empty array", async () => {
//       const spy = jest
//         .spyOn(patientRepository, "find")
//         .mockResolvedValueOnce([]);
//       const controller = new PatientController();
//       const users = await controller.all;
//       expect(users).toEqual([]);
//       expect(spy).toHaveBeenCalledWith();
//       expect(spy).toHaveBeenCalledTimes(1);
//     });

//     // test("should return user list", async () => {
//     //   const patientsData = generateUsersData(2);
//     //   const spy = jest
//     //     .spyOn(patientRepository, "find")
//     //     .mockResolvedValueOnce(patientsData);
//     //   const controller = new PatientController();
//     //   const patients = await controller.all;
//     //   expect(patients).toEqual(patients);
//     //   expect(spy).toHaveBeenCalledWith();
//     //   expect(spy).toHaveBeenCalledTimes(1);
//     // });
//   });
// });



import { NextFunction, Request, Response } from "express";



describe('Get all users request', () => {

 
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext:Partial<NextFunction>;
    let responseObject = {};

    beforeEach(() => {
        
        mockRequest = {
            statusCode: 0,
        };
        mockResponse = {
            statusCode: 0,
            send: jest.fn().mockImplementation((result) => {
                responseObject = result;
            })
        };
    });
    test('Get alls Patients', async () => {
        createConnection().then(async connection => {
       mockRequest = {
            ...mockRequest
        };

        const expectedStatusCode = 200;
        const expectedResponseObject = { user: { fistName: "David", age: "123" } };
        const patientController=new PatientController();
        patientController.all(mockRequest as Request, mockResponse as Response,mockNext as NextFunction);

        expect(mockResponse.statusCode).toBe(expectedStatusCode);
        expect(responseObject).toEqual(expectedResponseObject);
        }).catch(error => console.log(error));
    });
    
});
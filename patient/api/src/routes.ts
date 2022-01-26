import {PatientController} from "./controller/PatientController";

export const Routes = [{
    method: "get",
    route: "/patients",
    controller: PatientController,
    action: "all"
}, {
    method: "get",
    route: "/patients/:id",
    controller: PatientController,
    action: "one"
}, {
    method: "post",
    route: "/patients",
    controller: PatientController,
    action: "save"
}, {
    method: "put",
    route: "/patients/:id",
    controller: PatientController,
    action: "update"
}, {
    method: "delete",
    route: "/patients/:id",
    controller: PatientController,
    action: "remove"
}];
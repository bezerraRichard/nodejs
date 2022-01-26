import React, { useEffect, useRef, useState } from "react";
import {Button} from"primereact/button";
import {Toast} from"primereact/toast";
import {Toolbar} from"primereact/toolbar";
import {Column} from"primereact/column";
import {DataTable} from"primereact/datatable";
import {Dialog} from"primereact/dialog";
import {Card} from"primereact/card";
import {InputText} from"primereact/inputtext";
import { classNames } from 'primereact/utils';
import PatientService from "../../../services/PatientService";
import {useForm,Controller} from 'react-hook-form';
import { Patient } from "../../../model/Patient";

export interface EditProps{
    id:string
    visible:boolean;
    onHide:()=>void;
}
const Edit:React.FC<EditProps>=(props)=>{

    const formRef=useRef<HTMLFormElement>(null);
    const toast = useRef<any>(null);

    const methods=useForm<Patient>({
        defaultValues:new Patient('','','',0)
    });
        
    const patientService = new PatientService();

    const submit = (patient:Patient) => {
        patientService.update(props.id,patient)
        .then((response)=>{
            if(response)
              toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Patient updated', life: 3000 });
              props.onHide();
              methods.reset(new Patient('','','',0));
        })
        .catch();
    };

    const patientDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={props.onHide} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={()=>{
                formRef.current?.requestSubmit();
            }} />
        </>
    );
    
    
    useEffect(() => {
         patientService.one(props.id).then((item)=>{
             methods.reset(item);
         })
    }, [props.id]);

    return <>
            <Toast ref={toast} />
            <Dialog visible={props.visible} style={{ width: '450px' }} header="Patient Detail" modal className="p-fluid" footer={patientDialogFooter} onHide={props.onHide}> 
            <Card>
             <form
             key={1}
             onSubmit={methods.handleSubmit(submit)}
             ref={formRef}
             className="p-fluid"
             >
                  <div className="field">
                            <span className="p-float-label">
                                <Controller name="firstName" control={methods.control} rules={{ required: 'First Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="firstName" className={classNames({ 'p-error': methods.formState.errors.firstName })}>First Name*</label>
                            </span>
                            {methods.formState.errors.firstName && <small className="p-error">First name is required</small>}
                        </div>
                         <br/>
                         <br/>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="lastName" control={methods.control} rules={{ required: 'Last Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="lastName" className={classNames({ 'p-error': methods.formState.errors.lastName })}>Last Name*</label>
                            </span>
                            {methods.formState.errors.firstName && <small className="p-error">Last name is required</small>}
                        </div>
                          <br/>
                          <br/>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="age" control={methods.control} rules={{ required: 'Age is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="lastName" className={classNames({ 'p-error': methods.formState.errors.age })}>Age*</label>
                            </span>
                            {methods.formState.errors.age && <small className="p-error">Age is required</small>}
                        </div>
                        

             </form>
            </Card>
            </Dialog>
    </>
}

export default Edit;
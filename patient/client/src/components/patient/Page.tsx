import React, { useEffect, useRef, useState } from "react";
import {Button} from"primereact/button";
import {Toast} from"primereact/toast";
import {Toolbar} from"primereact/toolbar";
import {Column} from"primereact/column";
import {InputText} from"primereact/inputtext";
import {DataTable} from"primereact/datatable";
import {Dialog} from"primereact/dialog";
import {Card} from"primereact/card";
import PatientService from "../../services/PatientService";
import Add from "./add/Add";
import Edit from "./edit/Edit";
import { Patient } from "../../model/Patient";


const Page:React.FC=()=>{
    let emptyPatient = new Patient();
    const toast = useRef<any>(null);
    const dt = useRef(null);

    const [patients, setPatients] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [patient, setPatient] = useState(emptyPatient);
    const [patientDialog, setPatientDialog] = useState(false);
    const [patientDialogEdit, setPatientDialogEdit] = useState(false);
    const [deletePatientDialog, setDeletePatientDialog] = useState(false);
    const [deletePatientsDialog, setDeletePatientsDialog] = useState(false);
    const patientService = new PatientService();

    const hideDialog = () => {
        
        setPatientDialog(false);
        patientService.all().then(data => setPatients(data));
        setPatient(emptyPatient);
    }

    const openNew = () => {
        setPatient(emptyPatient);
        setPatientDialog(true);
    }

    const editShowPatient = (patient:Patient) => {
        setPatient({...patient});
        setPatientDialogEdit(true);
    }
    
    const editHidPatient = () => {
        
        setPatientDialogEdit(false);
        patientService.all().then(data => setPatients(data));
        setPatient(emptyPatient);
    }
    

    const confirmDeletePatient = (patient:Patient) => {
        setPatient(patient);
        setDeletePatientDialog(true);
    }


    const confirmDeleteSelected = () => {
        setDeletePatientDialog(true);
    }
    
    const hideDeletePatientDialog = () => {
        setDeletePatientDialog(false);
        setPatient(emptyPatient);
    }
    
    const deletePatient = () => {
        patientService.remove(patient.id)
        .then((response)=>{
                if(response) 
                patientService.all().then(data => setPatients(data));
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Patient Deleted', life: 3000 });       
        }).catch((error)=>{
                toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Patient Deleted', life: 3000 });
        })
        hideDeletePatientDialog()
    }

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            </>
        )
    }

    const actionBodyTemplate = (rowData:Patient) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editShowPatient(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletePatient(rowData)} />
            </>
        );
    }
    
    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Patients</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );
    
    const deletePatientDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeletePatientDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletePatient} />
        </>
    );
   
    
    useEffect(() => {
        patientService.all().then(data => setPatients(data));
    }, []);


    return <>
 <Card>
    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>
    <Toast ref={toast} />
    <DataTable ref={dt} 
                    value={patients} 
                    selection={selectedPatients} onSelectionChange={(e) => setSelectedPatients(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} 
                    header={header} 
                    responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    {/* <Column field="id" header="Id" sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column field="firstName" header="FisrtName" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="lastName" header="LastName" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="age" header="Age" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>

            <Add visible={patientDialog}  onHide={hideDialog}/>
            {patient?.id &&
            <Edit id={patient.id} visible={patientDialogEdit}  onHide={editHidPatient}/>
            }
            <Dialog visible={deletePatientDialog} style={{ width: '450px' }} header="Confirm" modal footer={deletePatientDialogFooter} onHide={hideDeletePatientDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {patient && <span>Are you sure you want to delete <b>{patient.firstName}</b>?</span>}
                </div>
            </Dialog>

           
                </Card>
    </>
}

export default Page;
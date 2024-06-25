import { apiConfig } from '../config/api.config';
import type { CreateAxiosDefaults } from 'axios';
import { EntityService } from '../superclasses/entity-service';
import type { Patient } from '@/interfaces/patient';


export class PatientService extends EntityService<Patient> {
  constructor(url: string, config: CreateAxiosDefaults) {
    super(url, config);
  }

  public getPatientById = async (id: number): Promise<Patient> => {
    const response = await this.getById(id);
    return this.getResponse(response);
  };

  public getListofPatients = async (): Promise<Patient[]> => {
    const response = await this.getArray();
    return this.getResponse(response);
  };

  public updatePatient = async(patient: Patient): Promise<Patient> => {
    const response = await this.post<Patient>(`/${patient.id}`, patient);
    return this.getResponse(response);
  };
}

export const patientService = new PatientService('Member', {...apiConfig});
import type { PatientStatus } from '@/util/enums/patient-status';

export interface Patient {
  id: number;
  name: string;
  joinDate: string;
  status: PatientStatus,
  weight?: number,
  height?: number,
  address: string,
  phoneNumber?: string,
}
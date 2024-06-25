import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Patient } from '@/interfaces/patient';
import { patientService } from '@/services/restapi/patient-service';
import { preserve } from './store-utils';

export const usePatientStore = defineStore('patient-store', () => {
  const patientsData = ref<Patient[] | null>(null);
  const patientsPromise = ref<Promise<Patient[]> | null>(null);

  const patients = computed((): Patient[] => {
    return patientsData.value ?? [];
  });

  const setPatients = async (patients: Patient[]) => {
    patientsData.value = patients;
  };

  const updatePatient = async (patient: Patient) => {
    const index = patientsData.value?.findIndex(p => p.id === patient.id);
    console.log(index);
    if (index && patientsData.value) {
      patientsData.value[index] = patient;
    }
  };

  const fetchPatients = async() => {
    return patientsData.value ?? preserve(
      patientsPromise.value,
      patientService.getListofPatients,
      setPatients,
    );
  };

  return { patients, fetchPatients, updatePatient };
});
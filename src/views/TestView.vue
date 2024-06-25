<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { ColorVariants } from '@/util/enums/color-variants';
import { Modal } from 'bootstrap';
import type { Patient } from '@/interfaces/patient';
import { patientService } from '@/services/restapi/patient-service';
import { PatientStatus } from '@/util/enums/patient-status';
import { timeout } from '@/util/global-functions';
import { usePatientStore } from '@/stores/patient-store';

// Stores

const patientStore = usePatientStore();

// Hooks

onMounted(() => {
  patientStore.fetchPatients();
  sortBy.value = sortingOptions[0][0];
});

// Non-reactive constants

const sortingOptions: [string, (a: Patient, b: Patient) => number][] = [
  [ 'ID', (a, b) => a.id - b.id],
  [ 'Name', (a, b) => a.name < b.name ? -1 : 1],
  [ 'Join Date', (a, b) => new Date(a.joinDate) < new Date(b.joinDate) ? -1 : 1],
  [ 'Status', (a, b) => a.status < b.status ? -1 : 1],
];

// Refenrences

const selectedPatient = ref<Patient | null>();
const viewType = ref<string>('Card');
const sortBy = ref<string>('ID');
const orderBy = ref<'ASC'|'DESC'>('ASC');
const search = ref<string>('');
const message = ref<{message: string, type: ColorVariants} |null>();

// Computed properties

const sortingMethod = computed(() => {
  let method: (a: Patient, b: Patient) => number;

  for (const [sortName, sortMethod] of sortingOptions) {
    if (sortBy.value === sortName) {
      method = sortMethod;
      break;
    }
  }
  return (a: Patient, b: Patient) => orderBy.value === 'ASC' ? method(a, b) : method(b, a);
});

const patients = computed(() => {
  return [...patientStore.patients]
    .filter(patient => !search.value || patient.name.toLowerCase().includes(search.value.toLowerCase()))
    .sort(sortingMethod.value);
});

const patientStatusValues = computed(() => {
  return Object.keys(PatientStatus).filter(key => !isNaN(Number(key))).map(s => Number(s));
});


// Functions

const transitionClasses = (patient: Patient) => {
  return [
    'transition-expand',
    selectedPatient.value?.id === patient.id ? 'open' : 'closed',
  ];
};

const setSelectedPatient = (patient: Patient) => {
  if (patient.id === selectedPatient.value?.id) {
    selectedPatient.value = null;
    return;
  }
  patientService.getPatientById(patient.id).then((patient) => {
    selectedPatient.value = {...patient};
  });
};

const phoneChanged = (formattedNumber: string) => {
  if (selectedPatient.value) {
    selectedPatient.value.phoneNumber = formattedNumber;
  }
};

const persistPatient = async () => {
  console.log('updating');
  if (selectedPatient.value) {
    patientService.updatePatient(selectedPatient.value).then((patient) => {
      message.value = {
        message: 'The patient was succesfully updated',
        type: ColorVariants.SUCCESS,
      };
      // Here, I would have made a new call to get updated patients, if DB was actually updated
      setSelectedPatient(patient);
      // patientStore.updatePatient(patient);
      hideModal();
    }).catch(error => {
      message.value = {
        message: `Something went wrong! Please contact support. StatusCode: ${error as number}`,
        type: ColorVariants.DANGER,
      };
      console.log(error);
    }).finally(() => {
      timeout(5000).then(() => {
        message.value = null;
      });
    });
  }
};

// Hiding modal manually.
const hideModal = () => {
  const element = document.getElementById('patient-modal');
  if (element) {
    const modal = Modal.getInstance(element);
    if (modal) {
      modal.hide();
    }
  }
};
</script>

<template>
  <div class="test-view">
    <div>
      <h1>Patiro Test Project</h1>

      <BaseAlert
        v-if="message"
        :variant="message.type"
      >
        {{ message.message }}
      </BaseAlert>

      <div class="row justify-content-between py-2">
        <div class="col-auto">
          <BaseInputSelect
            v-model="viewType"
            :options="['Card', 'List']"
          />
        </div>
        <div class="col-auto">
          <div class="row align-items-center">
            <div class="col-auto">
              <BaseInputField
                v-model="search"
                placeholder="Search names..."
              />
            </div>
            <div class="col-auto">
              <BaseInputDropdown
                id="sortDropdown"
                v-model="sortBy"
                :options="sortingOptions.map((o) => o[0])"
              />
            </div>
            <div class="col-auto">
              <BaseInputSelect
                v-model="orderBy"
                :options="['ASC', 'DESC']"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="viewType === 'Card'"
        class="row g-2"
      >
        <div
          v-for="patient in patients"
          :key="patient.id"
          class="col-12"
        >
          <div class="card">
            <div
              class="card-body hoverable"
              @click="setSelectedPatient(patient)"
            >
              <div class="row">
                <div class="col-6 col-md-3">
                  <label>ID</label>
                  <p>{{ patient.id }}</p>
                </div>
                <div class="col-6 col-md-3">
                  <label>Name</label>
                  <p>{{ patient.name }}</p>
                </div>
                <div class="col-6 col-md-3">
                  <label>Join Date</label>
                  <p>{{ new Date(patient.joinDate).toLocaleString() }}</p>
                </div>
                <div class="col-6 col-md-3">
                  <label>Status</label>
                  <p>{{ PatientStatus[patient.status] }}</p>
                </div>
              </div>
              <div :class="transitionClasses(patient)">
                <div
                  v-if="selectedPatient?.id === patient.id"
                  class="row"
                >
                  <div class="col-6 col-md-3">
                    <label>weight</label>
                    <p>{{ selectedPatient.weight }}</p>
                  </div>
                  <div class="col-6 col-md-3">
                    <label>height</label>
                    <p>{{ selectedPatient.height }}</p>
                  </div>
                  <div class="col-6 col-md-3">
                    <label>Address</label>
                    <p>{{ selectedPatient.address }}</p>
                  </div>
                  <div class="col-6 col-md-3">
                    <label>Phone</label>
                    <p>{{ selectedPatient.phoneNumber }}</p>
                  </div>
                  <div class="col-12">
                    <div class="d-flex justify-content-center">
                      <BaseButton
                        bs-toggle="modal"
                        bs-target="#patient-modal"
                      >
                        Edit
                      </BaseButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="viewType === 'List'"
        class="row g4"
      >
        <div class="col-6">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">
                  ID
                </th>
                <th>Name</th>
                <th class="d-none d-sm-table-cell">
                  Join Date
                </th>
                <th class="d-none d-md-table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="patient in patients"
                :key="patient.id"
                class="clickable"
                @click="setSelectedPatient(patient)"
              >
                <th scope="row">
                  {{ patient.id }}
                </th>
                <td>{{ patient.name }}</td>
                <td class="d-none d-sm-table-cell">
                  {{ new Date(patient.joinDate).toLocaleString() }}
                </td>
                <td class="d-none d-md-table-cell">
                  {{ PatientStatus[patient.status] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h2>Patient info</h2>
              <div v-if="selectedPatient">
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <label>ID</label>
                        <div class="d-md-none">
                          {{ selectedPatient.id }}
                        </div>
                      </td>
                      <td class="d-none d-md-table-cell">
                        {{ selectedPatient.id }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Name</label>
                        <div class="d-md-none">
                          {{ selectedPatient.name }}
                        </div>
                      </td>
                      <td class="d-none d-md-table-cell">
                        {{ selectedPatient.name }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Join Date</label>
                        <div class="d-md-none">
                          {{ new Date(selectedPatient.joinDate).toLocaleString() }}
                        </div>
                      </td>
                      <td class="d-none d-md-table-cell">
                        {{ new Date(selectedPatient.joinDate).toLocaleString() }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Status</label>
                        <div class="d-md-none">
                          {{ PatientStatus[selectedPatient.status] }}
                        </div>
                      </td>
                      <td class="d-none d-md-table-cell">
                        {{ PatientStatus[selectedPatient.status] }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Weight</label>
                        <div class="d-md-none">
                          {{ selectedPatient.weight }}
                        </div>
                      </td>
                      <td class="d-none d-md-table-cell">
                        {{ selectedPatient.weight }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Height</label>
                        <div class="d-md-none">
                          {{ selectedPatient.height }}
                        </div>
                      </td>
                      <td class="d-none d-md-table-cell">
                        {{ selectedPatient.height }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Address</label>
                        <div class="d-md-none">
                          {{ selectedPatient.address }}
                        </div>
                      </td>
                      <td class="d-none d-md-table-cell">
                        {{ selectedPatient.address }}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Phone</label>
                        <div class="d-md-none">
                          {{ selectedPatient.phoneNumber }}
                        </div>
                      </td>
                      <td class="d-none d-md-table-cell">
                        {{ selectedPatient.phoneNumber }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="d-flex justify-content-end">
                  <BaseButton
                    bs-toggle="modal"
                    bs-target="#patient-modal"
                  >
                    Edit
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BaseModal
      modal-id="patient-modal"
      :title="`Edit patient: ${selectedPatient?.id}`"
    >
      <BaseForm>
        <div
          v-if="selectedPatient"
          class="row gy-3 gx-5"
        >
          <BaseInputField
            v-model="selectedPatient.name"
            class="col-12"
            label="Name"
            placeholder="Input name here..."
          />
          <div class="col-12">
            <label>Status</label>
            <BaseInputRadio
              v-for="option in patientStatusValues"
              :id="`radio-${option}`"
              :key="option"
              v-model="selectedPatient.status"
              :radio-value="option"
              :label="PatientStatus[option]"
            />
          </div>

          <BaseInputPhone
            class="col-12"
            label="Phone"
            :init-number="selectedPatient.phoneNumber"
            @formatted="phoneChanged"
          />
          <BaseInputField
            v-model="selectedPatient.address"
            class="col-12"
            label="Address"
            placeholder="Input address here..."
          />
        </div>
        <template #button>
          <div class="d-flex justify-content-end">
            <BaseButton :on-click-cb="persistPatient">
              Confirm
            </BaseButton>
          </div>
        </template>
      </BaseForm>
    </BaseModal>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/bootstrap-variables.scss';
.hoverable:hover {
  background-color: $secondary-25;
}
</style>

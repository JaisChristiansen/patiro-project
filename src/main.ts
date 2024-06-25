
import './assets/main.css';

import 'bootstrap';
import 'vue-tel-input/vue-tel-input.css';
// import { addIconsToLibrary } from './util/fontawesome-import';
import App from './App.vue';
import BaseAlert from './components/containers/BaseAlert.vue';
import BaseButton from './components/buttons/BaseButton.vue';
import BaseButtonIcon from './components/buttons/BaseButtonIcon.vue';
import BaseForm from './components/forms/BaseForm.vue';
import BaseInputCheckbox from './components/input/BaseInputCheckbox.vue';
import BaseInputDropdown from './components/input/BaseInputDropdown.vue';
import BaseInputField from './components/input/BaseInputField.vue';
import BaseInputPhone from './components/input/BaseInputPhone.vue';
import BaseInputRadio from './components/input/BaseInputRadio.vue';
import BaseInputSelect from './components/input/BaseInputSelect.vue';
import BaseInputTags from './components/input/BaseInputTags.vue';
import BaseInputTextArea from './components/input/BaseInputTextArea.vue';
import BaseModal from './components/modals/BaseModal.vue';
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';

const app = createSSRApp(App);

// addIconsToLibrary();


app.use(createPinia());
app.use(router);

// app.component('FontAwesomeIcon', FontAwesomeIcon);


app.component('BaseAlert', BaseAlert);
app.component('BaseButton', BaseButton);
app.component('BaseButtonIcon', BaseButtonIcon),
app.component('BaseForm', BaseForm);
app.component('BaseInputCheckbox', BaseInputCheckbox);
app.component('BaseInputDropdown', BaseInputDropdown);
app.component('BaseInputField', BaseInputField);
app.component('BaseInputPhone', BaseInputPhone);
app.component('BaseInputRadio', BaseInputRadio);
app.component('BaseInputSelect', BaseInputSelect);
app.component('BaseInputTags', BaseInputTags);
app.component('BaseInputTextArea', BaseInputTextArea);
app.component('BaseModal', BaseModal);

app.mount('#app');

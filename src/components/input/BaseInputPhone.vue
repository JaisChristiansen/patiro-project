<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import  { VueTelInput, type VueTelInputProps } from 'vue-tel-input';

// PROPS

interface Props {
  initCallingCode?: number,
  defaultCountry?: string,
  disabled?: boolean,
  invalidText?: string,
  label?: string,
  initNumber: string | undefined,
  preferredCountries?: string[],
  required?: boolean,
  validator?: (val: string | undefined) => boolean,
}

const props = withDefaults(defineProps<Props>(), {
  initCallingCode: 45,
  defaultCountry: 'dk',
  disabled: false,
  required: true,
});

// REFS

const input = ref<string>('');
const valid = ref(false);
const isValidated = ref(false);

// EMITS
const emit = defineEmits<{
  nationalNumber: [nationalNumber: string],
  countryCallingCode: [callingCode: string],
  number: [number: string],
  formatted: [formattedNumber: string],
  countryChange: [countryChange: number],
}>();
// const emit = defineEmits(['nationalNumber', 'countryCallingCode', 'number', 'formatted', 'countryChange']);

// LIFECYCLE HOOKS

onMounted(() => {
  if (props.initNumber) {
    input.value = props.initNumber;
  }
});

// COMPUTED PROPERTIES
const inputProperties = computed(() => {
  return {
    disabled: props.disabled,
    required: props.required,
    defaultCountry: props.defaultCountry,
    styleClasses: inputStyleClasses.value,
    inputOptions: {
      showDialCode: true,
    },
  };
});

const inputStyleClasses = computed<string>(() => {
  let styleClasses = 'form-control rounded text-dark tel-border';
  if (isValidated.value) {
    styleClasses += valid.value ? ' is-valid' : 'is-invalid';
  }
  return styleClasses;
});

// FUNCTIONS
const countryChanged = (countryObject: any) => {
  emit('countryChange', +(countryObject.dialcode as string));
};

const phoneInput = (number: string, phoneOutput: any) => {
  valid.value = phoneOutput.valid;

  emit('nationalNumber', phoneOutput.nationalNumber);
  emit('countryCallingCode', phoneOutput.countryCallingCode);
  emit('number', phoneOutput.number);
  emit('formatted', phoneOutput.formatted as string);
};

const validate = (): boolean => {
  if (props.validator) {
    valid.value = valid.value && props.validator(input.value);
  }

  isValidated.value = true;
  return valid.value;
};
</script>


<template>
  <div class="input-phone">
    <label v-if="label">
      {{ label }}
    </label>
    <VueTelInput
      v-model="input"
      auto-format
      :preferred-countries="preferredCountries"
      :valid-characters-only="true"
      v-bind="inputProperties"
      @on-input="phoneInput"
    />
    <div
      v-if="invalidText"
      :class="{ 'd-block': isValidated && !valid }"
      class="invalid-feedback"
    >
      <BaseAlert
        type="danger"
        padding-y="1"
      >
        {{ invalidText }}
      </BaseAlert>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tel-border {
  border-color: #dee2e6;
}
</style>
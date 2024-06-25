<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

// PROPS
interface Props {
  disabled?: boolean,
  inputGroupTextAfter?: string,
  inputGroupTextBefore?: string,
  invalidText?: string,
  label?: string,
  liveValidate?: 'always' | 'never' | 'onlyOnValid' | 'onlyOnInvalid',
  placeholder?: string,
  required?: boolean,
  rows?: number,
  skipNormalValidation?: boolean,
  modelValue: string | undefined // vmodel
  validator?: ((val: string | undefined) => boolean),
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  liveValidate: 'never',
  required: false,
  rows: 3,
  skipNormalValidation: false,
  type: 'text',
});

// REFS
const input = ref<HTMLTextAreaElement | undefined>(undefined);

// EMITS
const emit = defineEmits(['update:modelValue']);

// LIFECYCLE HOOKS

onMounted(() => {
  input.value?.focus();
});

// COMPUTED PROPERTIES
const value = computed({
  get(): string | undefined {
    return props.modelValue;
  },
  set(text: string | undefined) {
    if (text) {
      text = text.trim();
    }
    emit('update:modelValue', text);

    const isValid = isInputValid(text);

    if (props.liveValidate === 'always') {
      setValidClass(isValid);
    } else if (props.liveValidate === 'onlyOnValid') {
      setValidClass(isValid ? true : undefined);
    } else if (props.liveValidate === 'onlyOnInvalid') {
      setValidClass(!isValid ? false : undefined);
    }
  },
});

// FUNCTIONS
const isInputValid = (text: string | undefined): boolean => {
  let isValid = true;
  isValid = validateText(text);

  if (props.validator) {
    isValid = isValid && props.validator(value.value);
  }

  return isValid;
};

const setValidClass = (isValid: boolean | undefined) => {
  if (isValid != undefined) {
    input.value?.classList.add(isValid ? 'is-valid' : 'is-invalid');
    input.value?.classList.remove(isValid ? 'is-invalid' : 'is-valid');
  } else {
    input.value?.classList.remove('is-valid');
    input.value?.classList.remove('is-invalid');
  }
};

const validate = (): boolean => {
  const isValid = isInputValid(value.value);
  setValidClass(isValid);
  return isValid;
};



const validateText = (text: string | undefined): boolean => {
  let isValid = !props.required || (!!text && text.length > 0);
  return isValid;
};

</script>


<template>
  <div class="base-input-field">
    <label v-if="label">
      {{ label }}
    </label>
    <div class="input-group has-validation">
      <span
        v-if="inputGroupTextBefore"
        class="input-group-text"
      >
        {{ inputGroupTextBefore }}
      </span>
      <textarea
        ref="input"
        v-model="value"
        class="form-control"
        :placeholder="placeholder"
        :aria-label="placeholder"
        :required="required"
        :disabled="disabled"
        :rows="rows"
      />
      <span
        v-if="inputGroupTextAfter"
        class="input-group-text"
      >
        {{ inputGroupTextAfter }}
      </span>
      <div
        v-if="invalidText"
        class="invalid-feedback"
      >
        <BaseAlert
          variant="danger"
          padding-y="1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
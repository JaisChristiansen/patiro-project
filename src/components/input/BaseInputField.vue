<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { stringUtils } from '@/util/string-utils';

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
  skipNormalValidation?: boolean,
  modelValue: string | undefined // vmodel
  type?: 'number' | 'password' | 'email' | 'text',
  validator?: ((val: string | undefined) => boolean),
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  liveValidate: 'never',
  required: false,
  skipNormalValidation: false,
  type: 'text',
  validator: undefined,
});

// REFS

const input = ref<HTMLInputElement | undefined>(undefined);

// EMITS

const emit = defineEmits(['update:modelValue']);

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
  if (props.type === 'number') {
    isValid = validateNumber(text);
  } else if (props.type === 'password') {
    isValid = validatePassword(text);
  } else if (props.type === 'email') {
    isValid = validateEmail(text);
  } else {
    isValid = validateText(text);
  }

  if (props.validator) {
    isValid = isValid && props.validator(text);
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

const validateEmail = (text: string | undefined): boolean => {
  let isValid = true;
  if (props.required || (!!text && text.length > 0)) {
    const format = /^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/;
    isValid = isValid && format.test(text as string);
    isValid = props.skipNormalValidation || isValid;
  }
  return isValid;
};

const validateNumber = (text: string | undefined): boolean => {
  return stringUtils.isNumeric(text, props.required);
};

const validateText = (text: string | undefined): boolean => {
  let isValid = !props.required || (!!text && text.length > 0);
  return isValid;
};

const validatePassword = (text: string | undefined): boolean => {
  let isValid = !props.required || (!!text && text.length > 0);
  if (!props.skipNormalValidation) {
    isValid = isValid && !!text && text.length >= 8;
  }
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
      <input
        ref="input"
        v-model="value"
        :type="type"
        class="form-control"
        :placeholder="placeholder"
        :aria-label="placeholder"
        :required="required"
        :disabled="disabled"
      >
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
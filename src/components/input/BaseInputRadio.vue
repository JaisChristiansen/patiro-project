<script setup lang="ts">
import { computed } from 'vue';

// PROPS
interface Props {
  disabled?: boolean,
  id: string,
  label?: string,
  onClick?: (value?: boolean) => void;
  radioValue: any
  modelValue: any, // vmodel
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

// EMITS
const emit = defineEmits(['update:modelValue']);

// COMPUTED PROPERTIES
const value = computed({
  get(): any {
    return props.modelValue;
  },
  set(selected: any) {
    emit('update:modelValue', selected);
    if (props.onClick) {
      props.onClick(selected);
    }
  },
});

</script>


<template>
  <div class="base-input-checkbox">
    <input
      :id="id"
      v-model="value"
      class="form-check-input"
      type="radio"
      :value="radioValue"
      :disabled="disabled"
    >
    <label
      class="form-check-label fw-normal ms-1"
      :for="id"
    >
      {{ label ?? radioValue }}
    </label>
  </div>
</template>

<style scoped lang="scss"></style>
<script setup lang="ts">
import { computed } from 'vue';

// PROPS
interface Props {
  disabled?: boolean,
  id: string,
  onClick?: (value?: boolean) => void;
  modelValue: boolean, // vmodel
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

// EMITS
const emit = defineEmits(['update:modelValue']);

// COMPUTED PROPERTIES
const selected = computed({
  get(): boolean {
    console.log(`getting selected: ${props.modelValue}`);
    return props.modelValue;
  },
  set(selected: boolean) {
    console.log(`setting value to ${selected}`);
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
      v-model="selected"
      class="form-check-input"
      type="checkbox"
      value=""
      :disabled="disabled"
    >
    <label
      class="form-check-label fw-normal ms-1"
      :for="id"
    >
      <slot>
        Missing Text
      </slot>
    </label>
  </div>
</template>

<style scoped lang="scss"></style>
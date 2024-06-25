<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { ColorVariants } from '@/util/enums/color-variants';

// PROPS
interface Props {
  buttonPaddingX?: '1' |'2' | '3' | '4',
  buttonPaddingY?: '1' | '2' | '3' | '4',
  disabled?: boolean,
  labelClass?: string[],
  modelValue: string | string[], // vmodel
  options?: string[],
  variant?: ColorVariants,
}

const props = withDefaults(defineProps<Props>(), {
  buttonPaddingX: '3',
  buttonPaddingY: '2',
  disabled: false,
  variant: ColorVariants.PRIMARY,
  labelClass: () => [],
});

const slots = useSlots();

// EMITS
const emit = defineEmits(['update:modelValue']);

// COMPUTED PROPERTIES
const multiSelect = computed<boolean>(() => {
  return props.modelValue.constructor.name === 'Array';
});

const optionsValues = computed<string[]>(() => {
  return props.options ?? Object.keys(slots);
});

// FUNCTIONS
const isChecked = (val: string) => {
  if (props.disabled) {
    return;
  }

  if (!multiSelect.value) {
    return val == props.modelValue;
  } else {
    return (props.modelValue as string[]).some(value => value === val);
  }
};

const clicked = (val: string) => {
  if (props.disabled) {
    return;
  }

  if (!multiSelect.value) {
    emit('update:modelValue', val);
  } else if ((props.modelValue as string[]).some(value => value === val)) {
    emit('update:modelValue', (props.modelValue as string[]).filter(value => value !== val));
  } else {
    emit('update:modelValue', [...props.modelValue as string[], val]);
  }
};
</script>

<template>
  <div class="base-input-select">
    <div class="selector btn-group">
      <label
        v-for="option in optionsValues"
        :id="`selector-label-${option}`"
        :key="option"
        class="selector-input"
        :class="[
          isChecked(option) ? 'is-checked' : '',
          'btn',
          disabled ? `btn-outline-disabled` : `btn-outline-${variant}`,
          `py-${buttonPaddingY}`,
          `px-${buttonPaddingX}`,
          'my-auto',
          ...labelClass,
        ]"
        :for="option"
        @click="() => clicked(option)"
      >
        <input
          v-if="!disabled"
          :type="multiSelect ? 'checkbox' : 'radio'"
          :name="option"
          class="btn-check"
          :checked="isChecked(option)"
        >
        <slot :name="option">
          {{ option }}
        </slot>
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
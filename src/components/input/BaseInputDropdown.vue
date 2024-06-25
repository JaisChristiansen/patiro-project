<script setup lang="ts">
import { ButtonVariants } from '@/util/enums/button-variants';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';

interface Props {
  disabled?: boolean
  id: string;
  labelFunc?: (val: string) => string;
  modelValue: string |undefined; // vModel
  options: string[],
  paddingX?: '0' | '1' | '2' | '3' | '4',
  paddingY?: '0' | '1' | '2' | '3' | '4',
  buttonClasses?: string;
  ulClasses?: string;
  variant?: ButtonVariants,
}

const props = withDefaults(defineProps<Props>(), {
  show: null,
  disabled: false,
  variant: ButtonVariants.OUTLINE_PRIMARY,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <BaseButton
    :id="id"
    :with-spinner="false"
    :disabled="disabled"
    :variant="variant"
    :style-classes="buttonClasses"
    :padding-x="paddingX"
    :padding-y="paddingY"
    bs-toggle="dropdown"
  >
    <template #dropdown>
      <ul
        class="dropdown-menu"
        :class="ulClasses"
      >
        <li
          v-for="option in options"
          :key="option"
          class="dropdown-item clickable"
          @click="emit('update:modelValue', option)"
        >
          <slot :name="option">
            {{ labelFunc != null ? labelFunc(option) : option }}
          </slot>
        </li>
      </ul>
    </template>
    <slot name="button">
      <div class="row align-items-center">
        <div class="col">
          {{ modelValue }}
        </div>
        <IconChevronDown class="col-auto" />
      </div>
    </slot>
  </BaseButton>
</template>

<style scoped lang="scss">
</style>
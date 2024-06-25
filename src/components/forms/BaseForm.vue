<script setup lang="ts">
import { computed, ref } from 'vue';
import { ColorVariants } from '@/util/enums/color-variants';

// PROPS
interface Props {
  background?: ColorVariants,
  header?: string,
  needsValidation?: boolean,
  onSubmit?: () => Promise<void>,
  paddingX?: '1' | '2' | '3' | '4' | '5' | undefined,
  paddingY?: '1' | '2' | '3' | '4' | '5' | undefined,
  styleClasses?: string,
}

const props = withDefaults(defineProps<Props>(), {
  background: ColorVariants.WHITE,
  needsValidation: false,
  paddingX: '5',
  paddingY: '5',
});

// REFS AND CONSTANTS
const inputForm = ref<HTMLFormElement | undefined>(undefined);

// EMITS
const emit = defineEmits(['submit']);

// COMPUTED PROPERTIES
const formStyleClasses = computed(() => {
  return [
    props.background == ColorVariants.TRANSPARENT
      ? `bg-${ColorVariants.TRANSPARENT}`
      : `text-bg-${props.background}`,
    props.background == ColorVariants.TRANSPARENT ? `text-${ColorVariants.DARK}` : '',
    props.needsValidation ? 'needs-validation' : '',
    `px-${props.paddingX}`,
    `py-${props.paddingY}`,
    props.styleClasses,
  ];
});

// FUNCTIONS
const submitEvent = (event: Event) => {
  if (!props.needsValidation || inputForm.value?.checkValidity()) {
    emit('submit');
  }
  if (props.needsValidation) {
    inputForm.value?.classList.add('was-validated');
  }
};
</script>

<template>
  <div class="base-form">
    <form
      ref="inputForm"
      @submit.prevent.stop="submitEvent"
    >
      <h1 v-if="header">
        {{ header }}
      </h1>
      <slot>
        Empty form
      </slot>
      <div class="pt-3">
        <slot name="button">
          <div class="d-flex justify-content-end">
            <BaseButton
              type="submit"
              :with-spinner="!!onSubmit"
              @on-click-cb="onSubmit"
            >
              Confirm
            </BaseButton>
          </div>
        </slot>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
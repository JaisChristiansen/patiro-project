<script setup lang="ts">
import { computed, ref } from 'vue';
import { ButtonVariants } from '@/util/enums/button-variants';
import { ColorVariants } from '@/util/enums/color-variants';
import type { RouteLocation } from 'vue-router';

// PROPS

interface Props {
  badgeColor?: Exclude<ColorVariants, ColorVariants.TRANSPARENT>,
  badgeText?: string,
  bsAutoClose?: string,
  bsDismiss?: string,
  bsTarget?: string,
  bsToggle?: string;
  disabled?: boolean,
  isDropup?: boolean,
  onClickCb?: () => Promise<void>;
  outline?: boolean,
  paddingX?: '0' | '1' | '2' | '3' | '4',
  paddingY?: '0' | '1' | '2' | '3' | '4',
  routerParams?: RouteLocation,
  showBadge?: boolean,
  styleClasses?: string,
  type?: 'button' | 'submit' | 'reset',
  variant?: ButtonVariants,
  withSpinner?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  badgeColor: ColorVariants.DANGER,
  disabled: false,
  outline: false,
  paddingX: '3',
  paddingY: '2',
  showBadge: false,
  type: 'button',
  variant: ButtonVariants.PRIMARY,
  withSpinner: true,
});

// REFS

const isClicked = ref(false);

// EMITS

const emit = defineEmits(['click']);

// COMPUTED PROPERTIES

const badgeClasses = computed(() => {
  return [
    'position-absolute',
    'top-0',
    'start-100',
    'translate-middle',
    'badge',
    props.badgeText ? '' : 'p-2',
    props.badgeText ? 'rounded-pill' : 'rounded-circle',
    `text-bg-${props.badgeColor}`,
    isSameColor.value ? 'border' : '',
    isSameColor.value ? 'border-white' : '',
  ];
});


const dropdownClasses = computed(() => {
  return {
    dropdown: props.bsToggle === 'dropdown' && !props.isDropup,
    dropup: props.bsToggle === 'dropdown' && props.isDropup,
  };
});

const isSameColor = computed<boolean>(() => {
  return props.variant.toString() === props.badgeColor.toString();
});

const styleClassObj = computed(() => {
  return [
    `py-${props.paddingY}`,
    `px-${props.paddingX}`,
    `btn${props.outline ? '-outline' : ''}-${props.variant}`,
    props.styleClasses,
  ];
});

// FUNCTIONS

const onClick = () => {
  if (!isClicked.value) {
    isClicked.value = true;
    emit('click');
    if (props.onClickCb) {
      props.onClickCb().finally(() => isClicked.value = false);
    } else {
      isClicked.value = false;
    }
  }
};
</script>


<template>
  <RouterLink
    v-if="routerParams"
    class="base-button no-decoration"
    :to="routerParams"
  >
    <button
      :type="type"
      class="btn position-relative"
      :class="styleClassObj"
      :disabled="disabled"
      @click="onClick"
    >
      <span
        v-if="showBadge"
        :class="badgeClasses"
      >
        {{ badgeText }}
        <span class="visually-hidden">
          Badge
        </span>
      </span>
      <div v-if="withSpinner && isClicked">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      </div>
      <slot v-else>
        OK
      </slot>
    </button>
  </RouterLink>
  <div
    v-else
    class="base-button"
    :class="dropdownClasses"
  >
    <button
      :type="type"
      class="btn position-relative"
      :class="styleClassObj"
      :disabled="disabled"
      :data-bs-toggle="bsToggle"
      :data-bs-target="bsTarget"
      :data-bs-dismiss="bsDismiss"
      :data-bs-auto-close="bsAutoClose"
      @click.stop.prevent="onClick"
    >
      <span
        v-if="showBadge"
        :class="badgeClasses"
      >
        {{ badgeText }}
        <span class="visually-hidden">Badge</span>
      </span>
      <div v-if="withSpinner && isClicked">
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      </div>
      <slot v-else>
        OK
      </slot>
    </button>
    <slot name="dropdown" />
  </div>
</template>

<style scoped lang="scss"></style>
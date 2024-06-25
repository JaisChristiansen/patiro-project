<script setup lang="ts">
import { ColorVariants } from '@/util/enums/color-variants';
import { computed } from 'vue';

// PROPS
interface Props {
  variant?: ColorVariants,
  paddingY?: '0' | '1' | '2' | '3' | '4',
}

const props = withDefaults(defineProps<Props>(), {
  variant: ColorVariants.PRIMARY,
});

// COMPUTED PROPERTIES
const leftSideClasses = computed(() => {
  return [
    'left-side',
    `bg-${props.variant}`,
  ];
});

const rightSideClasses = computed(() => {
  return [
    'right-side',
    'flex-grow-1',
    'alert',
    `alert-${props.variant}`,
    props.paddingY ? `py-${props.paddingY}` : '',
  ];
});

</script>


<template>
  <div class="base-alert d-flex">
    <div :class="leftSideClasses" />
    <div
      :class="rightSideClasses"
      role="alert"
    >
      <slot>tekst</slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/bootstrap-override.scss';
$custom-alert-border-radius: $alert-border-radius;

.left-side {
  width: $custom-alert-border-radius;
  min-width: $custom-alert-border-radius;
  margin-bottom: $alert-margin-bottom;
  border-top-left-radius: $custom-alert-border-radius;
  border-bottom-left-radius: $custom-alert-border-radius;
}

.right-side {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: $custom-alert-border-radius;
  border-bottom-right-radius: $custom-alert-border-radius;
}
</style>
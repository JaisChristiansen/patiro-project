<script setup lang="ts">
import { computed, ref } from 'vue';
import { ColorVariants } from '@/util/enums/color-variants';
import { SizeOptions } from '@/util/enums/size-options';

// PROPS
interface Props {
  backdrop?: 'static' | boolean,
  backgroundColor?: Exclude<ColorVariants, ColorVariants.TRANSPARENT>,
  centered?: boolean,
  fade?: boolean,
  modalId: string,
  scrollable?: boolean,
  size?: SizeOptions,
  styleClasses?: string,
  title: string,
}

const props = withDefaults(defineProps<Props>(), {
  backdrop: true,
  backgroundColor: ColorVariants.WHITE,
  centered: false,
  fade: false,
  scrollable: false,
  size: SizeOptions.LG,
});

// COMPUTED PROPERTIES
const modalClasses = computed(() => {
  return [
    props.fade ? 'fade' : '',
    props.styleClasses,
  ];
});

const modalDialogClasses = computed(() => {
  return [
    `modal-${props.size}`,
    props.centered ? 'modal-dialog-centered' : '',
    props.scrollable ? 'modal-dialog-scrollable' : '',
  ];
});
</script>

<template>
  <div
    :id="modalId"
    :data-bs-backdrop="backdrop"
    class="base-modal modal"
    :class="modalClasses"
    tab-index="-1"
    :aria-labelledby="`${modalId}Label`"
    aria-hidden="true"
  >
    <div
      class="modal-dialog"
      :class="modalDialogClasses"
    >
      <div
        class="modal-content"
        :class="[`text-bg-${backgroundColor}`]"
      >
        <div class="modal-header">
          <h5
            :id="`${modalId}Label`"
            class="modal-title"
          >
            {{ title }}
          </h5>
          <BaseButtonIcon
            :variant="ColorVariants.SECONDARY"
            :outline="true"
            icon-type="fas"
            icon-name="x"
            bs-dismiss="modal"
          />
        </div>
        <div class="modal-body">
          <slot>
            Modal body missing
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
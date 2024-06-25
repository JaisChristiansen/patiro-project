<script setup lang="ts">
import { computed, nextTick, onActivated, onMounted, ref } from 'vue';
import { ButtonVariants } from '@/util/enums/button-variants';
import { ColorVariants } from '@/util/enums/color-variants';
import IconEx from '@/components/icons/IconEx.vue';
import type { RouteLocation } from 'vue-router';
import { SizeOptions } from '@/util/enums/size-options';
import { Tooltip } from 'bootstrap';

// PROPS

interface Props {
  badgeColor?: Exclude<ColorVariants, ColorVariants.TRANSPARENT>,
  badgeText?: string,
  bsAutoClose?: string,
  bsDismiss?: string,
  bsTarget?: string,
  bsToggle?: string,
  buttonId?: string,
  disabled?: boolean,
  iconName: string,
  iconType?: 'fal' | 'fas' | 'fa',
  iconSize?: SizeOptions,
  isDropup?: boolean,
  label?: string,
  onClickCb?: () => Promise<void>;
  outline?: boolean,
  rounded?: boolean,
  routerParams?: RouteLocation,
  size?: SizeOptions,
  showBadge?: boolean,
  styleClasses?: string,
  tooltipPlacement?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  tooltipText?: string,
  variant?: ButtonVariants,
}

const props = withDefaults(defineProps<Props>(), {
  badgeColor: ColorVariants.DANGER,
  disabled: false,
  iconType: 'fal',
  iconSize: SizeOptions.XS,
  isDropup: false,
  outline: false,
  rounded: false,
  showBadge: false,
  size: SizeOptions.MD,
  tooltipPlacement: 'top',
  type: 'button',
  variant: ButtonVariants.PRIMARY,
});

// REFS

const isClicked = ref(false);
const tooltip = ref<Tooltip | undefined>(undefined);

// EMITS

const emit = defineEmits(['click']);

// LIFECYCLE HOOKS
onMounted(() => {
  setTooltip();
});

onActivated(() => {
  setTooltip();
});

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
    `icon-class-${props.size}`,
    !props.rounded ? 'circle' : '',
    `btn${props.outline ? '-outline' : ''}-${props.variant}`,
    props.styleClasses,
  ];
});

// FUNCTIONS

const onClick = () => {
  if (!isClicked.value) {
    tooltip.value?.hide();
    isClicked.value = true;
    emit('click');
    if (props.onClickCb) {
      props.onClickCb().finally(() => isClicked.value = false);
    } else {
      isClicked.value = false;
    }
  }
};

const setTooltip = async () => {
  await nextTick();
  if (props.buttonId && props.tooltipText) {
    const tooltipElement = document.getElementById(`tooltip-${props.buttonId}`);
    if (tooltipElement) {
      tooltip.value = new Tooltip(tooltipElement, {
        placement: props.tooltipPlacement,
        trigger: 'hover',
      });
    }
  }
};
</script>


<template>
  <RouterLink
    v-if="routerParams"
    class="base-button-icon text-decoration-none d-flex align-items-center justify-content-center mx-auto"
    :to="routerParams"
  >
    <span
      :id="`tooltip-${buttonId}`"
      :data-bs-tooltip="tooltipText ? 'tooltip' : ''"
      :title="tooltipText"
      class="d-flex align-items-center justify-content-center"
    >
      <button
        :id="buttonId"
        type="button"
        class="btn d-flex align-items-center justify-content-center position-relative"
        :class="styleClassObj"
        :disabled="disabled"
        @click="onClick"
      >
        <span
          v-if="showBadge"
          :class="badgeClasses"
        >
          {{ badgeText }}
          <span class="visually-hidden">Badge</span>
        </span>
        <IconEx />
        <!-- <FontAwesomeIcon
          :icon="[iconType, iconName]"
          :size="iconSize"
        /> -->
      </button>
      <label
        v-if="label"
        :for="buttonId"
        class="roboto-xl ms-2 text-nowrap"
        :class="[`text-${variant}`]"
      >
        {{ label }}
      </label>
    </span>
  </RouterLink>
  <div
    v-else
    class="base-button-icon"
    :class="dropdownClasses"
  >
    <span
      :id="`tooltip-${buttonId}`"
      :data-bs-tooltip="tooltipText ? 'tooltip' : ''"
      :title="tooltipText"
      class="d-flex align-items-center justify-content-center"
    >
      <button
        :id="buttonId"
        type="button"
        class="btn d-flex align-items-center justify-content-center"
        :class="styleClassObj"
        :disabled="disabled"
        :data-bs-toggle="bsToggle"
        :data-bs-target="bsTarget"
        :data-bs-dismiss="bsDismiss"
        :data-bs-auto-close="bsAutoClose"
        aria-expanded="false"
        @click.stop.prevent="onClick"
      >
        <span
          v-if="showBadge"
          :class="badgeClasses"
        >
          {{ badgeText }}
          <span class="visually-hidden">Badge</span>
        </span>
        <!-- <FontAwesomeIcon
          :icon="[iconType, iconName]"
          :size="iconSize"
        /> -->
        <IconEx />
        <label
          v-if="label"
          :for="buttonId"
          class="roboto-xl ms-2 text-nowrap"
          :class="[`text-${variant}`]"
          @click.stop.prevent="onClick"
        >
          {{ label }}
        </label>
        <slot name="dropdown" />
      </button>
    </span>
    <slot name="dropdown" />
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/styles/bootstrap-variables.scss';

.icon-class-lg {
  height: 3rem;
  line-height: 2.75rem;
  width: 3rem;
  font-size: 2rem;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

.icon-class-md {
  height: 2.75rem;
  line-height: 2.5rem;
  width: 2.75rem;
  font-size: 2rem;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

.icon-class-sm {
  height: 2.25rem;
  line-height: 2rem;
  width: 2.25rem;
  font-size: 1.75rem;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}
.icon-class-xs {
  height: 1.75rem;
  line-height: 1.75rem;
  width: 1.75rem;
  font-size: 1.5rem;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}

.circle {
  border-radius: 50%;
}

label {
  color: $dark;
  text-decoration: none;
  cursor: pointer;
  font-family: var(--roboto);
  &.hover,
  &:hover {
    color: $dark;
  }
}

.position-90 {
  left: 90% !important;
  top: 10% !important;
}

.badge {
  font-size: 0.4em;
  text-align: center;
}
</style>
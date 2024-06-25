<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ColorVariants } from '@/util/enums/color-variants';
import IconEx from '@/components/icons/IconEx.vue';
import { timeout } from '@/util/global-functions';

// PROPS
interface Props {
  backgroundColor: ColorVariants,
  bordered?: boolean,
  canClearAll?: boolean,
  chooseAllLabel?: string,
  clearLabel?: string,
  displayProp?: (e:any) => string,
  label?: string,
  limit?: number,
  modelValue: any[], // vmodel
  options: any[],
  placeholder?: string,
  tagColor: ColorVariants,
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: ColorVariants.WHITE,
  bordered: true,
  canClearAll: true,
  chooseAllLabel: 'Select all',
  clearLabel: 'Clear all',
  displayProp: (e: any): string => e,
  label: 'Select tags',
  placeholder: 'Add...',
  tagColor: ColorVariants.GRAY,
});

// REFS AND CONSTANTS
const dropdown = ref<HTMLUListElement | undefined>(undefined);
const inputField = ref<HTMLInputElement | undefined>(undefined);

const dropdownFocus = ref(false);
const hoverIndex = ref(-1);
const inputFocus = ref(false);
const searchText = ref('');
const showDropdown = ref(false);

const dropdownClassList: string[] = [
  'position-absolute',
  'w-100',
  'overflow-x-auto',
  'overflow-y-scroll',
  'appearance-none',
  'text-start',
  'list-reset',
  'bg-white',
  'rounded',
  'border',
  'border-neutral-medium-grey',
  'dropdown',
];

const ulClassList: string[] = [
  'overflow-x-auto',
  'd-flex',
  'flex-wrap',
  'list-reset',
  'p-1',
  'p-1',
  'm-0',
  'w-auto',
];

// EMITS
const emit = defineEmits(['update:modelValue']);

// LIFECYCLE HOOKS
onMounted(() => {
  inputField.value?.addEventListener('focusin', () => {
    inputFocus.value = true;
    showDropdown.value = true;
  });
  inputField.value?.addEventListener('focusout', () => {
    inputFocus.value = false;
    timeout(50).then(() => {
      if (!dropdownFocus.value) {
        showDropdown.value = false;
        hoverIndex.value = -1;
      }
    });
  });

  dropdown.value?.addEventListener('focusin', () => {
    dropdownFocus.value = true;
  });
  dropdown.value?.addEventListener('focusout', () => {
    dropdownFocus.value = false;
    showDropdown.value = false;
  });
});

// COMPUTED PROPERTIES
const matchingOptions = computed<any[]>(() => {
  return props.options.filter((option) => {
    return !props.modelValue.includes(option)
      && (props.displayProp(option) as string).toLowerCase().startsWith(searchText.value.toLowerCase());
  });
});

const isWithinLimit = computed<boolean>(() => {
  return !props.limit || props.modelValue.length <= props.limit;
});

// FUNCTIONS
const dropdownItemClassList = (index: number): string[] => {
  return [
    'dropdown-item',
    index === hoverIndex.value ? 'dropdown-hover' : '',
  ];
};

const addOption = (index: number) => {
  const option = matchingOptions.value[index];
  if (!props.modelValue.includes(option) && isWithinLimit.value) {
    emit('update:modelValue', [...props.modelValue, option]);
    searchText.value = '';
    showDropdown.value = false;
  }
};

const addSearchOption = () => {
  if (
    props.options.some(option => props.displayProp(option) === searchText.value)
    && !props.modelValue.some(tag => props.displayProp(tag) === searchText.value)
    && isWithinLimit.value
  ) {
    const option = props.options.find(option => props.displayProp(option) === searchText.value);
    emit('update:modelValue', [...props.modelValue, option]);
    searchText.value = '';
  }
};

const removeOption = (index: number) => {
  if (props.modelValue && props.modelValue.length > 0) {
    emit('update:modelValue', props.modelValue.slice(0).splice(index, 1));
  }
};

const selectAll = () => {
  const newOptions: any[] = [];
  props.options.forEach((option) => {
    if (!props.modelValue.some(tag => props.displayProp(tag) === props.displayProp(option))) {
      newOptions.push(option);
    }
  });
  emit('update:modelValue', props.modelValue.concat(newOptions));
};

</script>

<template>
  <div class="input-tags">
    <label>
      {{ label }}
    </label>
    <div class="position-relative mb-2">
      <div :class="[bordered ? 'bordered' : '', 'rounded', `bg-${backgroundColor}`]">
        <ul :class="ulClassList">
          <li
            v-for="(tag, index) in modelValue"
            :key="index"
            class="d-flex flex-row align-items-center"
          >
            <span
              class="rounded-3 h-auto px-2 m-1"
              :class="[`bg-${tagColor}`]"
            >
              <span class="me-1">
                {{ displayProp(tag) }}
              </span>
              <span>
                <IconEx />
                <!-- <FontAwesomeIcon
                  :icon="['fal', 'times-circle']"
                  @click.prevent="removeOption(index)"
                /> -->
              </span>
            </span>
          </li>
          <li class="p-1 d-flex flex-row align-items-center flex-grow-1">
            <input
              ref="inputField"
              v-model="searchText"
              type="text"
              :placeholder="placeholder"
              :aria-label="placeholder"
              class="h-100 flex-grow-1"
              @keyup.enter="addSearchOption()"
            >
          </li>
        </ul>
        <ul
          v-show="showDropdown && matchingOptions"
          ref="dropdown"
          tabindex="-1"
          style="z-index: 100"
          :class="dropdownClassList"
        >
          <li
            v-for="(option, index) in matchingOptions"
            :key="index"
            tabindex="-1"
            :class="dropdownItemClassList(index)"
            @mouseover="hoverIndex = index"
            @click.prevent="addOption(index)"
            @touch.prevent="addOption(index)"
          >
            {{ displayProp(option) }}
          </li>
        </ul>
      </div>
    </div>
    <div class="row row-cols-auto g-3">
      <div class="col">
        <BaseButton
          :with-spinner="false"
          style-classes="roboto fw-medium"
          variant="outline-primary"
          padding-x="2"
          padding-y="1"
          @click="selectAll()"
        >
          {{ chooseAllLabel }}
        </BaseButton>
      </div>
      <div class="col">
        <BaseButton
          :with-spinner="false"
          style-classes="roboto fw-medium"
          variant="outline-primary"
          padding-x="2"
          padding-y="1"
          @click="$emit('update:modelValue', [])"
        >
          {{ clearLabel }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-reset {
  list-style: none;
  padding: 0;
}

.appearance-none {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.dropdown {
  max-height: 10rem !important;
  overflow: hidden;
  overflow-y: auto;
}

.dropdown-item {
  cursor: pointer;
  outline: none;
}

.dropdown-hover {
  background-color: #adb5bd;
}

input {
  border: none;
  &:focus,
  &:active,
  &:focus-visible {
    border: none;
    box-shadow: none;
  }
}

input[type='text'],
textarea,
select {
  outline: none;
  border: none;
  box-shadow: none;
}

</style>
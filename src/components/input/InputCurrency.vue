<template>
  <input
    :required="isRequired"
    ref="inputRef"
    v-model="formattedValue"
    :class="customClass"
    :placeholder="placeholder"
    type="text"
    :disabled="isDisabled"
  />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  props: {
    modelValue: Number,
    options: Object,
    customClass: String,
    placeholder: {
      type: String,
      default: 'Nominal',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { inputRef, formattedValue } = useCurrencyInput(props.options)
    return { inputRef, formattedValue }
  },
}
</script>

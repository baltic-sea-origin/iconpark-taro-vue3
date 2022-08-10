<template>
  <image
    class="icon-park"
    :style="{
      width: '1em',
      height: '1em'
    }"
    :src="base64Data"
    mode="widthFix"
  />
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { CircleDoubleDown as originIcon } from "@icon-park/svg";
import { IIconProps, Theme } from "@icon-park/svg/lib/runtime";
import svg64 from "svg64";

const props = defineProps({
  theme: {
    type: String as PropType<Theme>,
    default: "outline"
  },
  fill: {
    type: [Array, String] as PropType<string | string[]>,
    default: "currentColor"
  }
});
const iconProps: IIconProps = {
  theme: props.theme,
  fill: props.fill
};
const base64Data = svg64(originIcon(iconProps));
</script>

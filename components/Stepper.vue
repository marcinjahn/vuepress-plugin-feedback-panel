<template>
  <div>
    <span>{{ current }}</span
    >/<span>{{ total }}</span>
  </div>
</template>

<script>
export default {
  props: ["current", "total"],
};
</script>
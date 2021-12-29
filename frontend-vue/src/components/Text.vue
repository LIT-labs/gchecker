<template>
  <div> {{ data }} </div>
</template>

<script>
  export default {
    props: { data: { type: String, defaultValue: '' } },
  }
</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-sm row items-start">
      <q-uploader url="/upload" label="Single Upload" style="max-width: 300px" />
      <q-uploader url="/upload" label="Multiple Upload" multiple style="max-width: 300px" />
      <q-uploader url="/upload" label="Batch Upload" multiple batch style="max-width: 300px" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<script setup lang="ts">
import { convertSize, formatFileSize } from '@/modules/util/libs';
import { ref } from 'vue';

import { useToast } from 'primevue';
import PrimeButton from "primevue/button";
import PrimeDialog from 'primevue/dialog';
import PrimeToast from 'primevue/toast';

import { Cropper, type CropperResult } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const BACKEND = "http://localhost:8088"

const entered = ref(false)
const showCropper = ref(false)
const fileInput = ref<HTMLInputElement>()
const formEl = ref<HTMLFormElement>()
const toast = useToast()
const fileSrc = ref<string>()
const croppedCanvas = ref<HTMLCanvasElement>()

function onClick() {
  fileInput.value?.click()
}

function onChange(){
  const file = fileInput.value!.files![0]
  if(file) {
    const size = convertSize(file.size, 1)
    if(!file.type.startsWith("image")) {
      toast.add({
        severity: "error",
        summary: `MIME type: ${file.type} not supported`
      })
      return
    } else if(size.mb > 5) {
      toast.add({
        severity: "error",
        summary: `A size of ${size.mb} MB is not supported. Max size is 5MB`
      })
      return
    }

    const reader = new FileReader()
    reader.onload = e => {
      fileSrc.value = e.target?.result as string
    }
    reader.readAsDataURL(file)

    toast.add({
      summary: `File added. Type: ${file.type}. Size: ${formatFileSize(size).formatted}`
    })
    showCropper.value = true
  }
  // form.value?.submit()
}

function onCancel() {
  showCropper.value = false
  fileSrc.value = undefined as any
  formEl.value?.reset()
  toast.add({
    severity: "error",
    summary: 'Cancelled'
  })
}

async function onSubmit() {

  const croppedBlob = await new Promise<Blob | null>((resolve) => {
    croppedCanvas.value?.toBlob(resolve, "image/png")
  })

  const formData = new FormData();
  formData.append('file', croppedBlob!, 'cropped-image.png');
  try {
    const response = await fetch(`${BACKEND}/upload/img/`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      await response.json();
      toast.add({
        summary: `Upload successful`
      })
      showCropper.value = false
    } else {
      console.error('Error uploading image:', response.statusText);
      toast.add({
        severity: "error",
        summary: `Error uploading image: ${response.statusText}`
      })
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    toast.add({
      severity: "error",
      summary: `Error during fetch: ${(error as Error).message}`
    })
  }
}


function onCropperChange(e: CropperResult) {
  croppedCanvas.value = e.canvas!
}

</script>

<template>
  <form :ref="el => formEl = (el as HTMLFormElement)" @click="onClick" @mouseenter="entered = true" @mouseleave="entered = false" class="flex justify-center item-center size-[120px] hover:bg-gray-200 border rounded-full cursor-pointer overflow-clip" title="Add a profile picture">
    <prime-toast />
    <prime-dialog
    :visible="showCropper"
    :modal="true"
    content-style="width: fit-content; height: fit-content;"
    >
    <template #container>
      <div class="flex flex-col items-center py-1">
        <cropper
          class="cropper"
          :src="fileSrc"
          :stencil-props="{
            aspectRatio: 10/12
          }"
          @change="onCropperChange"
        />
        <div class="flex flex-row justify-center gap-x-2 w-full p-3">
          <span class="size-fit">
            <prime-button @click="onCancel" label="Cancel" severity="danger" />
          </span>
          <span class="size-fit">
            <prime-button @click="onSubmit" label="Submit" />
          </span>
        </div>
      </div>
    </template>
    </prime-dialog>
    <v-icon v-if="entered" name="bi-camera" animation="pulse" scale="6" />
    <v-icon v-else name="bi-plus-lg" animation="pulse" scale="6" />
    <input :ref="(el) => fileInput = (el as HTMLInputElement)" @change="onChange" type="file" class="hidden" accept="image/*" />
  </form>
</template>

<style lang="css" scoped>
.cropper {
	height: fit-content;
	width: fit-content;
	background: #DDD;
}
</style>

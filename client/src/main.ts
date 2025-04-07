import '@/assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon } from 'oh-vue-icons'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import BadgeDirective from 'primevue/badgedirective'
import ConfirmationService from 'primevue/confirmationservice'
import KeyFilter from 'primevue/keyfilter'
import FocusTrap from 'primevue/focustrap'

import App from './App.vue'
import router from './router'
import { addIcons } from "oh-vue-icons";
import { BiCameraFill, BiCamera, BiPlusLg } from "oh-vue-icons/icons";


const app = createApp(App)
app.component('v-icon', OhVueIcon)

addIcons(
  BiCameraFill, BiCamera, BiPlusLg
)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(ToastService)
app.use(ConfirmationService)
app.directive('tooltip', Tooltip)
app.directive('badge', BadgeDirective)
app.directive('keyfilter', KeyFilter)
app.directive('focustrap', FocusTrap)

app.mount('#app')

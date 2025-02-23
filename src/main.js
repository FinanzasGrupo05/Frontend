import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from "@/styles/preset.js";
import 'primeicons/primeicons.css'

import "@/styles/main.css"
import "@/styles/margins.paddings.css"
import "@/styles/font.sizes.css"
import "@/styles/display.directions.css"
import "@/styles/primevue.modifications.css"
import "@/styles/display.positions.css"
import "@/styles/image.sizes.css"

import { MotionPlugin } from '@vueuse/motion'
import { InputNumber, InputText, Textarea, Password, DatePicker, Checkbox, FloatLabel } from "primevue";
import { Select, MultiSelect } from "primevue";
import { Card, Button } from "primevue";
import { DataTable, Column, Row } from "primevue";

import { ProgressSpinner } from "primevue";
import { Badge, OverlayBadge } from 'primevue';
import { Galleria, Fieldset, Rating, Avatar  } from "primevue";

import { DataView } from 'primevue';
import { Divider } from "primevue";



import { ToastService, Toast } from "primevue";
import { ConfirmationService, ConfirmDialog } from "primevue";

import { Dialog } from "primevue";

import { KeyFilter } from "primevue";

const app = createApp(App)
app.use(router)
app.use(PrimeVue, { theme: { preset: Aura }});
app.use(ToastService)
app.use(ConfirmationService)
app.use(MotionPlugin)

app.directive('keyfilter', KeyFilter);

app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Textarea', Textarea)
app.component('Password', Password)
app.component('Calendar', DatePicker)
app.component("FloatLabel", FloatLabel)

app.component('Dropdown', Select)
app.component('Select', Select)
app.component('MultiSelect', MultiSelect)

app.component('Card', Card)
app.component("Button", Button)
app.component("Checkbox", Checkbox)
app.component("ProgressSpinner", ProgressSpinner)

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Row', Row)

app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Dialog', Dialog)

app.component('Badge', Badge)
app.component('OverlayBadge', OverlayBadge)

app.component('DataView', DataView)
app.component('Divider', Divider)

app.component('Avatar', Avatar)
app.component('Galleria', Galleria)
app.component('Fieldset', Fieldset)
app.component('Rating', Rating)

app.mount('#app')

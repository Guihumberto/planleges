/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'

// Components
import App from './App.vue'



// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(VueQuillEditor)

registerPlugins(app)

app.mount('#app')

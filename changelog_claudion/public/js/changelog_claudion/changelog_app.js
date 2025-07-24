import { createApp } from 'vue'
import Home from './Home.vue'

frappe.pages['changelog'].on_page_load = function(wrapper) {
  const el = document.createElement('div')
  el.id = 'changelog-app'
  wrapper.appendChild(el)

  createApp(Home).mount('#changelog-app')}
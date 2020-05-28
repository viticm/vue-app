import Vue from 'vue'
import Clipboard from 'clipboard'

const dialog = Vue.prototype.$dialog

function clipboardSuccess() {
  dialog.message.success('Copy successfully')
}

function clipboardError() {
  dialog.message.error('Copy failed')
}

export default function handleClipboard(target, text) {
  if (! Clipboard.isSupported()) {
    clipboardError()
    return
  }
  const clipboard = new Clipboard(target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  // clipboard.onClick(event)
}

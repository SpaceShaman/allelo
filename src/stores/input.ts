import { defineStore } from "pinia";
import { ref } from 'vue';

export const inputStore = defineStore('input', () => {
    const mouse = {
        x: ref(0),
        y: ref(0),
        moveX: ref(0),
        moveY: ref(0),
        pressed: ref(false),
        up: ref<number>(),
        down: ref<number>(),
        doubleClick: ref<number>(),
        button: ref(0),
        ctrl: ref(false),
        target: ref<HTMLElement | undefined>(),
    }
    const keyboard = {
        key: ref(''),
        ctrl: ref(false),
    }

    document.addEventListener('mousedown', (e) => {
        e.preventDefault()
        mouse.pressed.value = true
        mouse.button.value = e.button
        mouse.ctrl.value = e.ctrlKey
        mouse.down.value = Date.now()
    })
    document.addEventListener('mouseup', (e) => {
        e.preventDefault()
        mouse.pressed.value = false
        mouse.button.value = 0
        mouse.ctrl.value = false
        mouse.up.value = Date.now()
    })
    document.addEventListener('mousemove', (e) => {
        e.preventDefault()
        mouse.target.value = e.target as HTMLElement
        mouse.x.value = e.clientX
        mouse.y.value = e.clientY
        mouse.moveX.value = e.movementX
        mouse.moveY.value = e.movementY
    })
    document.addEventListener("dblclick", (e) => {
        e.preventDefault()
        mouse.doubleClick.value = Date.now()
    })
    document.addEventListener('keydown', (e) => {
        keyboard.key.value = e.key
        keyboard.ctrl.value = e.ctrlKey
    })
    // disable right-click context menu
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    return {
        mouse,
        keyboard,
    }
})
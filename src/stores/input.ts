import { defineStore } from "pinia";
import { ref } from 'vue';

export const inputStore = defineStore('input', () => {
    const mouse = {
        x: ref(0),
        y: ref(0),
        moveX: ref(0),
        moveY: ref(0),
        pressed: ref(false),
        button: ref(0),
        ctrl: ref(false),
        target: ref<HTMLElement | undefined>(),
    }

    document.addEventListener('mousedown', (e) => {
        e.preventDefault()
        mouse.pressed.value = true
        mouse.button.value = e.button
        mouse.ctrl.value = e.ctrlKey
    })
    document.addEventListener('mouseup', (e) => {
        e.preventDefault()
        mouse.pressed.value = false
        mouse.button.value = 0
        mouse.ctrl.value = false
    })
    document.addEventListener('mousemove', (e) => {
        e.preventDefault()
        mouse.target.value = e.target as HTMLElement
        mouse.x.value = e.clientX
        mouse.y.value = e.clientY
        mouse.moveX.value = e.movementX
        mouse.moveY.value = e.movementY
    })

    return {
        mouse,
    }
})
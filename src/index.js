import {isMobile} from "./isMobile"
import {region} from "./region"

const mMask = (function () {

    const makeMasked = function (str, region) {
        if (!region) {
            return str
        }
        let tmp = region.mask[region]
        for (let i = 0; i < str.length; i++) {
            tmp = tmp.replace("_", str[i])
        }
        return tmp
    }

    const onclick = ({target}) => {
        if (target.value === "+") {
            target.selectionStart = 1
        }
    }

    const onkeypress = function (e) {
        if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 8) {
            e.preventDefault()
        }
    }

    const onkeydown = function ({target, keyCode}) {
        const str = target.value
        if (str === "+") target.selectionStart = 1

        if (keyCode === 8) {
            let start = target.selectionStart
            const end = target.selectionEnd
            if (start - end === 0) {
                while ((str.charAt(start - 1) < "0" || str.charAt(start - 1) > "9") && start > 0) {
                    start--
                }
                target.selectionStart = start
                target.selectionEnd = start
            }
        }
    }

    const oninput = function (e) {
        let str = e.target.value
        let start = e.target.selectionStart

        str = str.replace(/\+/g, "")
        str = str.replace(/\D+/g, "")
        let reg = region.detect(str)

        str = makeMasked(str, reg)

        if (str.includes("_") !== -1) {
            str = str.substring(0, str.indexOf("_"))
        }

        if(start === 1){
            start = str.length
        }else{
            for (let i = 0; i < str.length; i++){
                if (str.charAt(start) > "9" || str.charAt(start) < "0") {
                    start++
                }
            }
        }

        e.target.value = str

        if (isMobile.any()) {
            setTimeout(function () {
                e.target.selectionStart = start
                e.target.selectionEnd = start
            }, 1)
        } else {
            e.target.selectionStart = start
            e.target.selectionEnd = start
        }
    }

    return Object.freeze({
        init: function (element) {
            element.type = "tel"
            element.addEventListener("input", oninput)
            element.addEventListener("keydown", onkeydown)
            element.addEventListener("keypress", onkeypress)
            element.addEventListener("click", onclick)
            element.addEventListener("onfocus", onclick)
            // element.dispatchEvent(new Event("input"))
        },
    })
})()



mMask.region = region

window.mMask = mMask



document.addEventListener("DOMContentLoaded", () => {
    const items = document.getElementsByClassName("mMask")
    for (let item of items) {
        mMask.init(item)
    }
})


export {mMask}
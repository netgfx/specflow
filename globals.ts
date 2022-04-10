import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"

export const useStore = createStore({
    newPass1: "",
    newPass2: "",
    token: "",
    resetEmail: "",
    userID: undefined,
    background: "#0099FF",
    supabase: undefined,
    email: "",
    pass: "",
    passStrength: 0,
    passColor: "#EB544C",
    loginEmailValue: "",
    loginEmail: false,
    loginPass: false,
    supabase_error: "",
    password_error: "",
    show_modal: "",
    user_email: "",
    show_flow_component: "",
})

export const checkUsername = async (email, supabase) => {
    let { data: accounts, error } = await supabase
        .from("accounts")
        .select("username")
    console.log(">>> ", accounts, email)
    if (accounts.length > 0) {
        console.log(">>> ", accounts, accounts[0].username, email)
        const result = accounts.filter((value) => {
            return value.username.toLowerCase() == email.toLowerCase()
        })
        if (result.length > 0) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export const checkPassword = async (email, pass, supabase) => {
    let { data: accounts, error } = await supabase
        .from("accounts")
        .select("userpassword")
        .eq("username", email)

    if (accounts.length > 0) {
        console.log(">>>", accounts[0].userpassword, pass)
        if (accounts[0].userpassword == pass) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export var browser = (function () {
    var test = function (regexp) {
        return regexp.test(window.navigator.userAgent)
    }
    switch (true) {
        case test(/edg/i):
            return "Microsoft Edge"
        case test(/trident/i):
            return "Microsoft Internet Explorer"
        case test(/firefox|fxios/i):
            return "Mozilla Firefox"
        case test(/opr\//i):
            return "Opera"
        case test(/ucbrowser/i):
            return "UC Browser"
        case test(/samsungbrowser/i):
            return "Samsung Browser"
        case test(/chrome|chromium|crios/i):
            return "Google Chrome"
        case test(/safari/i):
            return "Apple Safari"
        default:
            return "Other"
    }
})()

import { OneSignal } from "react-native-onesignal";



export function tagUserInfoCreate() {
    OneSignal.User.addTags({
        'user_name': 'iuri',
        'user_email': 'iuri@iuri.com',
    })
}

export function tagUserEmailRemove() {
    OneSignal.User.removeTag('user_email')
}
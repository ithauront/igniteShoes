import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal'

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext'
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect } from 'react';

OneSignal.initialize('044fb279-2864-429f-9524-8f16db5b1a29')
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(()=>{
    const handleNotificationClick = (event: NotificationClickEvent):void=>{
     const {actionId} = event.result

     switch(actionId) {
      case "1":
        console.log('clicou no ver todos')
        break
      case "2":
        console.log('clciou no ver pedido')
        break
      default: console.log('Nenhum botão clicado')
      break
     }
    }
     OneSignal.Notifications.addEventListener('click', handleNotificationClick)

     return ()=> OneSignal.Notifications.removeEventListener('click', handleNotificationClick)
  },[])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
} 
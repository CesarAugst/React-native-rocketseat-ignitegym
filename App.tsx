import { StatusBar } from 'react-native';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { Center, GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { AuthContext } from '@contexts/AuthContext';

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

    return (
        <GluestackUIProvider config={config}>
            <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} translucent={true} />
            <AuthContext.Provider value={{
                user: {
                    id: '1',
                    name: 'Cesar',
                    email: 'cesar@email.com',
                    avatar: 'cesar.png'
                }
            }}>
                {fontsLoaded ? <Routes /> : <Loading />}
            </AuthContext.Provider>
        </GluestackUIProvider>
    );
}

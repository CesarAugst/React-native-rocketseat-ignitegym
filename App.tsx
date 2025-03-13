import {StatusBar, View} from 'react-native';
import {useFonts, Roboto_700Bold, Roboto_400Regular} from '@expo-google-fonts/roboto';
import {GluestackUIProvider, Text} from "@gluestack-ui/themed";

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular });

    return (
        <GluestackUIProvider>
            <View style={{flex: 1,alignItems: 'center', justifyContent: 'center', backgroundColor: "#202024"}}>
                <StatusBar barStyle={"light-content"} backgroundColor={"transparent"} translucent={true}/>
                { fontsLoaded ? <Text color={"white"}>Home</Text>: <View/>}
            </View>
        </GluestackUIProvider>
    );
}

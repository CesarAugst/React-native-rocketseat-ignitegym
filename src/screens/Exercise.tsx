import { Text, VStack, Icon, HStack, Heading, Image } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import BodySvg from "@assets/body.svg";

export function Exercise() {

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleGoBack(){
        navigation.goBack();
    }

    return (
        <VStack flex={1}>
            <VStack 
                px={"$8"}
                bg={"$gray600"}
                pt={"$12"}
            >
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={ArrowLeft} color={"$green500"} size={"xl"}/>
               </TouchableOpacity>
                <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={"$4"}
                    mb={"$8"}
                >
                    <Heading
                        color={"$gray100"}
                        fontFamily={"$heading"}
                        fontSize={"$lg"}
                        flexShrink={1}
                    >
                        Puxada Frontal</Heading>
                    <HStack>
                        <BodySvg />
                        <Text
                            color={"$gray200"}
                            ml={"$1"}
                            textTransform={"capitalize"}
                        >Costas</Text>
                    </HStack>
                </HStack>
            </VStack>

            <VStack p="$8">
                <Image
                    source={{ uri: "https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_490,h_525,al_c,lg_1,q_80/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp" }}
                    alt="Exercício"
                    mb="$3"
                    resizeMode="cover"
                    rounded="$lg"
                    w={"$full"}
                    h={"$80"}
                />
            </VStack>
        </VStack>
    )
}
import { Text, VStack, Icon, HStack, Heading, Image, Box } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";
 
import BodySvg from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionSVG from "@assets/repetitions.svg";
import { Button } from "@components/Button";

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

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 62
                }}
            >
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
                    <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                        <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
                            <HStack>
                                <SeriesSVG />
                                <Text color="$gray200" ml="$2">3 Séries</Text>
                            </HStack>
                            <HStack>
                                <RepetitionSVG />
                                <Text color="$gray200" ml="$2">12 Repetições</Text>
                            </HStack>
                        </HStack>
                        <Button title="Marcar como realizado"/>
                    </Box>
                </VStack>
            </ScrollView>
        </VStack>
    )
}
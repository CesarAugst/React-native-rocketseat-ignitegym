import { Heading, HStack, Image, Text, VStack, Icon } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ChevronRight } from "lucide-react-native";
type Props = TouchableOpacityProps

export function ExerciseCard({ ...rest }) {
    return (
        <TouchableOpacity {...rest}>
            <HStack bg={"$gray500"} alignItems={"center"} p={"$2"} pr={"$4"} rounded={"$md"} mb={"$3"}>
                <Image
                    source={{ uri: "https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_490,h_525,al_c,lg_1,q_80/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp" }}
                    alt={"Imagem do Exercício"}
                    w={"$16"}
                    h={"$16"}
                    rounded={"$md"}
                    mr={"$4"}
                    resizeMode={"cover"}
                />
                <VStack flex={1}>
                    <Heading
                        fontSize={"$lg"}
                        color={"$white"}
                        fontFamily={"$heading"}
                    >
                        Puxada Frontal
                    </Heading>
                    <Text
                        fontSize={"$sm"}
                        color={"$gray200"}
                        numberOfLines={2}
                    >
                        3 Séries x 12 Repetições
                    </Text>
                </VStack>

                <Icon as={ChevronRight} color={"$gray300"} />
            </HStack>
        </TouchableOpacity>
    )
}
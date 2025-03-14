import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { UserPhoto } from "./UserPhoto";

export function HomeHeader(){
    return(
        <HStack bg={"$gray600"} pt={"$16"} pb={"$5"} px={"$8"} alignItems={"center"} gap={"$4"}>
            <UserPhoto source={{uri: "https://avatars.githubusercontent.com/u/45099916?v=4"}} alt="Imagem do Usuário" w={"$16"} h={"$16"}/>
            <VStack>
                <Text color={"$gray100"} fontSize={"$sm"}>Olá, </Text>
                <Heading color={"$gray100"} fontSize={"$md"}>Cesar August</Heading>
            </VStack>
        </HStack>
    )
}
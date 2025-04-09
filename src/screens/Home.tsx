import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Center, Heading, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";
import { FlatList } from "react-native";
import {useNavigation} from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
    const [exercise, setExercise] = useState(["Puxada Frontal", "Remada Curvada", "Remada Unilateral", "Levantamento Terra", ]);
    const [groups, setGroups] = useState(["Costas", "Bíceps", "Tríceps", "Ombro"]);
    const [groupSelected, setGroupSelected] = useState("Costas");

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExerciseDetails(){
        navigation.navigate("exercise")
    }

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 32 }}
                style={{marginVertical: 40, maxHeight: 44, minHeight: 44}}
                renderItem={({item}) => (
                    <Group name={item} isActive={groupSelected.toLowerCase() === item.toLowerCase()} onPress={() => {
                        setGroupSelected(item)
                    }} />
                )}
            />

            <VStack px={"$8"} flex={1}>
                <HStack justifyContent={"space-between"} marginBottom={"$5"} alignItems={"center"}>
                    <Heading color={"$gray200"} fontSize={"$md"} fontFamily={"$heading"}>
                        Exercícios
                    </Heading>
                    <Text color={"$gray200"} fontSize={"$sm"} fontFamily={"$body "}>
                        {exercise.length}
                    </Text>
                </HStack>

                <FlatList 
                    data={exercise}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                    renderItem={() => <ExerciseCard onPress={handleOpenExerciseDetails}/>}
                />
            </VStack>
        </VStack>
    )
}
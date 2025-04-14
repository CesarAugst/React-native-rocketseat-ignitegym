import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Center, Heading, HStack, Text, useToast, VStack } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {useNavigation} from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { api } from "@services/api";

export function Home() {
    const [exercise, setExercise] = useState<string[]>(["Puxada Frontal", "Remada Curvada", "Remada Unilateral", "Levantamento Terra", ]);
    const [groups, setGroups] = useState<string[]>([]);
    const [groupSelected, setGroupSelected] = useState("Costas");

    const toast = useToast();
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExerciseDetails(){
        navigation.navigate("exercise")
    }

    async function fetchGroups(){
        try{
            const response = await api.get("/groups");
            setGroups(response.data);
        }catch(error){
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares"

            toast.show({
                render: ({id}) => (
                    <ToastMessage 
                        id={id}
                        title={title}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })
            
        }
    }

    useEffect(() => {
        fetchGroups();
    }, []);

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
import { Text, VStack, Icon, HStack, Heading, Image, Box, useToast } from "@gluestack-ui/themed";
import { ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation, useRoute } from "@react-navigation/native";
 
import BodySvg from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionSVG from "@assets/repetitions.svg";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
    exerciseId: string;
}

export function Exercise() {
    const [isLoading, setIsLoading] = useState(true);
    const [sendingRegister, setSendingRegister] = useState(false);
    const [exercise, setExercise] = useState<ExerciseDTO>();

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const toast = useToast();
    const route = useRoute();

    const {exerciseId} = route.params as RouteParamsProps;

    function handleGoBack(){
        navigation.goBack();
    }

    async function fetchExerciseDetails(){
        try{
            setIsLoading(true);
            const response = await api.get(`/exercises/${exerciseId}`);
            setExercise(response.data);

        }catch(error){
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os detalhes do exercício"

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
                    
        }finally{
            setIsLoading(false);
        }
    }

    async function handleExerciseHistoryRegister(){
        try{
            setSendingRegister(true);
            await api.post('/history', {exercise_id: exerciseId})
            toast.show({
                render: ({id}) => (
                    <ToastMessage 
                        id={id}
                        title={"Parabéns! Exercício registrado no seu histórico."}
                        action="success"
                        onClose={() => toast.close(id)}
                    />
                )
            })
            navigation.navigate('history');
        }catch(error){
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível registrar o exercício"

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
                    
        }finally{
            setSendingRegister(false);
        }
    }

    useEffect(() => {
        fetchExerciseDetails();
    }, [exerciseId]);
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
                        {exercise?.name}</Heading>
                    <HStack>
                        <BodySvg />
                        <Text
                            color={"$gray200"}
                            ml={"$1"}
                            textTransform={"capitalize"}
                        >{exercise?.group}</Text>
                    </HStack>
                </HStack>
            </VStack>

            {
                isLoading ? <Loading /> : 
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 62
                    }}
                >
                    <VStack p="$8">
                        <Image
                            source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}` }}
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
                                    <Text color="$gray200" ml="$2">{exercise?.series} Séries</Text>
                                </HStack>
                                <HStack>
                                    <RepetitionSVG />
                                    <Text color="$gray200" ml="$2">{exercise?.repetitions} Repetições</Text>
                                </HStack>
                            </HStack>
                            <Button title="Marcar como realizado" isLoading={sendingRegister} onPress={handleExerciseHistoryRegister}/>
                        </Box>
                    </VStack>
                </ScrollView>
            }
        </VStack>
    )
}
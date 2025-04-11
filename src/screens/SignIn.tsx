import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useForm, Controller } from "react-hook-form";

import {useAuth} from '@hooks/useAuth';
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";
import { useState } from "react";

type FormData = {
    email: string;
    password: string;
}

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false);
    const {signIn} = useAuth();
    const navigator = useNavigation<AuthNavigatorRoutesProps>();

    const toast = useToast();

    const {control, handleSubmit, formState: {errors}} = useForm<FormData>();

    function handleNewAccount(){
        navigator.navigate("signUp");
    }

    async function handleSignIn({email, password}: FormData){
        try{
            setIsLoading(true);
            await signIn(email, password);
        }catch(error){
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : "Não foi possível acessar. Tente novamente mais tarde."
            toast.show({
                placement: 'top',
                render: ({id}) => (
                    <ToastMessage 
                        id={id}
                        title={title}
                        action="error"
                        onClose={() => toast.close(id)}
                    />
                )
            })
            setIsLoading(false);
        }
    }

    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
            <VStack flex={1}>
                <Image 
                    w={"$full"}
                    h={624}
                    source={BackgroundImg} 
                    defaultSource={BackgroundImg}
                    alt={"Pessoas Treinando"}
                    position={"absolute"}
                />
                <VStack flex={1} px={"$10"} pb={"$16"}>
                    <Center my={"$24"}>
                        <Logo />
                        <Text color={"$gray100"} fontSize={"$sm"}> 
                            Treine sua mente e corpo.
                        </Text>
                    </Center>
                    <Center gap={"$2"}>
                        <Heading color={"$gray100"}>Acesse a conta</Heading>
                        <Controller 
                            control={control}
                            name="email"
                            rules={{required: 'Informe o e-mail'}}
                            render={({field: {onChange}}) => (
                                <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" onChangeText={onChange} errorMessage={errors.email?.message}/>
                            )}
                        />
                        <Controller 
                            control={control}
                            name="password"
                            rules={{required: 'Informe a senha'}}
                            render={({field: {onChange}}) =>(
                                <Input placeholder={"Senha"} secureTextEntry  onChangeText={onChange} errorMessage={errors.email?.message}/>
                            )}
                        />
                        <Button title={"Acessar"} onPress={handleSubmit(handleSignIn)} isLoading={isLoading}/>
                    </Center>
                    <Center flex={1} justifyContent="flex-end" mt={"$4"}>
                        <Text color={"$gray100"} fontSize={"$sm"} mb={"$3"} fontFamily={"$body"}>Ainda não tem acesso?</Text>
                        <Button title="Criar Conta" variant="outline" onPress={handleNewAccount}/>
                    </Center>
                </VStack>
            </VStack>
        </ScrollView>
    )
}
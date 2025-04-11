import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useForm, Controller } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ToastMessage } from "@components/ToastMessage";

type FormData = {
    email: string;
    password: string;
}

export function SignIn(){
    const navigator = useNavigation<AuthNavigatorRoutesProps>();

    const {control, handleSubmit, formState: {errors}} = useForm<FormData>();

    function handleNewAccount(){
        navigator.navigate("signUp");
    }

    function handleSignIn({email, password}: FormData){
        console.log(email, password)
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
                        <Button title={"Acessar"} onPress={handleSubmit(handleSignIn)}/>
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
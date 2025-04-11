import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup";
import { api } from "@services/api";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome."),
    email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
    password: yup.string().required("Informe a senha.").min(6, "A senha deve conter pelo menos 6 dígitos."),
    password_confirm: yup.string().required("Confirme a senha.").oneOf([yup.ref("password"), ""], "As senhas não são iguais.")
})

export function SignUp() {

    const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const navigator = useNavigation();

    function handleGoBack() {
        navigator.goBack();
    }

    async function handleSignUp({name, email, password, password_confirm}: FormDataProps) {

        const response = await api.post("/users", { name, email, password });
        console.log(response.data)
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
                    <Center gap={"$2"} flex={1}>
                        <Heading color={"$gray100"}>Crie sua conta</Heading>
                        <Controller
                            control={control} 
                            name="name"
                            render = {({field: {onChange, value}}) => <Input placeholder={"Nome"} onChangeText={onChange} value={value} errorMessage={errors.name?.message}/>}
                        />
                        
                        <Controller
                            control={control} 
                            name="email"
                            render = {({field: {onChange, value}}) => <Input placeholder={"E-mail"} onChangeText={onChange} value={value} keyboardType={"email-address"} autoCapitalize={"none"} errorMessage={errors.email?.message}/>}
                        />

                        <Controller
                            control={control} 
                            name="password"
                            render = {({field: {onChange, value}}) => <Input placeholder={"Senha"} onChangeText={onChange} value={value} secureTextEntry errorMessage={errors.password?.message} />}
                        />
                        <Controller
                            control={control} 
                            name="password_confirm"
                            render = {({field: {onChange, value}}) => <Input placeholder={"Confirme a senha"} onChangeText={onChange} value={value} secureTextEntry returnKeyType="send" onSubmitEditing={handleSubmit(handleSignUp)} errorMessage={errors.password_confirm?.message}/>}
                        />
                        <Button title={"Criar e acessar"} onPress={handleSubmit(handleSignUp)} />
                    </Center>
                    <Button title="Voltar para o login" variant="outline" mt={"$12"} onPress={handleGoBack} />
                </VStack>
            </VStack>
        </ScrollView>
    )
}
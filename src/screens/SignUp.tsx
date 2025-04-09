import { VStack, Image, Center, Text, Heading, ScrollView } from "@gluestack-ui/themed";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

export function SignUp() {

    const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
        defaultValues:{
            name: "Cesar",
            email: "cesar@email.com.br",
        }
    });

    const navigator = useNavigation();

    function handleGoBack() {
        navigator.goBack();
    }

    function handleSignUp({name, email, password, password_confirm}: FormDataProps) {
        console.log({name, email, password, password_confirm})
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
                            rules={{
                                required: 'Informe o nome.'
                            }}
                            render = {({field: {onChange, value}}) => <Input placeholder={"Nome"} onChangeText={onChange} value={value} errorMessage={errors.name?.message}/>}
                        />
                        
                        <Controller
                            control={control} 
                            name="email"
                            rules={{
                                required: "Informe o e-mail",
                                pattern: {
                                    value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'E-mail inválido'
                                }
                            }}
                            render = {({field: {onChange, value}}) => <Input placeholder={"E-mail"} onChangeText={onChange} value={value} keyboardType={"email-address"} autoCapitalize={"none"} errorMessage={errors.email?.message}/>}
                        />

                        <Controller
                            control={control} 
                            name="password"
                            render = {({field: {onChange, value}}) => <Input placeholder={"Senha"} onChangeText={onChange} value={value} secureTextEntry />}
                        />
                        <Controller
                            control={control} 
                            name="password_confirm"
                            render = {({field: {onChange, value}}) => <Input placeholder={"Confirme a senha"} onChangeText={onChange} value={value} secureTextEntry returnKeyType="send" onSubmitEditing={handleSubmit(handleSignUp)}/>}
                        />
                        <Button title={"Criar e acessar"} onPress={handleSubmit(handleSignUp)} />
                    </Center>
                    <Button title="Voltar para o login" variant="outline" mt={"$12"} onPress={handleGoBack} />
                </VStack>
            </VStack>
        </ScrollView>
    )
}
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, Text, VStack, useToast } from "@gluestack-ui/themed";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { ToastMessage } from "@components/ToastMessage";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';

type FormDataProps = {
    name: string;
    email: string;
    password?: string | null | undefined;
    old_password?: string | null | undefined;
    confirm_password?: string | null;
}

const profileSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe seu email.').email('Email inválido'),
    old_password: yup.string(),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 digitos').nullable().transform((value) => !!value ? value : null),
    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => !!value ? value : null)
        .oneOf([yup.ref('password')], 'A confirmação de senha não confere')
        .when('password', {
            is: (Field: any) => Field,
            then: (schema) =>
                schema.nullable().required('Informe a confirmação da senha.').transform((value) => !!value ? value : null),
        }),
}) as yup.ObjectSchema<FormDataProps, any, any>

export function Profile() {
    const [isUpdating, setIsUpdating] = useState(false);
    const toast = useToast();
    const { user, updateUserProfile } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    });

    async function handleUserPhotoSelect() {
        try {


            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            });

            if (photoSelected.canceled) return;

            const photoURI = photoSelected.assets[0].uri

            if (photoURI) {
                const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
                    size: number
                };

                //valida se é maior que 5Mb
                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
                    return toast.show({
                        placement: "top",
                        render: ({ id }) => (
                            <ToastMessage
                                id={id}
                                title="Imagem muito grande!"
                                description="Escolha uma de até 5Mb."
                                action="error"
                                onClose={() => toast.close(id)}
                            />
                        )
                    })
                }

                //setUserPhoto(photoURI)
                const fileExtension = photoSelected.assets[0].uri.split('.').pop();
                
                const photoFile = {
                    name: `${user.name}.${fileExtension}`.toLowerCase(),
                    uri: photoSelected.assets[0].uri,
                    type: `${photoSelected.assets[0].type}/${fileExtension}`
                } as any;
                
                const userPhotoUploadForm = new FormData();
                userPhotoUploadForm.append('avatar', photoFile);

                const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                const userUpdated = user;
                userUpdated.avatar = avatarUpdatedResponse.data.avatar;
                updateUserProfile(userUpdated);

                toast.show({
                    placement: "top",
                    render: ({ id }) => (
                        <ToastMessage
                            id={id}
                            title="Foto Atualizada!"
                            action="success"
                            onClose={() => toast.close(id)}
                        />
                    )
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleProfileUpdate(data: FormDataProps) {
        try{
            setIsUpdating(true);
            const userUpdated = user;
            userUpdated.name = data.name;
            await api.put("/users", data);
            await updateUserProfile(userUpdated);
        }catch(error){
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os exercícios"

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
            setIsUpdating(false);
        }
    }
    return (
        <VStack flex={1}>
            <ScreenHeader title={"Perfil"} />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center mt={"$6"} px={"$10"}>
                    <UserPhoto
                        source={user.avatar ? {uri: `${api.defaults.baseURL}/avatar/${user.avatar}`} : defaultUserPhotoImg }
                        alt={"Foto du usuário"}
                        size={"xl"}
                    />
                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text
                            color={"$green500"}
                            fontFamily={"$heading"}
                            fontSize={"$md"}
                            mt={"$2"}
                            mb={"$8"}
                        >
                            Alterar Foto
                        </Text>
                    </TouchableOpacity>
                    <Center w={"$full"} gap={"$4"}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder={"Nome"} bg={"$gray600"} value={value} onChangeText={onChange} errorMessage={errors.name?.message} />
                            )}
                        />
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder={"E-mail"} bg={"$gray600"} isReadOnly value={value} onChangeText={onChange} />
                            )}
                        />
                    </Center>
                    <Heading
                        alignSelf={"flex-start"}
                        fontFamily={"$heading"}
                        color={"$gray200"}
                        fontSize={"$md"}
                        mt={"$12"}
                        mb={"$2"}>
                        Alterar Senha
                    </Heading>
                    <Center w={"$full"} gap={"$4"}>
                        <Controller
                            control={control}
                            name="old_password"
                            render={({ field: { onChange } }) => (
                                <Input placeholder="Senha antiga" bg={"$gray600"} secureTextEntry onChangeText={onChange} />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange } }) => (
                                <Input placeholder="Nova senha" bg={"$gray600"} secureTextEntry onChangeText={onChange} errorMessage={errors.password?.message} />
                            )}
                        />
                        <Controller
                            control={control}
                            name="confirm_password"
                            render={({ field: { onChange } }) => (
                                <Input placeholder="Confirme a nova senha" bg={"$gray600"} secureTextEntry onChangeText={onChange} errorMessage={errors.confirm_password?.message}/>
                            )}
                        />
                        <Button title={"Atualizar"} onPress={handleSubmit(handleProfileUpdate)} isLoading={isUpdating} />
                    </Center>
                </Center>

            </ScrollView>
        </VStack>
    )
}
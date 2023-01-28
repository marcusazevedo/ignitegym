import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useAuth } from "@hooks/useAuth";
import userDefaultAvatar from '@assets/userPhotoDefault.png';

const PHOTO_SIZE = 33;

export function Profile(){
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/marcusazevedo.png');
  const { user } = useAuth();
  const toast = useToast();

  async function handleUserPhotoSelect(){
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });
  
      if(photoSelected.canceled){
        return;
      }

      if(photoSelected.assets[0].uri){
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 3){
          toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 3MB.',
            placement: 'top',
            bg: 'red.500'
          })
                    
          return;
        }
        
        setUserPhoto(photoSelected.assets[0].uri)
      }
      
    } catch (error){

      console.log(error);

    } finally {

      setPhotoIsLoading(false);

    }
  }

  return(
    <VStack flex={1}>
      <ScreenHeader title="Perfil"/>

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          { photoIsLoading ?
          <Skeleton 
            w={PHOTO_SIZE} 
            h={PHOTO_SIZE} 
            rounded='full' 
            startColor="gray.500"
            endColor='gray.400'
          />
          :
          <UserPhoto 
          source={user.avatar ? {uri: user.avatar} : userDefaultAvatar}
            size={PHOTO_SIZE}
            alt='Imagem do usuário'
          />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>Alterar foto</Text>
          </TouchableOpacity>

          <Input
            placeholder="Nome"
            bg='gray.600'
          />

          <Input
            placeholder="jonhdoe@google.com"
            bg='gray.600'
            isDisabled
          />
        </Center>

        <VStack px={10} mb={9} mt={12}>
          <Heading fontFamily='heading' color='gray.200' fontSize='md' mb={2} alignSelf='flex-start'>
            Alterar senha
          </Heading>

          <Input
            bg='gray.600'
            placeholder='Senha antiga'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Nova senha'
            secureTextEntry
          />

          <Input
            bg='gray.600'
            placeholder='Confirme a nova senha'
            secureTextEntry
          />

          <Button title="Atualizar" mt={4}/>
        </VStack>

      </ScrollView>
    </VStack>
  )
}
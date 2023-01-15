import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const PHOTO_SIZE = 33;

export function Profile(){
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

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
            source={{uri: 'https://github.com/marcusazevedo.png'}}
            size={PHOTO_SIZE}
            alt='Imagem do usuário'
          />
          }

          <TouchableOpacity>
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
          <Heading color='gray.200' fontSize='md' mb={2} alignSelf='flex-start'>
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
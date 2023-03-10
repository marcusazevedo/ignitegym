import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRouterProps } from '@routes/auth.routes';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from '@services/api';
import axios from 'axios';
import { Alert } from 'react-native';
import { AppError } from '@utils/AppError';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

type InputsProps = {
  name: string,
  email: string,
  password: string,
  password_confirm: string,
};

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup.string().required('Informe a senha').min(6, 'Senha mínima de 6 dígitos'),
  password_confirm: yup.string().required('Informe a confirmação da senha').min(6, 'Senha mínima de 6 dígitos').oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais.'),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<InputsProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation<AuthNavigatorRouterProps>();

  function handleSignIn(){
    navigation.navigate('signIn');
  }

  async function handleSignUp({ name, email, password }: InputsProps) {
    try {
      setIsLoading(true);

      await api.post('/users', { name, email, password });
      await signIn(email, password);
      
    } catch(error) {
      setIsLoading(false);

      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500'
      });
    }    
  }

  return (
    <ScrollView 
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
    > 
      <VStack flex={1} bg='gray.700' px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt='Pessoas treinando'
          resizeMode='contain'
          position='absolute'
        />
        
        <Center my={24}>
          <LogoSvg/>

          <Text color='gray.100' fontSize='sm'>
            Treine sua mente e seu corpo
          </Text>
        </Center>
        <Center>
          <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Nome'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />   

          <Controller
            control={control}
            name='password_confirm'
            render={({ field: { onChange, value } }) => (
              <Input 
                placeholder='Confirme a Senha'
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType='send'
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title='Criar e acessar'
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

          <Button
            mt={12}
            title='Voltar para o login'
            variant='outline'
            onPress={handleSubmit(handleSignUp)}
          />    

      </VStack>
    </ScrollView>
  )
}
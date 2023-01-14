import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';
import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRouterProps } from '@routes/auth.routes';
 
export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRouterProps>();

  function handleSignIn(){
    navigation.navigate('signIn');
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

          <Input 
            placeholder='Nome'
          />
          
          <Input 
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <Input 
            placeholder='Senha'
            secureTextEntry
          />

          <Button
            title='Criar e acessar'
          />
        </Center>

          <Button
            mt={24}
            title='Voltar para o login'
            variant='outline'
            onPress={handleSignIn}
          />    

      </VStack>
    </ScrollView>
  )
}
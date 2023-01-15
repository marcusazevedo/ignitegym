import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRouterProps } from "@routes/app.routes";
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import { useState } from "react";

export function Home(){
  const [groups, setGroups] = useState(['costas', 'biceps', 'triceps', 'ombro'])
  const [exercises, setExercises] = useState(['Puxada frontal', 'Remada lateral', 'Supino de lado', 'Twist carpado', 'Remada alguma coisa', 'Pulando de costas'])
  const [groupSelected, setGroupSelected] = useState('costas');
  
  const navigation = useNavigation<AppNavigatorRouterProps>();

  function handleOpenExerciseDetails(){
    navigation.navigate('exercise');
  }

  return(
    <VStack flex={1}>
      <HomeHeader/>

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group 
          name={item}
          isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
          onPress={() => setGroupSelected(item)}
        />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between' mb={5}>
          <Heading color='gray.200' fontSize='md'>
            Exercícios
          </Heading>

          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}
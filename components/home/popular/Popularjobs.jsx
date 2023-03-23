import React,{useState} from 'react'
import { View, Text, TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import  useFetch  from '../../../hooks/useFetch'

import { COLORS,SIZES } from '../../../constants'
import styles from './popularjobs.style'

import PopularJobCard from '../../common/cards/popular/PopularJobCard'
const Popularjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "Java developer,INDIA",
    num_pages: "1",
  });

  // console.log(data);

  // const isLoading = false;
  // const error = false;
  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something didn't work well</Text>
        ) : (
          <FlatList
            // data = {[1,2,3,4]}
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs;
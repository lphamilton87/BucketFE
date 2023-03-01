import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import UserContext from '../Contexts/userContext';
import axios from 'axios';
import { postNewLocation } from '../Utils/api';

const AddToBucket = ({ locationData, setAddedLocation }) => {
  const loggedInUser = useContext(UserContext);
  const user = loggedInUser.username;

  const handleNewLocation = (e) => {
    let locationName =  locationData.display_name.split(",")
    const postBody = {
      name: locationName[0],
      coordinates: [`${locationData.lon}`, `${locationData.lat}`],
    };
    postNewLocation(postBody);
  };

  const handleSubmit = (e) => {
    let locationName =  locationData.display_name.split(",")
    const patchBody = {
      name: locationName[0],
    };
    setAddedLocation(locationData.display_name);
    return axios.patch(
      `https://red-muddy-woodpecker.cyclic.app/api/${user}/list`,
      patchBody
    );
  };

  return (
    <TouchableOpacity
      style={styles.add}
      onPress={async () => {
        try {
          handleNewLocation();
        } finally {
          handleSubmit();
        }
      }}
    >
      <Text>Add To Your Bucket List</Text>
    </TouchableOpacity>
    
  );
};
const styles = StyleSheet.create({
  add: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#444444',
    borderRadius: 10,
    marginTop: 20,
  },
});
export default AddToBucket;

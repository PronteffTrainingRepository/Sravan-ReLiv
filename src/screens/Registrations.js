import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  Picker,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DatePicker from "react-native-datepicker";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Registrations({ navigation }) {
  // const DismissKeyboard = ({ children }) => (
  //   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  //     {children}
  //   </TouchableWithoutFeedback>
  // );

  const keyboardVerticalOffset =
    Platform.OS === "android" ? -ht * 1 : -ht * 0.1;

  useEffect(() => {
    getPermissionAsync();
  }, []);

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const [markers, changeMarkers] = useState([]);

  const [region, changeRegion] = useState({
    latitude: 17.4435,
    longitude: 78.3772,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  onRegionChange = (region) => {
    changeRegion({ region });
  };
  const [image, setImage] = useState("null");
  const [value, onChangeText] = React.useState();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [job, setJob] = useState("");
  const [mail, setMail] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [address, setAddress] = useState("");
  return (
    // Main View Starts
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1C1853" />
      <View style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            // behavior="position"
          >
            <View style={{ marginTop: ht * 0.02, marginBottom: ht * 0.02 }}>
              <Image
                style={styles.logo}
                source={require("../../assets/reliv.png")}
              />
            </View>
            {/* From starts */}
            <View style={styles.form}>
              {/*Header of Form Starts  */}
              <View
                style={{
                  backgroundColor: "#3377CA",
                  borderRadius: 15,
                  borderBottomEndRadius: 0,
                  borderBottomLeftRadius: 0,
                  height: ht * 0.06,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: ht * 0.026,
                    paddingLeft: wd * 0.038,
                    paddingTop: wd * 0.025,
                    opacity: 0.8,
                    fontWeight: "bold",
                  }}
                >
                  Registration
                </Text>
              </View>
              {/* Header Of Form Ends */}

              {/* Image Picker Section Starts */}
              <View style={{ flexDirection: "row", height: ht * 0.16 }}>
                <View style={{ marginLeft: wd * 0.038, marginTop: ht * 0.045 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      opacity: 0.5,
                      fontSize: ht * 0.02,
                    }}
                  >
                    Customer pro pic
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        opacity: 0.5,
                        fontSize: ht * 0.02,
                      }}
                    >
                      selfie/ upload){" "}
                    </Text>
                    <Feather
                      style={{ paddingLeft: wd * 0.02, opacity: 0.3 }}
                      name="camera"
                      size={22}
                      color="black"
                    />
                    <Entypo
                      style={{ paddingLeft: wd * 0.02, opacity: 0.3 }}
                      name="images"
                      size={22}
                      color="black"
                    />
                  </View>
                </View>

                <View style={{ width: wd * 0.8 }}>
                  <View
                    style={{
                      top: -ht * 0.032,
                      left: wd * 0.12,
                      width: ht * 0.16,
                      height: ht * 0.16,
                      borderRadius: (ht * 0.16) / 2,
                      backgroundColor: "lightgrey",
                      borderColor: "white",
                    }}
                  >
                    <TouchableOpacity onPress={_pickImage}>
                      {image === "null" ? (
                        <Image
                          source={require("../../assets/reliv.png")}
                          resizeMode="cover"
                          style={{
                            width: ht * 0.16,
                            height: ht * 0.16,
                            borderRadius: (ht * 0.16) / 2,
                            backgroundColor: "lightgrey",
                          }}
                        />
                      ) : (
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: ht * 0.16,
                            height: ht * 0.16,
                            borderRadius: (ht * 0.16) / 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* Image Picker Section Ends */}

              {/* Form data Starts */}
              <View style={{ top: -ht * 0.03 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="black"
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
                <DatePicker
                  style={{
                    width: wd * 0.84,
                    height: ht * 0.05,
                    marginTop: ht * 0.008,
                    marginBottom: ht * 0.008,
                    marginLeft: ht * 0.02,
                  }}
                  date={date}
                  mode="date"
                  format="DD-MM-YYYY"
                  minDate="01-01-1947"
                  maxDate="01-12-2031"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateText: {
                      opacity: 1,
                      fontSize: ht * 0.02,
                      fontWeight: "bold",
                    },
                    dateIcon: {
                      position: "absolute",
                      right: 0,
                      top: 4,
                      marginLeft: 80,
                    },
                    dateInput: {
                      borderRadius: 5,
                      borderWidth: 0.5,
                      borderColor: "grey",
                      opacity: 0.5,
                      paddingRight: wd * 0.57,
                    },
                  }}
                  onDateChange={(date) => {
                    setDate(date);
                  }}
                />
                <View style={styles.drop}>
                  <Picker
                    selectedValue={selectedValue}
                    style={{
                      height: ht * 0.05,
                      width: wd * 0.85,
                      opacity: 0.8,
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }
                  >
                    <Picker.Item label="Gender" />

                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Others" value="Others" />
                  </Picker>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Occupation"
                  placeholderTextColor="black"
                  onChangeText={(tex) => setJob(tex)}
                  value={job}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mail Id"
                  placeholderTextColor="black"
                  onChange={(tex) => setMail(tex)}
                  value={mail}
                />
                <View style={styles.drop}>
                  <Picker
                    selectedValue={selectValue}
                    style={{
                      height: ht * 0.05,
                      width: wd * 0.85,
                      opacity: 0.8,
                      fontWeight: "bold",
                      fontSize: ht * 0.04,
                    }}
                    onValueChange={(itemValue) => setSelectValue(itemValue)}
                  >
                    <Picker.Item
                      label="Blood Group"
                      value=""
                      itemstyle={{ fontSize: ht * 0.08 }}
                    />

                    <Picker.Item label="A" value="A" />
                    <Picker.Item label="B" value="B" />
                    <Picker.Item label="AB" value="AB" />
                    <Picker.Item label="O" value="O" />
                  </Picker>
                </View>

                <TextInput
                  style={styles.address}
                  placeholder="Address"
                  placeholderTextColor="black"
                  onChangeText={(text) => setAddress(text)}
                  value={address}
                />
                {/* <TextInput
                  onFocus={() => navigation.navigate("location")}
                  style={styles.input}
                  placeholder="Location"
                  placeholderTextColor="black"
                /> */}
                <View style={styles.mapV}>
                  <MapView
                    style={styles.map}
                    region={region}
                    onRegionChange={() => onRegionChange}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    minZoomLevel={0}
                  >
                    <Marker draggable coordinate={region} />
                  </MapView>
                  {/* <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: 37.78825,
                      longitude: -122.4324,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  /> */}

                  {/* <TouchableOpacity>
                    <View style={styles.button}>
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: ht * 0.02,
                        }}
                      >
                        Submit Location
                      </Text>
                    </View>
                  </TouchableOpacity> */}
                </View>
              </View>
              {/* From data Ends */}
              <TouchableOpacity
                onPress={() => {
                  console.log(date);
                  if (name.length === 0) {
                    alert("Name is Required");
                  } else if (name.length >= 16) {
                    alert("Name Should Not be Greater Than 15 Characters");
                  } else if (date === "") {
                    alert("date is required");
                  } else if (selectedValue === "") {
                    alert("Gender is required");
                  } else if (job === "") {
                    alert("Occupation is required");
                  } else if (job.length > 10) {
                    alert("Job Profile Should be Less Than 10 Characters");
                  } else if (mail === "") {
                    alert("Email ID is required");
                  } else if (selectValue === "") {
                    alert("Blood Group is required");
                  } else if (address === "") {
                    alert("Address is required");
                  } else {
                    navigation.navigate("bodyparameters");
                  }
                }}
                style={{
                  backgroundColor: "#40C397",
                  borderRadius: ht * 0.8,
                  width: wd * 0.12,
                  height: ht * 0.06,
                  borderColor: "#40C397",
                  //borderWidth: 1,
                  position: "absolute",
                  left: wd * 0.4,
                  bottom: -ht * 0.035,
                  justifyContent: "center",
                  zIndex: 5,
                }}
              >
                <AntDesign
                  style={{ alignSelf: "center" }}
                  name="arrowright"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            {/* Form Ends */}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </>
    // {/* // Main View Ends */}
  );
}

export default Registrations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1853",
    alignItems: "center",
    justifyContent: "center",
    height: ht * 1,
  },
  input: {
    borderColor: "grey",
    borderWidth: 0.5,
    width: wd * 0.84,
    height: ht * 0.05,
    marginTop: ht * 0.008,
    marginBottom: ht * 0.008,
    marginLeft: ht * 0.02,
    paddingLeft: wd * 0.025,
    borderRadius: 5,
    opacity: 0.45,
    fontSize: ht * 0.02,
    fontWeight: "bold",
    // fontStyle:"normal"
  },
  drop: {
    borderColor: "grey",
    borderWidth: 0.5,
    width: wd * 0.84,
    height: ht * 0.05,
    marginTop: ht * 0.008,
    marginBottom: ht * 0.008,
    marginLeft: ht * 0.02,
    paddingLeft: -wd * 0.02,
    borderRadius: 5,
    opacity: 0.6,
    fontWeight: "bold",
    fontSize: ht * 0.02,
  },
  address: {
    borderColor: "grey",
    borderWidth: 0.5,
    width: wd * 0.84,
    height: ht * 0.07,
    paddingTop: ht * 0.008,
    paddingBottom: ht * 0.008,
    paddingLeft: wd * 0.04,
    marginLeft: ht * 0.02,
    paddingLeft: wd * 0.025,
    borderRadius: 5,
    opacity: 0.45,
    fontSize: ht * 0.02,
    fontWeight: "bold",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 15,
    width: wd * 0.92,
    height: ht * 0.925,
    marginBottom: ht * 0.08,
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
  },
  logo: {
    width: wd * 0.25,
    height: wd * 0.25,
    borderRadius: 10,
    alignSelf: "center",
  },
  map: {
    width: wd * 0.83,
    height: ht * 0.2,
  },
  mapV: {
    marginTop: ht * 0.01,
    marginBottom: ht * 0.02,
    borderRadius: 5,
    overflow: "hidden",
    width: wd * 0.83,
    height: ht * 0.2,
    alignSelf: "center",
  },
  button: {
    width: wd * 0.35,
    height: ht * 0.06,
    backgroundColor: "orange",
    alignSelf: "center",
    justifyContent: "center",
  },
});

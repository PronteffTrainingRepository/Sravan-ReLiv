import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  s,
} from "react-native";
import Constants from "expo-constants";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { WebView } from "react-native-WebView";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;
const initialValues = {
  height: "",
  weight: "",
  neck: "",
  arm: "",
  wrist: "",
  waist: "",
  fist: "",
  hip: "",
};

function BodyParameters() {
  let [time, setTime] = useState("");
  let [date, setDate] = useState("");
  let [values, setvalues] = useState(initialValues);

  // console.log(values);

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor("#2480e2");
    var date, TimeType, hour, minutes, fullTime;
    date = new Date();
    hour = date.getHours();
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if (hour <= 11) {
      TimeType = "AM";
    } else {
      // If the Hour is Not less than equals to 11 then Set the Time format as PM.
      TimeType = "PM";
    }
    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if (hour > 12) {
      hour = hour - 12;
    }

    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format.
    if (hour == 0) {
      hour = 12;
    }
    // Getting the current minutes from date object.
    minutes = date.getMinutes();

    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    }
    // Adding all the variables in fullTime variable.
    fullTime =
      hour.toString() + ":" + minutes.toString() + " " + TimeType.toString();
    fullDate = day + "/" + month + "/" + year;

    setTime((time = fullTime));
    setDate((date = fullDate));
  }, []);

  //  const handleChange=(e,name)=>{
  //         setvalues({
  //             ...values,
  //             [name]:e
  //         })
  //     }

  const handleChange = (e, name) => {
    const input = e;
    if (/^[0-9.]+$/.test(input) || input === "") {
      setvalues({
        ...values,
        [name]: e,
      });
    }
  };

  // restrict = (event) => {

  //     const regex = new RegExp("/^[^!-\\/:-@\\[-`{-~]+$/,;");
  //     const keycode = String.fromCharCode(!event.charCode ? event.which : event.charCode);
  //     if (!regex.test(keycode)){

  //             event.preventDefault();
  //             return false;
  //     }
  //     else {
  //         return true;
  //     }
  // }

  function setWhr() {
    if (values.waist > 0 && values.height > 0) {
      let whr = values.waist / (values.height * 12);
      return whr;
    } else {
      let whr = 0;
      return whr;
    }
  }

  function setFat() {
    // let weight = values.weight
    let lbmass = values.weight * 1.082 + 94.42 - values.waist * 4.15;
    if (lbmass > 0 && values.weight > 0) {
      let bodyFat = values.weight - lbmass;
      let fatpercent = bodyFat / values.weight;
      return fatpercent * 100;
    } else {
      return 0;
    }
  }

  function WhrText() {
    if (setWhr() == 0) {
      return null;
    } else if (setWhr() >= 1) {
      return null;
    } else if (setWhr() < 0.42) {
      return "UnderWeight";
    } else if (setWhr() >= 0.42 && setWhr() < 0.49) {
      return "Normal";
    } else if (setWhr() >= 0.49 && setWhr() < 0.54) {
      return "Over-Weight";
    } else if (setWhr() >= 0.54 && setWhr() < 0.58) {
      return "Obese";
    } else if (setWhr() >= 0.58) {
      return "Morbidly";
    }
  }

  function fatText() {
    if (setFat() == 0) {
      return null;
    } else if (setFat() > 0 && setFat() < 21) {
      return "Low";
    } else if (setFat() >= 21 && setFat() < 33) {
      return "Normal";
    } else if (setFat() >= 33 && setFat() < 39) {
      return "High";
    } else if (setFat() > 39) {
      return "Very High";
    }
  }

  function BMI() {
    let weight1 = values.weight;
    let height1 = values.height;
    if (weight1 > 0 && height1 > 0) {
      let bmi = weight1 / (height1 * 0.3048);
      return bmi;
    } else {
      return 0;
    }
  }

  function BMIText() {
    if (BMI() > 0 && BMI() <= 18) {
      return "Under Weight";
    } else if (BMI() >= 19 && BMI() < 23) {
      return "NORMAL";
    } else if (BMI() >= 23 && BMI() < 30) {
      return "Over Weight";
    } else if (BMI() >= 31 && BMI() < 40) {
      return "Obese";
    } else if (BMI() > 40) {
      return "Morbidly";
    }
  }

  // console.log('mass',setFat().lbmass);
  // console.log('whrtext',WhrText());
  // console.log('BMI',BMI());
  // console.log('whr',setWhr())
  // console.log('fat',setFat())

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginBottom: ht * 0.045 }}>
        <View style={styles.headView}>
          {/* <View style={styles.head1}> */}
          <View style={{ justifyContent: "center" }}>
            <Image
              style={styles.logo}
              source={require("../../assets/reliv.png")}
              resizeMode="cover"
            />
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                color: "white",
                fontSize: ht * 0.028,
                fontWeight: "bold",
              }}
            >
              Body Parameters
            </Text>
          </View>
          {/* </View>
                <View style={styles.head2}> */}
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                color: "#EFF0F1",
                fontSize: ht * 0.016,
                alignItems: "flex-end",
              }}
            >
              {time}
            </Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text style={{ color: "#EFF0F1", fontSize: ht * 0.016 }}>
              {date}
            </Text>
          </View>
          {/* </View> */}
        </View>
        {/* image and BMI */}
        <View>
          <View style={styles.proview}>
            <View>
              <MaterialIcons
                name="notifications-active"
                style={{
                  backgroundColor: "rgb(31, 224, 242)",
                  borderRadius: ht * 0.06,
                  marginRight: wd * 0.069,
                  alignSelf: "flex-end",
                  marginBottom: ht * -0.059,
                  marginTop: ht * 0.023,
                }}
                size={24}
                color="white"
              />
              <Image
                style={styles.progress}
                source={require("../../assets/bmi.png")}
                resizeMode="cover"
              />
            </View>
            <View>
              <View
                style={{
                  width: ht * 0.09,
                  height: ht * 0.09,
                  backgroundColor: "white",
                  marginTop: -ht * 0.14,
                  marginLeft: wd * 0.405,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: ht * 0.02, fontWeight: "bold" }}>
                  BMI
                </Text>
                <Text style={{ fontSize: ht * 0.04, fontWeight: "bold" }}>
                  {BMI() == 0 ? null : BMI().toFixed(1)}
                </Text>
                <Text style={{ fontSize: ht * 0.017, fontWeight: "bold" }}>
                  {BMIText()}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: wd,
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: ht * 0.01,
                marginTop: ht * 0.01,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "rgb(9, 189, 234)",
                    fontSize: ht * 0.02,
                    fontWeight: "bold",
                  }}
                >
                  Under Weight
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: "rgb(3, 119, 32)",
                    fontSize: ht * 0.02,
                    fontWeight: "bold",
                  }}
                >
                  Normal
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: "rgb(237, 197, 40)",
                    fontSize: ht * 0.02,
                    fontWeight: "bold",
                  }}
                >
                  Obese
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: "rgb(191, 65, 30)",
                    fontSize: ht * 0.02,
                    fontWeight: "bold",
                  }}
                >
                  More Obese
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* card-2 */}
        <View style={{ backgroundColor: "white", elevation: 5 }}>
          <View style={styles.heightview}>
            {/* Height */}
            <View style={styles.inputview}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ht * 0.023 }}>Height</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <TextInput
                  keyboardType={"numeric"}
                  name="height"
                  value={values.height}
                  onChangeText={(e) => handleChange(e, "height")}
                  style={styles.inputfield}
                />
                <Text> feet</Text>
              </View>
            </View>

            {/* Weight */}
            <View style={styles.inputview}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ht * 0.023 }}>Weight</Text>
                <Text>(Preferably Early Morning)</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <TextInput
                    keyboardType={"numeric"}
                    name="weight"
                    value={values.weight}
                    onChangeText={(e) => handleChange(e, "weight")}
                    style={styles.inputfield}
                  />
                  <Text> kg</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign
                    name="plus"
                    size={12}
                    color="black"
                    style={{ paddingRight: ht * 0.009 }}
                  />
                  <MaterialIcons
                    name="notifications-active"
                    style={{
                      backgroundColor: "rgb(31, 224, 242)",
                      borderRadius: ht * 0.06,
                      marginRight: wd * 0.069,
                    }}
                    size={24}
                    color="white"
                  />
                </View>
              </View>

              {/* <Switch  value={switchValue}  onValueChange ={(switchValue)=>setSwitchValue({switchValue})}   />  */}
            </View>
            {/* Circumfrence */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: ht * 0.026,
                justifyContent: "space-between",
                marginBottom: ht * 0.02,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Text style={{ fontSize: ht * 0.023 }}>
                  Circumfrence{" "}
                  <Text style={{ fontSize: ht * 0.016 }}> (in inches)</Text>
                </Text>
              </View>
              <View></View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  name="plus"
                  size={12}
                  color="black"
                  style={{ paddingRight: ht * 0.009 }}
                />
                <MaterialIcons
                  name="notifications-active"
                  style={{
                    backgroundColor: "rgb(31, 224, 242)",
                    borderRadius: ht * 0.06,
                    marginRight: wd * 0.069,
                  }}
                  size={24}
                  color="white"
                />
              </View>
            </View>
          </View>
        </View>

        {/* BodyParts View */}
        <View style={{ backgroundColor: "whitesmoke", elevation: 5 }}>
          <View style={styles.partsview}>
            <View style={styles.inputview}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ht * 0.023 }}>Neck</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <TextInput
                    keyboardType={"numeric"}
                    name="neck"
                    value={values.neck}
                    onChangeText={(e) => handleChange(e, "neck")}
                    style={styles.inputfield}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign
                    name="plus"
                    size={12}
                    color="black"
                    style={{
                      paddingRight: ht * 0.009,
                      marginRight: wd * 0.069,
                    }}
                  />
                  {/* <MaterialIcons name="notifications-active" style={{backgroundColor:'rgb(31, 224, 242)',borderRadius:ht*0.06,marginRight:wd*0.069 }} size={24} color="white" /> */}
                </View>
              </View>
            </View>

            <View style={styles.inputview}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ht * 0.023 }}>Uppar Arm</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <TextInput
                    keyboardType={"numeric"}
                    name="arm"
                    value={values.arm}
                    onChangeText={(e) => handleChange(e, "arm")}
                    style={styles.inputfield}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign
                    name="plus"
                    size={12}
                    color="black"
                    style={{
                      paddingRight: ht * 0.009,
                      marginRight: wd * 0.069,
                    }}
                  />
                  {/* <MaterialIcons name="notifications-active" style={{backgroundColor:'rgb(31, 224, 242)',borderRadius:ht*0.06,marginRight:wd*0.069 }} size={24} color="white" /> */}
                </View>
              </View>
            </View>

            <View style={styles.inputview}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ht * 0.023 }}>Wrist</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <TextInput
                    keyboardType={"numeric"}
                    name="wrist"
                    value={values.wrist}
                    onChangeText={(e) => handleChange(e, "wrist")}
                    style={styles.inputfield}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign
                    name="plus"
                    size={12}
                    color="black"
                    style={{
                      paddingRight: ht * 0.009,
                      marginRight: wd * 0.069,
                    }}
                  />
                  {/* <MaterialIcons name="notifications-active" style={{backgroundColor:'rgb(31, 224, 242)',borderRadius:ht*0.06,marginRight:wd*0.069 }} size={24} color="white" /> */}
                </View>
              </View>
            </View>

            <View style={styles.inputview}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ht * 0.023 }}>Waist(mid)</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <TextInput
                    keyboardType={"numeric"}
                    name="waist"
                    value={values.waist}
                    onChangeText={(e) => handleChange(e, "waist")}
                    style={styles.inputfield}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign
                    name="plus"
                    size={12}
                    color="black"
                    style={{
                      paddingRight: ht * 0.009,
                      marginRight: wd * 0.069,
                    }}
                  />
                  {/* <MaterialIcons name="notifications-active" style={{backgroundColor:'rgb(31, 224, 242)',borderRadius:ht*0.06,marginRight:wd*0.069 }} size={24} color="white" /> */}
                </View>
              </View>
            </View>

            <View style={styles.inputview}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ht * 0.023 }}>Fist</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <TextInput
                    keyboardType={"numeric"}
                    name="fist"
                    value={values.fist}
                    onChangeText={(e) => handleChange(e, "fist")}
                    style={styles.inputfield}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign
                    name="plus"
                    size={12}
                    color="black"
                    style={{
                      paddingRight: ht * 0.009,
                      marginRight: wd * 0.069,
                    }}
                  />
                  {/* <MaterialIcons name="notifications-active" style={{backgroundColor:'rgb(31, 224, 242)',borderRadius:ht*0.06,marginRight:wd*0.069 }} size={24} color="white" /> */}
                </View>
              </View>
            </View>

            <View style={styles.inputview}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ht * 0.023 }}>Hip</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    flex: 1,
                  }}
                >
                  <TextInput
                    keyboardType={"numeric"}
                    name="hip"
                    value={values.hip}
                    onChangeText={(e) => handleChange(e, "hip")}
                    style={styles.inputfield}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AntDesign
                    name="plus"
                    size={12}
                    color="black"
                    style={{
                      paddingRight: ht * 0.009,
                      marginRight: wd * 0.069,
                    }}
                  />
                  {/* <MaterialIcons name="notifications-active" style={{backgroundColor:'rgb(31, 224, 242)',borderRadius:ht*0.06,marginRight:wd*0.069 }} size={24} color="white" /> */}
                </View>
              </View>
            </View>
            {/* BAR-1 */}
            <View style={{ marginBottom: ht * 0.01, marginTop: ht * 0.02 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: ht * 0.023 }}>
                  Waist to Height Ratio :-{" "}
                  <Text style={{ color: "tomato" }}>
                    {" "}
                    {setWhr() <= 0 ? null : setWhr().toFixed(2)} {WhrText()}
                  </Text>
                </Text>

                <AntDesign
                  name="plus"
                  size={12}
                  color="black"
                  style={{ paddingRight: ht * 0.009, marginRight: wd * 0.069 }}
                />
                {/* <MaterialIcons name="notifications-active" style={{backgroundColor:'rgb(31, 224, 242)',borderRadius:ht*0.06,marginRight:wd*0.069 }} size={24} color="white" /> */}
              </View>

              <View
                style={{
                  padding: ht * 0.02,
                  marginTop: ht * 0.008,
                  marginRight: ht * 0.02,
                  elevation: 6,
                  backgroundColor: "white",
                  borderRadius: ht * 0.015,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    height: ht * 0.013,
                    position: "relative",
                  }}
                >
                  {setWhr() == 0 ? null : setWhr() >= 1 ? null : (
                    <View
                      style={{
                        position: "absolute",
                        left: setWhr() * (wd * 0.8),
                        top: -ht * 0.005,
                        height: ht * 0.022,
                        width: wd * 0.04,
                        backgroundColor: "rgb(242, 199, 157)",
                        zIndex: 4,
                        borderRadius: ht * 0.5,
                      }}
                    ></View>
                  )}
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgb(8, 168, 154)",
                      borderTopLeftRadius: ht * 0.01,
                      borderBottomLeftRadius: ht * 0.01,
                    }}
                  ></View>
                  <View
                    style={{ flex: 1, backgroundColor: "rgb(77, 181, 63)" }}
                  ></View>
                  <View
                    style={{ flex: 1, backgroundColor: "rgb(234, 205, 60)" }}
                  ></View>
                  <View
                    style={{ flex: 1, backgroundColor: "rgb(221, 86, 62)" }}
                  ></View>
                  <View
                    style={{
                      flex: 2,
                      backgroundColor: "rgb(119, 7, 7)",
                      borderTopRightRadius: ht * 0.01,
                      borderBottomRightRadius: ht * 0.01,
                    }}
                  ></View>
                </View>
              </View>
            </View>

            {/* BAR-2 */}
            <View style={{ marginBottom: ht * 0.01, marginTop: ht * 0.04 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: ht * 0.023 }}>
                  BodyFat % :-{" "}
                  <Text style={{ color: "tomato" }}>
                    {" "}
                    {setFat() <= 0
                      ? null
                      : setFat().toFixed(0)} {fatText()}{" "}
                  </Text>
                </Text>
                <AntDesign
                  name="plus"
                  size={12}
                  color="black"
                  style={{ paddingRight: ht * 0.009, marginRight: wd * 0.069 }}
                />
              </View>
              <View
                style={{
                  padding: ht * 0.02,
                  marginTop: ht * 0.008,
                  marginRight: ht * 0.02,
                  elevation: 6,
                  backgroundColor: "white",
                  borderRadius: ht * 0.015,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    height: ht * 0.013,
                    position: "relative",
                  }}
                >
                  {setFat() == 0 ? null : (
                    <View
                      style={{
                        position: "absolute",
                        left: setFat() * wd * 0.008,
                        top: -ht * 0.005,
                        height: ht * 0.022,
                        width: wd * 0.04,
                        backgroundColor: "rgb(242, 199, 157)",
                        zIndex: 4,
                        borderRadius: ht * 0.5,
                      }}
                    ></View>
                  )}
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "rgb(8, 168, 154)",
                      borderTopLeftRadius: ht * 0.01,
                      borderBottomLeftRadius: ht * 0.01,
                    }}
                  ></View>
                  {/* <View style={{flex:1,backgroundColor:'rgb(77, 181, 63)'}}></View> */}
                  <View
                    style={{ flex: 1, backgroundColor: "rgb(234, 205, 60)" }}
                  ></View>
                  <View
                    style={{ flex: 0.8, backgroundColor: "rgb(221, 86, 62)" }}
                  ></View>
                  <View
                    style={{
                      flex: 4.2,
                      backgroundColor: "rgb(119, 7, 7)",
                      borderTopRightRadius: ht * 0.01,
                      borderBottomRightRadius: ht * 0.01,
                    }}
                  ></View>
                </View>
                <WebView source={{ uri: "https://reactnative.dev/" }} />;
                {/* <WebView source={{ uri: "https://www.javatpoint.com" }} /> */}
                {/* <ActivityIndicator   animating = {true} size="small" color="blue" />   */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: "whitesmoke",
          elevation: 5,
          padding: ht * 0.008,
          position: "absolute",
          bottom: 0,
          width: wd,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity>
          <FontAwesome5 name="home" size={24} color="rgb(104, 110, 117)" />
        </TouchableOpacity>

        <TouchableOpacity>
          <FontAwesome5 name="bell" size={24} color="rgb(104, 110, 117)" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="message-processing"
            size={24}
            color="rgb(104, 110, 117)"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default BodyParameters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#2480e2",
  },

  headView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginBottom: ht * 0.03,
    paddingTop: ht * 0.015,
    paddingLeft: ht * 0.015,
    paddingRight: ht * 0.015,
    elevation: 5,
  },
  logo: {
    height: ht * 0.06,
    width: ht * 0.06,
    borderRadius: (ht * 0.06) / 2,
    resizeMode: "cover",
  },
  progress: {
    height: ht * 0.25,
    width: ht * 0.25,
    alignSelf: "center",
    resizeMode: "contain",
  },
  proview: {
    backgroundColor: "white",

    borderTopRightRadius: wd * 0.07,
    borderTopLeftRadius: wd * 0.07,
    elevation: 5,
  },
  textview: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  heightview: {
    backgroundColor: "whitesmoke",
    borderTopRightRadius: ht * 0.04,
    borderTopLeftRadius: ht * 0.04,
    paddingLeft: wd * 0.06,
    elevation: 5,
  },
  inputview: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: ht * 0.026,
    justifyContent: "space-between",
  },
  inputfield: {
    height: ht * 0.036,
    width: wd * 0.16,
    backgroundColor: "white",
    fontSize: ht * 0.02,
    borderWidth: ht * 0.001,
    borderColor: "black",
    paddingLeft: ht * 0.006,
  },
  partsview: {
    backgroundColor: "white",
    borderTopRightRadius: ht * 0.05,
    borderTopLeftRadius: ht * 0.05,
    paddingLeft: wd * 0.06,
    elevation: 5,
  },
  track: {
    height: 1,
    backgroundColor: "#303030",
  },
  thumb: {
    width: 50,
    height: 30,
    backgroundColor: "rgba(150, 150, 150, 0.3)",
    borderColor: "rgba(150, 150, 150, 0.6)",
    borderWidth: 14,
    borderRadius: 15,
  },
});

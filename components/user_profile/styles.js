import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/scale";

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "relative",
    alignItems: "center",
    top: verticalScale(40),
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 0,
  },
  profileName: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  hashtag: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#797C7B",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 25,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 44,
    marginTop: 10,
  },
  iconGroup: {
    backgroundColor: "#051D13",
    padding: 10,
    borderRadius: 50,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: verticalScale(450),
  },
  dragger: {
    alignSelf: "center",
    backgroundColor: "#D3D3D3",
    width: 30,
    height: 3,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
  },
  infoContent: {
    paddingHorizontal: horizontalScale(15),
  },
  inputContainer: {
    paddingTop: moderateScale(15),
    paddingLeft: moderateScale(10),
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#000",
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#797C7B",
  },
  mediaShared: {
    width: 92,
    height: 92,
    borderRadius: 16,
  },
  viewAllText: {
    position: "relative",
    bottom: 24,
    textAlign: "right",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#24786D",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#24786D",
    padding: 12,
    borderRadius: 20,
    marginTop: 16,
  },
});

export default styles;

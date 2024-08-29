import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
  },
  bottomBarContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    marginBottom: 30,
  },
  recordButtonContainer: {
    flex: 1.5,
    marginHorizontal: 20,
  },
  recordButton: {
    backgroundColor: "#ff4040",
    borderRadius: 100,
    height: 75,
    width: 75,
    alignSelf: "center",
    borderWidth: 10,
    borderColor: "#8B000040",
  },
  recordButtonDisabled: {
    backgroundColor: "#800000",
  },
  galleryButton: {
    borderRadius: 10,
    overflow: "hidden",
    width: 70,
    height: 70,
  },
  galleryButtonImage: {
    width: 65,
    height: 65,
  },
  sideBarContainer: {
    top: 60,
    right: 0,
    marginHorizontal: 30,
    marginVertical: 20,
    position: "absolute",
  },
  iconText: {
    color: "white",
    fontSize: 20,
    marginTop: 5,
  },
  sideBarButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  counterCircularProgress: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  countdownBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 6,
  },
});

export default styles;

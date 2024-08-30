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
    marginBottom: 60,
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
    borderColor: "#80000040",
  },
  recordButtonDisabled: {
    backgroundColor: "#80000040",
  },
  sideBarContainer: {
    top: 50,
    right: 0,
    marginHorizontal: 30,
    marginVertical: 20,
    position: "absolute",
  },
  sideBarButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 0,
  },
  backButton: {
    alignSelf: "flex-start",
    marginVertical: 10,
    marginHorizontal: 20,
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
    bottom: 2,
    width: "100%",
    height: 8,
  },
});

export default styles;

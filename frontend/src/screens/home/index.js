import React from "react";
import { View, Text, Image, ImageBackground, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import styles from "./styles";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import { theme } from "../../constants/theme";

export default function HomeScreen() {
  const banner = require("../../images/bg.jpeg");
  const model = require("../../images/player.jpg");
  const forehand = require("../../images/forehand.png");
  const backhand = require("../../images/backhand.png");
  const serve = require("../../images/serve.png");
  const next = require("../../images/next.png");
  const couple = require("../../images/teachvideo.png");
  const star = require("../../images/Star.png");
  const play = require("../../images/play.png");
  const book = require("../../images/Book.png");
  const backteach = require("../../images/backteach.png");
  const serveteach = require("../../images/serveteach.png");

  const data = [
    {
      name: "Forehand",
      status: 24,
      image: forehand,
      lightColor: theme.colors.lightyellow,
      color: theme.colors.yellow,
      darkColor: theme.colors.darkyellow,
    },
    {
      name: "Backhand",
      status: 50,
      image: backhand,
      lightColor: theme.colors.lightblue,
      color: theme.colors.lightgreen,
      darkColor: theme.colors.darkblue,
    },
    {
      name: "Serve",
      status: 90,

      image: serve,
      lightColor: theme.colors.lightpurple,
      color: theme.colors.purple,
      darkColor: theme.colors.darkpurple,
    },
  ];

  const videoData = [
    {
      title: "Forehand Training",
      description: "2 Hour Forehand Training",
      duration: "45 Min",
      level: "Beginner",
      image: couple,
    },
    {
      title: "Backhand Training",
      description: "1.5 Hour Backhand Training",
      duration: "40 Min",
      level: "Intermediate",
      image: backteach,
    },
    {
      title: "Serve Training",
      description: "1 Hour Serve Practice",
      duration: "30 Min",
      level: "Advanced",
      image: serveteach,
    },
  ];

  const Card = ({ data, index }) => {
    return (
      <View
        style={{
          flex: 1,
          height: index === 1 ? 180 : 150,
          padding: 10,
          alignSelf: "center",
          backgroundColor: data.color,
          justifyContent: "space-between",
          marginHorizontal: 8,
          borderRadius: 10,
          shadowColor: "lightgrey",
          shadowOffset: { width: -5, height: 5 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <Image source={data.image} style={styles.dataimage} />
        <View style={{ alignSelf: "center", margin: 10 }}>
          <Progress.Circle
            size={50}
            showsText={true}
            progress={data.status / 100}
            formatText={() => data.status + "%"}
            unfilledColor="#ededed"
            borderColor="#ededed"
            color={data.darkColor}
            direction="counter-clockwise"
            strokeCap="round"
            thickness={5}
            style={styles.circlestyle}
            textStyle={styles.textStyle}
          />
        </View>
        <Text style={styles.cirText}>{"Day      1"}</Text>
        <Text style={styles.cirText}>{"Count   50times"}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>{data.name}</Text>
          <View
            style={styles.circleView}
          >
            <Image
              source={next}
              style={styles.circleNext}
            />
          </View>
        </View>
      </View>
    );
  };

  const VideoPlay = ({ video }) => (
    <View style={styles.videoCard}>
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        <ImageBackground
          source={video.image}
          style={styles.VideoImage}
        ></ImageBackground>
        <Text style={styles.videoText}>{video.title}</Text>
        <View style={styles.videoplay1}>
          <Image source={star} style={styles.videoImage} />
        </View>
      </View>

      <View style={styles.videoplay2}>
        <View style={styles.videoplay3}>
          <Image source={play} style={styles.videoImage} />
        </View>
        <Text>
          {video.description}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.cirText}>
            <Image source={book} style={styles.bookStyle} />
            {"   "}
            {video.level}
          </Text>
          <Text style={styles.videotext}>{video.duration}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <ScreenWrapper bg="white">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text}>User Name</Text>
          </View>
          <ScrollView style={styles.screen}>
            <ImageBackground style={styles.banner} source={banner}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.title}>Get Started</Text>
                <Text style={styles.title}>Just Do It!</Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </ImageBackground>

            <View style={styles.activitiesContainer}>
              <Text style={styles.activitiesTitle1}>Practices</Text>
              <View style={{ flexDirection: "row" }}>
                {data.map((item, index) => (
                  <Card key={item.name} data={item} index={index} />
                ))}
              </View>
            </View>

            <View style={{ padding: 10, alignItems: "flex-start" }}>
              <Text style={styles.titleVideo}>Tutorial Video</Text>
              <ScrollView
                horizontal
                style={{ paddingBottom: 20, paddingTop: 10 }}
              >
                {videoData.map((video, index) => (
                  <VideoPlay key={index} video={video} />
                ))}
              </ScrollView>
            </View>
            <Image source={model} style={styles.model} resizeMode="contain" />
          </ScrollView>
        </View>
      </ScreenWrapper>
    </>
  );
}

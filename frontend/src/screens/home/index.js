import React from "react";
import { View, Text, Image, ImageBackground, ScrollView } from "react-native";
import * as Progress from "react-native-progress";
import styles from "./styles";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";

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
      status: 1,
      image: forehand,
      lightColor: "#f8e4d9",
      color: "#F2E8CF",
      darkColor: "#fac5a4",
    },
    {
      name: "Backhand",
      status: 1,
      image: backhand,
      lightColor: "#d7f0f7",
      color: "#D4E7B5",
      darkColor: "#aceafc",
    },
    {
      name: "Serve",
      status: 1,
      image: serve,
      lightColor: "#dad5fe",
      color: "#e8f7fc",
      darkColor: "#8860a2",
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
        <Image source={data.image} style={{ height: 25, width: 25 }} />
        <View style={{ alignSelf: "center", margin: 10 }}>
          <Progress.Circle
            size={50}
            progress={data.status / 100}
            showsText={true}
            formatText={(progress) => `${Math.round(progress * 100)}%`}
            unfilledColor="#ededed"
            borderColor="#ededed"
            color={data.darkColor}
            direction="counter-clockwise"
            strokeCap="round"
            thickness={5}
            style={{
              elevation: 2,
              overflow: "hidden",
            }}
            textStyle={{
              fontSize: 18,
              fontFamily: "Poppins-Bold",
              fontWeight: "bold",
            }}
          />
        </View>
        <Text style={{ fontSize: 10 }}>{"Day      1"}</Text>
        <Text style={{ fontSize: 10 }}>{"Count   50times"}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Poppins-Regular" }}>{data.name}</Text>
          <View
            style={{
              backgroundColor: data.lightColor,
              padding: 2,
              borderRadius: 10,
            }}
          >
            <Image
              source={next}
              style={{
                height: 12,
                width: 12,
                resizeMode: "contain",
              }}
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
          style={{
            height: 150,
            width: 300,
          }}
        ></ImageBackground>
        <Text style={styles.videoText}>{video.title}</Text>
        <View style={styles.videoplay1}>
          <Image source={star} style={{ height: 10, width: 10 }} />
        </View>
      </View>

      <View style={styles.videoplay2}>
        <View style={styles.videoplay3}>
          <Image source={play} style={{ height: 10, width: 10 }} />
        </View>
        <Text style={{ fontFamily: "Poppins-Regular" }}>
          {video.description}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 12 }}>
            <Image source={book} style={{ height: 15, width: 15 }} />
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

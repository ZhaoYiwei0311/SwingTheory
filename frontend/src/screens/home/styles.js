import { StyleSheet } from "react-native";
import { hp, wp } from "../../constants/common";
import { theme } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: wp(4)
      },
    text: {
        fontSize: hp(2.7),
        fontWeight: theme.fonts.bold,
        color: theme.colors.primary,
    },
    banner: {
        marginTop: '5%',
        padding: 30, 
        resizeMode: 'contain', 
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row',
    },
    model: {
        position:'absolute',
        right: 0,
        bottom: 154,
        zIndex: 10,
        height: '127%',
        width: '30%',
        borderRadius: 30,
    },
    title: {
        fontSize: hp(2.6),
        fontWeight: theme.fonts.bold,
        color: theme.colors.textDark,
    },
    activitiesContainer: {
        marginBottom: 0,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    activitiesTitle1: {
        fontSize: hp(2.7),
        fontFamily: 'Poppins-Medium',
        fontWeight: theme.fonts.bold,
        color: theme.colors.textDark,
    },
    videoCard:{
        borderRadius: 15,
        marginHorizontal: 12,
        shadowOffset: { width: -5, height: 3 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        backgroundColor: '#fff',
    },
    videoText:{
        position: 'absolute',
        bottom: 5,
        left: 10,
        fontFamily: 'Poppins-Regular',
        color: '#fff',
    },
    videoplay1: {
        position: 'absolute',
        backgroundColor: '#fff',
        padding: 5,
        right: 10,
        top: 10,
        borderRadius: 5,
    },
    videoplay2: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
    },
    videoplay3: {
        position: 'absolute',
        backgroundColor: '#8860a2',
        padding: 10,
        right: 25,
        top: -15,
        borderRadius: 15,
        zIndex: 3,
      },
    videotext:{
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#8860a2',
    },
    screen: {
        margin: '3%',
        flex: 1,
    }


});

export default styles;
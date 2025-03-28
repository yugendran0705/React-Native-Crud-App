import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native'
import IcedCoffeeImg from '@/assets/images/iced-coffee.png'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IcedCoffeeImg}
        resizeMode='cover'
        style = {styles.image}
      s>
        <Text style={styles.text}>Coffee Shop</Text>
        <Link href='/menu' style={{marginHorizontal: 'auto'}} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Our Menu</Text>
          </Pressable>
        </Link>
        <Link href='/contact' style={{marginHorizontal: 'auto'}} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Contact Us</Text>
          </Pressable>
        </Link>
      </ImageBackground>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    text:{
        fontSize: 42,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: 120,
    },
    link:{
        fontSize: 42,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 4,
    },
    button:{
        backgroundColor: 'rgba(0,0,0,0.75)',
        height: 60,
        borderRadius: 20,
        padding: 6,
        justifyContent: 'center',
        marginBottom: 50,
        width: 150
    },
    buttonText:{
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 4,
    },
    image:{
      width: '100%',
      height: '100%',
      flex:1,
      resizeMode: 'cover',
      justifyContent: 'center',
    }
})
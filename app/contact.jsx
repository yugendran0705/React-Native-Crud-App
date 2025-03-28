import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

const Contact = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Contact</Text>
      <View style={styles.block}>
        <Text style={styles.text}>Location: ABC</Text>
        <Text style={styles.text}>Phone: 
          <Link href="tel:123456789" style={styles.link}>123456789</Link>
        </Text>
        <View style={styles.textView}>
          <Text style={styles.text}>
            Hours:{'\n'}
            <Text>Open 6am to 4pm daily.</Text>{'\n'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Contact

const styles = StyleSheet.create({
    title:{
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20
    },
    text:{
        fontSize: 24,
        textAlign: 'center',
        display: 'block',
    },
    view:{
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: '#6F4E37'
    },
    block:{
      // flex: 1,
      flexDirection: 'column',
    }
})
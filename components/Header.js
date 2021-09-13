import React,{ useState, useEffect } from 'react'
import { StyleSheet, Animated,View} from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'


export default function Header(props) {
  const [ animacion ] = useState( new Animated.Value(0) );

  useEffect(() => {
    Animated.timing(
        animacion, {
            toValue: 22,  // al valor al que llega
            duration: 1000, // cantidad de tiempo en llegar
            useNativeDriver:false
            
        }
    ).start(); // iniciar la animación
  }, []);

  return  (
    <View>
      <Animated.Text 
          style={[styles.header, { fontSize: animacion }]} {...props}
      ></Animated.Text>
  </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})

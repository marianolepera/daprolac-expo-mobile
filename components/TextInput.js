import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {theme} from '../core/theme';

const TextInput = ({errorText, ...props}) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      theme={{colors: {primary: theme.colors.primary}}}
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 3,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);




// import React, { memo } from 'react'
// import { View, StyleSheet, Text } from 'react-native'
// import { TextInput as Input } from 'react-native-paper'
// import { theme } from '../core/theme'

// function TextInput({ errorText, description, ...props }) {
//   return (
//     <View style={styles.container}>
//       <Input
//         style={styles.input}
//         selectionColor={theme.colors.primary}
//         underlineColor="transparent"
//         mode="outlined"
//         {...props}
//       />
//       {description && !errorText ? (
//         <Text style={styles.description}>{description}</Text>
//       ) : null}
//       {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     marginVertical: 12,
//   },
//   input: {
//     backgroundColor: theme.colors.surface,
//   },
//   description: {
//     fontSize: 13,
//     color: theme.colors.secondary,
//     paddingTop: 8,
//   },
//   error: {
//     fontSize: 13,
//     color: theme.colors.error,
//     paddingTop: 8,
//   },
// })

// export default memo(TextInput)
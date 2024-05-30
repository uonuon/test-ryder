import React from 'react';
import {Platform, Text} from 'react-native';

export default function TextMonospace({children, ...props}) {
  const fontFamily = Platform.OS === 'ios' ? 'Courier New' : 'monospace';

  return (
    <Text style={{fontFamily, fontSize: 12}} {...props}>
      {children}
    </Text>
  );
}

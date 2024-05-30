import React from 'react';
import {Button} from 'react-native-paper';
import {Props} from 'react-native-paper/lib/typescript/components/Button/Button';

interface CommandButtonProps extends Omit<Props, 'children'> {
  onPress: () => void;
  label: string;
}
const CommandButton = ({onPress, label, ...props}: CommandButtonProps) => {
  return (
    <Button mode="contained" onPress={onPress} style={{marginBottom: 10}} {...props}>
      {label}
    </Button>
  );
};

export default CommandButton;

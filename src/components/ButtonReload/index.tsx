import React from 'react';
import {TouchableOpacity, Platform, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../utils/colors';

interface IButtonReload {
  action: () => void;
}

const ButtonReload = ({action}: IButtonReload) => {
  const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';

  return (
    <TouchableOpacity style={styles.reloadIcon} onPress={action}>
      <Ionicons name={reloadIconName} size={24} color={colors.PRIMARY_COLOR} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reloadIcon: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
});

export default ButtonReload;

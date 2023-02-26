import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TopBar from './TopBar';
import BurgerMenu from './BurgerMenu';

export default function MyPage() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.container}>
      <TopBar>
        <TouchableOpacity onPress={toggleMenu}>
          <Text>Menu</Text>
        </TouchableOpacity>
      </TopBar>
      <BurgerMenu visible={showMenu} onClose={toggleMenu} />
      {/* Contenu de la page */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

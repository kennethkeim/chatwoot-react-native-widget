import React, { useEffect, useState } from 'react';
import { View, Appearance } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { storeHelper, findColors } from './utils';
import WebView from './WebView';
import styles from './style';
import { COLOR_WHITE } from './constants';

const propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  websiteToken: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  cwCookie: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    email: PropTypes.string,
    identifier_hash: PropTypes.string,
  }),
  locale: PropTypes.string,
  colorScheme: PropTypes.oneOf(['dark', 'light', 'auto']),
  customAttributes: PropTypes.shape({}),
  closeModal: PropTypes.func,
  insets: PropTypes.shape({
    bottom: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  })
};

const ChatWootWidget = ({
  isModalVisible,
  baseUrl,
  websiteToken,
  user = {},
  locale = 'en',
  colorScheme = 'light',
  customAttributes = {},
  closeModal,
  insets
}) => {
  const [cwCookie, setCookie] = useState('');

  useEffect(() => {
    async function fetchData() {
      const value = await storeHelper.getCookie();
      setCookie(value);
    }
    fetchData();
  }, []);
  const appColorScheme = Appearance.getColorScheme();

  const { headerBackgroundColor, mainBackgroundColor } = findColors({
    colorScheme,
    appColorScheme,
  });
  return (
    <Modal
      backdropColor={COLOR_WHITE}
      coverScreen
      isVisible={isModalVisible}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={styles.modal}>

      <View style={[styles.headerView, { backgroundColor: headerBackgroundColor }, {
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }]} />

      <View style={[styles.mainView, { backgroundColor: mainBackgroundColor }]}>
        <WebView
          websiteToken={websiteToken}
          cwCookie={cwCookie}
          user={user}
          baseUrl={baseUrl}
          locale={locale}
          colorScheme={colorScheme}
          customAttributes={customAttributes}
          closeModal={closeModal}
        />
      </View>
    </Modal>
  );
};

ChatWootWidget.propTypes = propTypes;

export default ChatWootWidget;

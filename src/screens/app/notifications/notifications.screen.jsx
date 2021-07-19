import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';

import { getUserNotificationHistoryAction } from '../../../reducers/user-reducer/user-notifications.actions';
import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import useTheme from '../../../theme/hooks/useTheme';
import { NotificationHistoryCard, LoadingComponent } from '../../../components';

const NotificationHistoryScreen = () => {
  const dispatch = useDispatch();
  const { Gutters } = useTheme();

  const { notificationHistory, notificationHistoryLoading } = useSelector(userSelector);

  const _loadTransactions = () => {
    dispatch(getUserNotificationHistoryAction());
  };

  useFocusEffect(
    React.useCallback(() => {
      _loadTransactions();
    }, []),
  );

  return !notificationHistoryLoading ? (
    <View style={[Gutters.smallHPadding]}>
      <Text h1>Notification History</Text>
      <SafeAreaView>
        <NotificationHistoryCard items={notificationHistory} />
      </SafeAreaView>
    </View>
  ) : (
    <LoadingComponent />
  );
};

export default NotificationHistoryScreen;

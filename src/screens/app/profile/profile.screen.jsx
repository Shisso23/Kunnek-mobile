import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { userSelector } from '../../../reducers/user-reducer/user.reducer';
import { getFullProfileAction } from '../../../reducers/user-reducer/user.actions';
import useTheme from '../../../theme/hooks/useTheme';
import ParallaxView from '../../../components/molecules/parallax-view';
import CardsList from '../../../components/molecules/cards-list';
import { AccountsList, LoadingComponent, ReviewsList, VehiclesList } from '../../../components';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, creditCards, bankAccounts, vehicles, reviews } = useSelector(userSelector);
  const { Colors, Common, Layout, Gutters } = useTheme();
  const [isLoading, setIsLoading] = useState();

  const _loadUserMeta = () => {
    setIsLoading(true);
    dispatch(getFullProfileAction()).then(() => setIsLoading(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      _loadUserMeta();
    }, []),
  );

  return !isLoading ? (
    <ParallaxView user={user}>
      <View style={[Common.bottomDrawer]}>
        <View style={[Layout.rowCenterSpaceBetween]}>
          <Text h1>{user.fullName}</Text>
          <IconButton
            icon={() => <Icon name="pencil-alt" color={Colors.black} size={20} />}
            onPress={() => {}}
          />
        </View>
        <View
          style={[
            Common.viewCard,
            Layout.rowCenterSpaceAround,
            Gutters.regularPadding,
            Gutters.largeTMargin,
            Gutters.smallBMargin,
          ]}
        >
          <TouchableOpacity
            style={[Layout.colCenter]}
            onPress={() => navigation.push('TransactionHistory')}
          >
            <Icon name="credit-card" color={Colors.green} size={20} />
            <Text style={[Gutters.smallTMargin, Common.centerText]}>Transaction History</Text>
          </TouchableOpacity>
          <View style={[Common.smallDivider]} />
          <TouchableOpacity
            style={[Layout.colCenter]}
            onPress={() => navigation.push('NotificationHistory')}
          >
            <Icon name="bell" color={Colors.orange} size={20} />
            <Text style={[Gutters.smallTMargin, Common.centerText]}>Notification History</Text>
          </TouchableOpacity>
        </View>

        <SafeAreaView>
          <CardsList items={creditCards} />
          <AccountsList items={bankAccounts} />
          <VehiclesList items={vehicles} />
          <ReviewsList items={reviews} />
        </SafeAreaView>
      </View>
    </ParallaxView>
  ) : (
    <LoadingComponent />
  );
};

ProfileScreen.propTypes = {};

ProfileScreen.defaultProps = {};

export default ProfileScreen;

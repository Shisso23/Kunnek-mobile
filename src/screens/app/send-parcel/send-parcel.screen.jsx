import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FormScreenContainer } from '../../../components';
import { parcelRequestModel } from '../../../models/app/parcel-request/parcel-request.model';
import { useTheme } from '../../../theme';
import { SendParcelItemDetailsForm } from '../../../components/forms';
import Index from '../../../components/atoms/title';
import { Colors } from '../../../theme/Variables';
import SendParcelDeliverAndReceiverDetailsForm from '../../../components/forms/parcel-request/send-parcel-deliver-and-receiver-details.form';
import CreditCardForm from '../../../components/forms/credit-card/credit-card.form';

const screenWidth = Dimensions.get('window').width;

const SendParcelScreen = () => {
  const navigation = useNavigation();
  const { Gutters } = useTheme();
  const [formIndex, setFormIndex] = React.useState(0);
  const [form, setForm] = React.useState({});
  const isCarousel = React.useRef(null);

  const _handleSubmit = (currentForm) => {
    console.log(currentForm);

    setForm({ ...form, ...currentForm });
  };

  const _handleSuccess = () => {
    navigation.navigate('ParcelDeliveryDetails');
  };

  // eslint-disable-next-line react/prop-types
  const _renderCarouselItem = ({ item }) => <View>{item.content}</View>;

  const formData = [
    {
      content: (
        <SendParcelItemDetailsForm
          initialValues={parcelRequestModel()}
          submitForm={_handleSubmit}
          onSuccess={_handleSuccess}
          containerStyle={[Gutters.smallHMargin]}
        />
      ),
    },
    {
      content: (
        <SendParcelDeliverAndReceiverDetailsForm
          initialValues={parcelRequestModel()}
          submitForm={_handleSubmit}
          onSuccess={_handleSuccess}
          containerStyle={[Gutters.smallHMargin]}
        />
      ),
    },
    {
      content: (
        <CreditCardForm
          initialValues={parcelRequestModel()}
          submitForm={_handleSubmit}
          onSuccess={_handleSuccess}
          containerStyle={[Gutters.smallHMargin]}
        />
      ),
    },
  ];

  return (
    <FormScreenContainer>
      <Pagination
        dotsLength={formData.length}
        activeDotIndex={formIndex}
        carouselRef={isCarousel}
        dotStyle={styles.carouselDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
      />
      <Index title="Send Parcel" />
      <Divider />
      <Carousel
        ref={isCarousel}
        data={formData}
        renderItem={_renderCarouselItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        useScrollView
        onSnapToItem={setFormIndex}
      />
    </FormScreenContainer>
  );
};

SendParcelScreen.propTypes = {};

SendParcelScreen.defaultProps = {};

export default SendParcelScreen;

const styles = StyleSheet.create({
  carouselDotStyle: {
    backgroundColor: Colors.carouselDotsColour,
    borderRadius: 5,
    height: 5,
    marginHorizontal: 0,
    paddingHorizontal: 20,
    width: 100,
  },
});

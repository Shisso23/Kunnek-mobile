/* eslint-disable global-require */
/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default () => ({
  sendParcelIcon: require('../assets/images/send-parcel-icon.png'),
  deliverParcelIcon: require('../assets/images/deliver-parcel-icon.png'),
  parcelsIcon: require('../assets/images/parcels-icon.png'),
});

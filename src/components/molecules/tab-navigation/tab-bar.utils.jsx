import useTheme from '../../../theme/hooks/useTheme';

const { Images } = useTheme();

function getIcon(route) {
  switch (route) {
    case 'Home':
      return Images.home;
    case 'Community':
      return Images.community;
    case 'Bookings':
      return Images.bookings;
    default:
      return undefined;
  }
}

export default {
  getIcon,
};

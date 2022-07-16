import { Dimensions, StyleSheet } from "react-native"

export const windowSize = Dimensions.get('window');

export default StyleSheet.create({
  background: {
    backgroundColor: 'lightgray',
    height: windowSize.height,
    width: windowSize.width,
    display: 'flex',
    flexDirection: 'column',
  },
  contentArea: {
    padding: windowSize.width * 0.025,
  },
  evaluationCardContainer: {
    // TODO: height needs to change to accomodate content
    backgroundColor: 'white',
    borderRadius: windowSize.width * 0.025,
    minHeight: windowSize.height * 0.15,
    marginBottom: windowSize.height * 0.01,
    padding: windowSize.width * 0.01,
  },
  evaluationCardTextContainer: {
    flexGrow: 1,
    width: 0,
  },
  evaluationCardTitle: {
    fontFamily: 'roboto',
    color: 'black',
    fontSize: windowSize.width * 0.08,
    flexWrap: 'wrap',
  },
  evaluationCardDescription: {
    fontFamily: 'roboto',
    color: 'black',
    fontSize: windowSize.width * 0.04,
    flexWrap: 'wrap',
  },
  evaluationCardContent: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    flexShrink: 1,
  },
  evaluationCardIconContainer: {
    alignSelf: 'center',
    marginRight: windowSize.width * 0.01,
  },
});

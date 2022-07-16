import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles, { windowSize } from './styles';

export enum EvaluationCriteria {
  Exposure,
  GlobalBlur,
  BackgroundBlur,
  WhiteBalance,
};

interface EvaluationCriteriaProps {
  name: string,
  descriptionGood: string,
  // descriptionTooHigh: string,
  // descriptionTooLow: string,
  // TODO: define threshold for low/high and provide feedback accordingly
  icon: string,
};

const evaluationCriteriaProps: Record<EvaluationCriteria, EvaluationCriteriaProps> = {
  [EvaluationCriteria.Exposure]: {
    name: 'Exposure',
    descriptionGood: 'Your image is properly exposed. Good job!',
    icon: 'contrast-box',
  },
  [EvaluationCriteria.GlobalBlur]: {
    name: 'Overall Blur',
    descriptionGood: 'The entire image is sharp. Well done.',
    icon: 'blur',
  },
  [EvaluationCriteria.BackgroundBlur]: {
    name: 'Background Blur',
    descriptionGood: 'The subject is in focus, while the background is blurred. Nice job emphasizing the subject!',
    icon: 'image-filter-center-focus',
  },
  [EvaluationCriteria.WhiteBalance]: {
    name: 'White Balance',
    descriptionGood: 'Your image has proper white balance, and the tones look natural.',
    icon: 'white-balance-sunny',
  },
};

interface EvaluationCardProps {
  criteria: EvaluationCriteria,
};

const EvaluationCard: React.FC<EvaluationCardProps> = ({ criteria }) => {
  const props = evaluationCriteriaProps[criteria];

  const icon = <MaterialCommunityIcons size={windowSize.height * 0.08} name={props.icon} color="#323232" />;

  return (
    <View style={styles.evaluationCardContainer}>
      <View style={styles.evaluationCardContent}>
        <View style={styles.evaluationCardIconContainer}>
          {icon}
        </View>
        <View style={styles.evaluationCardTextContainer}>
          <Text style={styles.evaluationCardTitle}>{props.name}</Text>
          <Text style={styles.evaluationCardDescription}>{props.descriptionGood}</Text>
        </View>
      </View>
    </View>
  );
};

export default EvaluationCard;

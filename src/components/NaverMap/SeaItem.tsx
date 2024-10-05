import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomText from '../Common/CustomText';
import {CustomButton} from '../Common/CustomButton';
import color from '@/constant/color';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export interface SeaItemProps {
  location: string;
  seaName: string;
  seaLength: string;
}

const SeaItem = ({location, seaName, seaLength}: SeaItemProps) => {
  return (
    <View style={styles.seatItemWrapper}>
      <View style={styles.textContainer}>
        <View style={styles.textWrapper}>
          <CustomText style={styles.mainTitle}>행정구역</CustomText>
          <CustomText style={styles.subTitle}>{location}</CustomText>
        </View>
        <View style={styles.textWrapper}>
          <CustomText style={styles.mainTitle}>해안명</CustomText>
          <CustomText style={styles.subTitle}>{seaName}</CustomText>
        </View>
        <View style={styles.textWrapper}>
          <CustomText style={styles.mainTitle}>해안길이</CustomText>
          <CustomText style={styles.subTitle}>{seaLength}</CustomText>
        </View>
      </View>

      <CustomButton>
        <CustomText style={{color: 'white'}}>선택하기</CustomText>
      </CustomButton>
    </View>
  );
};

export default SeaItem;

const styles = StyleSheet.create({
  seatItemWrapper: {
    position: 'relative',
    width: '100%',
    padding: 20,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: '#666666',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 3,
    shadowRadius: 10,
    elevation: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 15,
  },
  mainTitle: {
    color: color.gray500,
    fontSize: heightPercentageToDP('1.8%'),
    width: '20%',
  },
  subTitle: {
    fontSize: heightPercentageToDP('1.8%'),
    flex: 1,
    color: color.black,
    fontWeight: 700,
  },
});

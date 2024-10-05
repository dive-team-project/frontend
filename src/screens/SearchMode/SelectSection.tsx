import CustomText from '@/components/Common/CustomText';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {RootStackParamList} from '../navigationTypes';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import HeaderLeftGoBack from '@/components/Common/HeaderLeftGoBack';
import NaverMap from '@/components/NaverMap/NaverMap';
import {SafeAreaView, View} from 'react-native';
import {globalStyles} from '@/styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import color from '@/constant/color';
import CarouselContainer from '@/components/NaverMap/CarouselContainer';
import GetPermissionModal from '@/components/GetPermission/GetPermissionModal';
import {getCoastListByCode, getSigunguInfo} from '@/apis/selectSection';
// import Carousel from '@/components/NaverMap/Carousel';
import {log} from '../../../node_modules/react-native-reanimated-carousel/src/utils/log';
import {ISigunguData, ISigunguDropData} from '@/@types/sigunguTypes';
import {useQuery} from 'react-query';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const SelectSection = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [sigunguList, setSigunguList] = useState<ISigunguDropData[]>();
  const [sigunguValue, setSigunguValue] = useState<ISigunguDropData | null>(
    null,
  );
  const [isFocus, setIsFocus] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '지도 선택',
      headerLeft: () => <HeaderLeftGoBack navigation={navigation} />,
    });
  }, [navigation]);

  const getSigunguInfoHandler = async () => {
    const updateList: ISigunguDropData[] = [];

    const result = await getSigunguInfo();
    // console.log('result: ', result);

    if (result.length > 0) {
      result.map(list => {
        const data = {
          label: list.sigunguName,
          value: list.sigunguCode,
        };
        updateList.push(data);
      });
    }
    setSigunguList(updateList);
  };

  getSigunguInfoHandler();

  const seaData = [
    {location: '해운대', seaName: '해안선A', seaLength: '25000'},
    {location: '광안리', seaName: '해안선B', seaLength: '30000'},
    {location: '송정', seaName: '해안선C', seaLength: '30000'},
  ];

  const {data: coastListResponseData} = useQuery(
    ['COASTLIST', sigunguValue],
    () => getCoastListByCode(sigunguValue?.value),
  );
  useEffect(()=>{
    console.log("coastListResponseData: ",coastListResponseData);
  },[coastListResponseData])

  return (
    <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
      <View style={styles.mapContainer}>
        <View style={styles.topSectionWrapper}>
          <View style={styles.topSectionFlexColumn}>
            <Icon size={30} name="list-outline" color="rgba(0,0,0,0.9)" />
            <CustomText>목록</CustomText>
          </View>

          <View style={styles.topSectionFlex}>
            <View style={styles.dropdownContainer}>
              {/* {renderLabel()} */}
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemContainerStyle}
                iconStyle={styles.iconStyle}
                data={sigunguList ? sigunguList : []}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? '구 선택' : '...'}
                searchPlaceholder="Search..."
                value={sigunguValue?.value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setSigunguValue({
                    label: item.label,
                    value: item.value,
                  });
                  setIsFocus(false);
                }}
              />
            </View>

            <View style={styles.dropdownContainer}>
              {/* {renderLabel()} */}
            </View>
          </View>
        </View>
        {/* <NaverMap /> */}

        <View style={styles.appBackground}>
          <View style={styles.carouselBox}>
            <CarouselContainer data={seaData} />
          </View>
        </View>
        {/* <View>
          <Carousel
            images={[
              'https://www.didit.store/img/ggu.png',
              'https://img.hankyung.com/photo/202309/AKR20230901035200005_01_i_P4.jpg',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSayzFV4TvY_t5ynst6FMKEchrntX5faQ6xVg&s',
            ]}
            gap={10}
            offset={36}
            pageWidth={screenWidth - (10 + 36) * 2}
          />
        </View> */}
        {/* <CarouselContainer /> */}
      </View>
    </SafeAreaView>
  );
};

export default SelectSection;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: '100%',
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  topSectionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 20,
  },
  topSectionFlex: {flexDirection: 'row', alignItems: 'center', gap: 7},
  topSectionFlexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 15,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 100,
  },
  dropdown: {
    height: 37,
    borderColor: color.gray300,
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    fontSize: heightPercentageToDP('1.8%'),
  },
  selectedTextStyle: {
    fontSize: heightPercentageToDP('1.8%'),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: heightPercentageToDP('1.8%'),
  },
  itemContainerStyle: {
    fontSize: heightPercentageToDP('1.8%'),
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 5,
    top: -4,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: heightPercentageToDP('1.1%'),
  },
  swiperContainer: {
    position: 'absolute',
    zIndex: 20,
    bottom: 20,
    backgroundColor: color.primary,
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    height: 200,
    // width: '70%',
  },
  carouselContainer: {
    width: '100%',
  },
  appBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  carouselBox: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

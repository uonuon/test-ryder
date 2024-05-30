global.Buffer = global.Buffer || require('buffer').Buffer;

import React from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import HexTab from './HexTab';
import MainTab from './MainTab';
import StacksTab from './StacksTab';

const renderScene = SceneMap({
  first: MainTab,
  second: StacksTab,
  fourth: HexTab,
});

const DebugRyderOne = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Main'},
    {key: 'second', title: 'Stacks'},
    {key: 'third', title: 'Update'},
    {key: 'fourth', title: 'Hex'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      pagerStyle={{marginBottom: 10}}
      initialLayout={{width: layout.width}}
    />
  );
};

export default DebugRyderOne;

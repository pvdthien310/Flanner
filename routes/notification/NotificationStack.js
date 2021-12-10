import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import {Image,View} from 'react-native'
import SystemNotification from '../../screens/Notification/systemNotification';
import { KnowledgeNotificationStack } from './knowledegeNotificationStack';
import { StatusNotificationStack } from './statusNotificationStack';
import { Ionicons } from '@expo/vector-icons';



const Tab = createMaterialTopTabNavigator();

export default function NotificationTab() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Knowledge Notification Stack" component={KnowledgeNotificationStack}   options={{
                    tabBarShowLabel:false,
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 5

                            }}>
                            <Image source={require('../../assets/icon/knowledge.png')}
                                resizeMode='contain'
                                style={{
                                    width: focused ? 30 : 25,
                                    height: focused ? 30 : 25,
                                    tintColor: focused ? 'black' : '#748c94',
                                    marginBottom: 2,
                                }
                                }
                            />
                           
                        </View>
                    )
                }} />
                      <Tab.Screen name="Status Notification Stack" component={StatusNotificationStack} options={{
                     tabBarShowLabel:false,
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 5

                            }}>
                               
                            <Image source={require('../../assets/icon/status.png')}
                                resizeMode='contain'
                                style={{
                                    width: focused ? 30 : 25,
                                    height: focused ? 30 : 25,
                                    tintColor: focused ? 'black' : '#748c94',
                                    marginBottom: 2,
                                }
                                }
                            />
                           
                        </View>
                    )
                }} />

                 <Tab.Screen name="System Notification" component={SystemNotification}   options={{
                    tabBarShowLabel:false, 
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 5
                            }}>
                            {/* <Image source={require('../../assets/icon/rocket.png')}
                                resizeMode='contain'
                                style={{
                                    width: focused ? 30 : 25,
                                    height: focused ? 30 : 25,
                                    tintColor: focused ? 'black' : '#748c94',
                                    marginBottom: 2,
                                }
                                }
                            /> */}
                             <Ionicons  style={{
                                    width: focused ? 30 : 25,
                                    height: focused ? 30 : 25,
                                    color: focused ? 'black' : '#748c94',
                                    marginBottom: 2,
                                }
                                } name="ios-hardware-chip-outline" size={ focused ? 30 : 24} color="black" />
                           
                        </View>
                    )
                }} />
    </Tab.Navigator>
  );
}
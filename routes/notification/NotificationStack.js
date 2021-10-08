import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import KnowledgeNotification from '../../screens/Notification/knowledgeNotification';
import StatusNotification from '../../screens/Notification/statusNotification';
import * as React from 'react';
import {Image,View} from 'react-native'
import SystemNotification from '../../screens/Notification/systemNotification';



const Tab = createMaterialTopTabNavigator();

export default function NotificationTab() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Knowledge Notification" component={KnowledgeNotification}   options={{
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
                      <Tab.Screen name="Status Notification" component={StatusNotification} options={{
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
                            <Image source={require('../../assets/icon/rocket.png')}
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
    </Tab.Navigator>
  );
}
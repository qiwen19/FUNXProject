import React from 'react';
import {Footer, FooterTab, Button, Icon, Text} from  'native-base';
import {TabNavigator} from "react-navigation";


export default (MainScreenNavigator = TabNavigator(
    {
        Login: { screen: Login },
    },
    {
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return(
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon name="navigate"></Icon>
                            <Text>Navigation</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="man"></Icon>
                            <Text>Profile</Text>
                        </Button>
                        <Button vertical>
                            <Icon name="gift"></Icon>
                            <Text>Rewards</Text>
                        </Button>
                    </FooterTab>
                </Footer>
    
            );
        }
    }

));


// export default class footerLayout extends React.Component{

//     render()
//     {
       
//     }
// }

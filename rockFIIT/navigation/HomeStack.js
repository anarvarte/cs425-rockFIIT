import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import LogIn from '../screens/LogInScreen';
import SignUp from '../screens/SignUpScreen';

const screens = {
    LogIn:{
        screen: LogIn
    },
    SignUp:{
        screen: SignUp
    },

}

const HomeStack = createStackNavigator({screens});

export default createAppContainer(HomeStack);
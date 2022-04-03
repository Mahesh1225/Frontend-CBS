import axios from 'axios';
import {userActions} from '../store/userSlice';
import {useDispatch} from 'react-redux';

export const fetchUser = (emailId) =>{

  const API_URL = "http://localhost:3000";
 // const emailId = "abhimhamane13@gmail.com";

    return async (dispatch) => {

        const fetchHandle = async () =>{
            const res = await axios.get(`${API_URL}/users/${emailId}`);
            return res.data[0];
        }

        try{
            const user = await fetchHandle();
            console.log(user);
            dispatch(userActions.updateUser({userId:user.userId,
            userPath:user.userPath,userName:user.userName,parentFolderId:"mydash"}));
        }
        catch(err)
        {
            console.log(err);
        }
    }
}
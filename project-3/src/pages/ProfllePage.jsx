import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
const ProfilePage=()=>{
    const {currentUser, handleLogout} = useContext(AuthContext);
    
    return(
        <div className="profile-page">
            <h2>Welcome, {currentUser?.username ||'User'}!</h2>
          
            <hr/>
            <h3>Your Mood History</h3>
            <p>COMING SOON.....</p>
            <h3>Saved recommendation</h3>
            <p>COMING SOON</p>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
        </div>
    )
}
export default ProfilePage;

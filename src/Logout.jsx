import { useNavigate } from 'react-router-dom';
import { logoutUser } from './services/auth';

const Logout = () => {
  const navigate = useNavigate();
    const handleLogout = async() => {
         try {
      const response = await logoutUser()
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login"); 
      }
    } catch (error) {
     console.log(error);
     
    } 
    }
  return (
    <div onClick={handleLogout}>Logout</div>
  )
}

export default Logout
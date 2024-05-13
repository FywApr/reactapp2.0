import { CircularProgress } from '@mui/material';
import  { FC, useEffect } from 'react';
import { useAuth } from '../../features/auth';
import { useNavigate } from '@tanstack/react-router';
import { Profile } from '../../features/models/Profile';
import { apiService } from '../../app/services/api/ApiService';

interface Props {

}

export const InitPage: FC<Props> = function InitPage() {
    const { token, resetToken, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!token) return;

        (async () => {
            try{
                const response = await apiService.get<Profile>({ url: "/profile" });
                
                setUser(response.data);
            } catch (error) {
                resetToken();
                navigate({
                    to: "/login",
                })
            }
        })();
    }, [token]);

  return (
    <div className={'flex flex-col h-screen justify-center items-center'}>
        <CircularProgress />
    </div>
  )
};
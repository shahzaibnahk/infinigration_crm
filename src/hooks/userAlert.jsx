import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useAlert = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const alert = (message, error, success_route) => {
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
            if (success_route) {
                navigate(success_route);
            }
        }

        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }
    };

    return alert;
};

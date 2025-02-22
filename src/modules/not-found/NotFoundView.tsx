import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";

const NotFoundView = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();


  const back = () => {
    if (isAuthenticated && role === "admin") {
      navigate('/admin/dashboard')
    }

    if (isAuthenticated && role === "manager") {
      navigate('/manager/dashboard')
    }

    if (isAuthenticated && role === "coordinator") {
      navigate('/coordinator/dashboard')
    }

    if (isAuthenticated && role === "student") {
      navigate('/student/dashboard')
    }

    if (isAuthenticated && role === "guest") {
      navigate('/')
    }

    if(!isAuthenticated) {
      navigate('/auth/login')
    }
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen">
      <p className="text-4xl font-bold">
        <i>404</i>
      </p>
      <h1>Oops!</h1>
      <p>Sorry, The page you are looking for doesn't exist.</p>
      <Button
        variant={"secondary"}
        onClick={back}
      >
        Back to home
      </Button>
    </div>
  );
};

export default NotFoundView;

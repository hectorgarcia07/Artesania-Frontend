import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
      variant="contained"
      sx={{marginLeft: "1rem"}}
      onClick={() => loginWithRedirect()}>
        Log In
    </Button>
  )
};

export default LogoutButton;

import '../../index.css';

function LoginComponent() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (

    <div className="header">

    <h3 className="header-top">🎉Sign into Whats The Word</h3>

       <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>


    </div>

   
  );
}

export default LoginComponent;
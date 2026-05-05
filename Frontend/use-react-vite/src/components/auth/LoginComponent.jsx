
import '../../index.css';

function LoginComponent() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (

    <div class="header">

    <h1 className="header-top">🎉Whats The Word</h1>

       <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>


    </div>

   
  );
}

export default LoginComponent;
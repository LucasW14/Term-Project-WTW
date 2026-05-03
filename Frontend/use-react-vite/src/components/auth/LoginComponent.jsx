function LoginComponent() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  );
}

export default LoginComponent;
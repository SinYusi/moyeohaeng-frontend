const useLogin = () => {
  const login = async (email: string, password: string) => {
    await console.log(email, password);
  };

  return login;
};

export default useLogin;

export const login = async (email, password) => {
  console.log('Login attempt with:', email, password);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return { id: '1', name: 'Test User', email: email };
};

export const signup = async (name, email, password) => {
  console.log('Signup attempt with:', name, email, password);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return { id: '1', name: name, email: email };
};

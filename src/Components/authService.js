// Simulated API calls
const fakeLoginRequest = async (username, password) => {
  if (username === 'Ashwani' && password === 'Ashwani@436') {
    return { username: 'Ashwani' };
  } else {
       alert("Invalid credentials");
      throw new Error('Invalid credentials');
     
  }
};

const fakeSignupRequest = async (username, password) => {
  // Simulate user registration
  // In a real scenario, you'd handle validation and store user data securely
  return { username };
};

const authService = {
  login: async (username, password) => {
    const response = await fakeLoginRequest(username, password);
    if (response.username) {
      const token = 'your_generated_jwt_token_here';
      return token;
    } else {
      throw new Error('Login failed');
    }
  },

  signup: async (username, password) => {
    const response = await fakeSignupRequest(username, password);
    if (response.username) {
      const token = 'your_generated_jwt_token_here';
      return token;
    } else {
      throw new Error('Signup failed');
    }
  },
};

export default authService;

describe('Auth endpoint', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jwt;
  it('Register a new user', async () => {
    const user = {
      firstName: 'e2eTest',
      lastName: 'e2eTest',
      email: 'e2eTest@gmail.com',
      password: 'e2eTest',
    };
    const response = await fetch('http://auth-api:3001/api/auth/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    });
    expect(response.ok).toBeTruthy();
  });

  it('Login with the user created', async () => {
    const user = {
      email: 'e2eTest@gmail.com',
      password: 'e2eTest',
    };
    const response = await fetch('http://auth-api:3001/api/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    });
    expect(response.ok).toBeTruthy();
    jwt = response.headers.get('Set-Cookie');
  });

  it('Refresh the user tokens', async () => {
    const request = new Request('http://auth-api:3001/api/auth/refresh', {
      headers: {
        Cookie: jwt,
      },
    });
    const response = await fetch(request);
    expect(response.ok).toBeTruthy();
  });

  it('Logout the user', async () => {
    const response = await fetch(
      'http://auth-api:3001/api/auth/logout/e2eTest@gmail.com',
    );
    expect(response.ok).toBeTruthy();
  });
});

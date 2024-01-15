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
    const response = await fetch('http://localhost:3001/api/auth/register', {
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
    const response = await fetch('http://localhost:3001/api/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    });
    expect(response.ok).toBeTruthy();
    const toCheck = await response.text();
    console.log('toCheck', toCheck);
    jwt = response.headers.get('Set-Cookie');
    console.log('jwt', jwt);
  });

  it('Refresh the user tokens', async () => {
    const request = new Request('http://localhost:3001/api/auth/refresh', {
      headers: {
        Cookie: jwt,
      },
    });
    const response = await fetch(request);
    console.log('response.status', response.status);
    expect(response.ok).toBeTruthy();
  });

  it('Logout the user', async () => {
    const response = await fetch(
      'http://localhost:3001/api/auth/logout/e2eTest@gmail.com',
    );
    expect(response.ok).toBeTruthy();
  });
});

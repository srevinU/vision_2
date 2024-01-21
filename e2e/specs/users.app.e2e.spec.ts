describe('User endpoint', () => {
  const env = process.env;
  let jwt;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userId;
  it('Login admin test user', async () => {
    const user = {
      email: 'admin@gmail.fr',
      password: 'u_user_test_password_1',
    };
    const response = await fetch(
      `http://${env.AUTH_DOMAIN}:${env.AUTH_PORT}/api/auth/login`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(user),
      },
    );
    expect(response.ok).toBeTruthy();
    jwt = response.headers.get('Set-Cookie');
  });

  it('Get specific user', async () => {
    const response = await fetch(
      `http://${env.USER_DOMAIN}:${env.USER_PORT}/api/users/e2e_Test@gmail.com`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: jwt,
        },
        method: 'GET',
      },
    );
    expect(response.ok).toBeTruthy();
    const data = await response.text();
    userId = JSON.parse(data).id;
  });

  it('Delete user', async () => {
    const response = await fetch(
      `http://${env.USER_DOMAIN}:${env.USER_PORT}/api/users/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: jwt,
        },
        method: 'DELETE',
      },
    );
    expect(response.ok).toBeTruthy();
  });

  it('Get all users', async () => {
    const response = await fetch(
      `http://${env.USER_DOMAIN}:${env.USER_PORT}/api/users/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: jwt,
        },
        method: 'GET',
      },
    );
    expect(response.ok).toBeTruthy();
  });
});

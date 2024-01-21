describe('Auth endpoint', () => {
  const env = process.env;
  let jwt;
  let userId;
  it('Register a new user', async () => {
    const user = {
      firstName: 'e2e_auth_Test',
      lastName: 'e2e_auth_Test',
      email: 'e2e_auth_Test@gmail.com',
      password: 'e2e_auth_Test',
    };
    const response = await fetch(
      `http://${env.AUTH_DOMAIN}:${env.AUTH_PORT}/api/auth/register`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(user),
      },
    );
    expect(response.ok).toBeTruthy();
    const data = await response.text();
    userId = JSON.parse(data).id;
  });

  it('Login admin user', async () => {
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

  it('Refresh the user tokens', async () => {
    const request = new Request(
      `http://${env.AUTH_DOMAIN}:${env.AUTH_PORT}/api/auth/refresh`,
      {
        headers: {
          Cookie: jwt,
        },
        method: 'GET',
      },
    );
    const response = await fetch(request);
    expect(response.ok).toBeTruthy();
  });

  it('Delete user registered', async () => {
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

  it('Logout the user', async () => {
    const response = await fetch(
      `http://${env.AUTH_DOMAIN}:${env.AUTH_PORT}/api/auth/logout/admin@gmail.fr`,
      {
        method: 'GET',
      },
    );
    expect(response.ok).toBeTruthy();
  });
});

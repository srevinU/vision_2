describe('User endpoint', () => {
  const env = process.env;
  let jwt;
  let userId;
  let userEmail;
  it('Register a new user', async () => {
    const user = {
      firstName: 'e2e_user_Test',
      lastName: 'e2e_user_Test',
      email: 'e2e_user_Test@gmail.com',
      password: 'e2e_user_Test',
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
    userEmail = JSON.parse(data).email;
  });
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
      `http://${env.USER_DOMAIN}:${env.USER_PORT}/api/users/${userEmail}`,
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

describe('Roles endpoint', () => {
  const env = process.env;
  let jwt;
  let roleId;
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

  it('Create role admin for test user', async () => {
    const role = {
      userId: 'user_test_id_1',
      name: 'admin',
    };
    const response = await fetch(
      `http://${env.ROLE_DOMAIN}:${env.ROLE_PORT}/api/roles`,
      {
        headers: {
          'Content-Type': 'application/json',
          Cookie: jwt,
        },
        method: 'POST',
        body: JSON.stringify(role),
      },
    );
    const data = await response.text();
    roleId = JSON.parse(data).id;
    expect(response.ok).toBeTruthy();
  });

  it('Get specific role', async () => {
    const response = await fetch(
      `http://${env.ROLE_DOMAIN}:${env.ROLE_PORT}/api/roles/${roleId}`,
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

  it('Delete the role', async () => {
    const response = await fetch(
      `http://${env.ROLE_DOMAIN}:${env.ROLE_PORT}/api/roles/${roleId}`,
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
});

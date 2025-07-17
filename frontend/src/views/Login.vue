<template>
  <section>
    <h2>Login</h2>
    <form id="login-form">
    <label>Username <input type="text" name="username" required></label>
    <label>Password <input type="password" name="password" required></label>
    <button type="submit">Login</button>
    </form>
    </section>
    <section>
    <h2>Register</h2>
    <form id="register-form">
    <label>First Name <input type="text" name="first_name" required></label>
    <label>Last Name <input type="text" name="last_name" required></label>
    <label>Username <input type="text" name="username" required></label>
    <label>Email <input type="email" name="email" required></label>
    <label>Password <input type="password" name="password" required></label>
    <label>Confirm Password <input type="password" name="confirm_password" required></label>
    <button type="submit">Register</button>
    </form>
  </section>
</template>

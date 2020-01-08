import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/auth.context';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => window.M.updateTextFields(), []);

  const changeHandler = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {
    }
  };

  const loginHandler = async () => {
    try {
      const { token, userId } = await request('/api/auth/login', 'POST', { ...form });
      auth.login(token, userId);
    } catch (e) {
    }
  };

  return (
      <div className="row">
        <div className="col s6 offset-s3">
          <h1 className="center-align">Cut the Link</h1>
          <div className="card blue">
            <div className="card-content white-text">
              <span className="card-title">Authorization</span>

              <div>
                <div className="input-field">
                  <input
                      placeholder="Type your email"
                      id="email"
                      type="text"
                      name="email"
                      className="yellow-input"
                      onChange={changeHandler}
                      value={form.email}
                      required
                  />
                  <label htmlFor="email">Email: </label>
                </div>
                <div className="input-field">
                  <input
                      placeholder="Type your password"
                      id="password"
                      type="password"
                      name="password"
                      className="yellow-input"
                      onChange={changeHandler}
                      value={form.password}
                      required
                  />
                  <label htmlFor="password">Password: </label>
                </div>
              </div>
            </div>

            <div className="card-action">
              <button
                  onClick={loginHandler}
                  disabled={loading}
                  className="btn yellow darken-4"
                  style={{ marginRight: 10 }}>
                Enter
              </button>
              <button
                  onClick={registerHandler}
                  disabled={loading}
                  className="btn grey lighten-1 black-text">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};
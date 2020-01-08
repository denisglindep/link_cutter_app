import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  useEffect(() => window.M.updateTextFields(), []);

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`);
      } catch (error) {
      }
    }
  };


  return (
      <div className='row'>
        <div className="col s8 offset-2" style={{ paddingTop: '2rem' }}>
          <div className="input-field">
            <input
                placeholder="Paste you link"
                id="link"
                type="text"
                name="link"
                onChange={({ target: { value } }) => setLink(value)}
                value={link}
                onKeyPress={pressHandler}
            />
            <label htmlFor="link">Type you link: </label>
          </div>
        </div>
      </div>
  );
};
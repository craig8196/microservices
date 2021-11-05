import axios from 'axios';
import { useState } from 'react';


const UseRequest = ({url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      console.log("making request");
      console.log(method, url, body);
      setErrors(null);
      const response = await axios[method](url, body);

      try {
        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (err) {
        console.log('UseRequest error: ' + err.message);
      }

      return response.data;
    } catch (err) {
      console.log(err.response);
      if (err.response) {
        setErrors(
          <div className="alert alert-danger">
            <h4>Oooops....</h4>
            <ul className="my-0">
              {err.response.data.errors.map(err => {
                return <li key={err.message}>{err.message}</li>;
              })}
            </ul>
          </div>
        );
      } else {
        console.log(err.message);
      }
    }
  };

  return { doRequest, errors };
};

export default UseRequest;

import axios from 'axios';
import { onServer } from './on-server';


const ssrClient = ({ req }) => {
  if (onServer()) {
    return axios.create({
      baseURL: 'https://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    return axios.create();
  }
};

export default ssrClient;


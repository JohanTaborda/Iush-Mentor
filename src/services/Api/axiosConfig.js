import axios from 'axios';

//instanciamos para solo llamar api y me lleva al localhost donde corre el backend
const api = axios.create ({
	baseURL: 'http://localhost:3000'
})

export default api;
import axios from "axios";

const port = 3333;
const myIpAddress = "192.168.0.106";

export const api = axios.create({
	baseURL: `http://${myIpAddress}:${port}`,
});

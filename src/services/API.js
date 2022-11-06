const exchangeAPI = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = async () => {
  const response = await fetch(exchangeAPI);
  const json = await response.json();

  return json;
  // return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default fetchAPI;

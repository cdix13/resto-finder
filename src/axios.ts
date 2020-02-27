import _axios from 'axios';

_axios.defaults.baseURL = 'https://developers.zomato.com/api/v2.1/';
_axios.defaults.headers.common['Content-Type'] = 'application/json';
_axios.defaults.headers.common['user-key'] = '4d489d98c2e6ca99aafae7e1029fb52f';
// _axios.defaults.headers.common['user-key'] = '0f47aef88503cc4d36643be57cff421e';

export default _axios;

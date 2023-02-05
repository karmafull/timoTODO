const axios = require('axios');

axios.get('http://demo2.z-bit.ee/tasks', 
    {  headers: { Authorization: `Bearer bo9NtCOuX4jaWSqhjM37dmZwwH-vv6zo` }
})
  .then(function (response) {
    console.log(response);
  })
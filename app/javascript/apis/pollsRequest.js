// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    // 'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content,
    'Authorization': (window.localStorage.getItem('jwt') ? `Bearer ${window.localStorage.getItem('jwt')}` : '')
  }
});
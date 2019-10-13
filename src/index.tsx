import React from 'react'
import ReactDOM from 'react-dom'

/* CSS */
import './static/css/reset.min.css'
import './static/css/common.less'
import './static/css/person.less'

import App from './App'

/* Router */
import * as serviceWorker from './serviceWorker'
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

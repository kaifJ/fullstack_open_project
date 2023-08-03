import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { MoralisProvider } from 'react-moralis'
import './styles/styles.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <MoralisProvider initializeOnMount={false}>
        <Router>
            <App />
        </Router>
    </MoralisProvider>
)

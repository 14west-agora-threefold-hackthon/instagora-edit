import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import styled, { createGlobalStyle } from 'styled-components'
import {SpinningIcon} from './components/styled/icons'

import EditPage from './components/pages/EditPage.js'
import AddPage from './components/pages/AddPage.js'

createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 20px;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  a {
    color: palevioletred;
    &:hover {
      color: mediumvioletred;
    }
  }
`

const Placeholder = styled.div`
  display: flex;
  flex-direction: row;
  // max-height: 5rem;
  margin: 1rem;
  // border-bottom: 1px solid red;

  & img {
    width: 7rem;
    margin: 0 1rem;
  }
  & * {
    margin: 0;
  }
`

const TitlePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setArticles([])
    setError(null)

    const lookupValue = async () => {
      try {
        const response = await fetch(`//localhost:3000/articles`)

        if (!response.ok) {
          setError(response.statusText)
          setLoading(false)
          return;
        }
  
        const articlesJson = await response.json()
        setArticles(articlesJson.articles)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
        return;
      }
    }
    lookupValue()
  }, [])

  let displayed
  if (loading) {
    displayed = <SpinningIcon />
  } else {
    if (error) {
      displayed = <h2>there was an error! {error}</h2>
    } else {
      displayed = articles.map(article => (
        <Placeholder key={article.id}>
          <Link to={`/edit/${article.id}`}><img src={article.headerImage} alt="header"></img></Link>
          <TitlePlaceholder>
            <h3><Link to={`/edit/${article.id}`}>{article.title}</Link></h3>
            <h4><a href={`http://localhost:3002/article/${article.id}`}>Preview article</a></h4>
          </TitlePlaceholder>
        </Placeholder>
      ))
    }
  }

  return (
    <>
      <h1>Editorial home page</h1>
      {displayed}
      <h2><Link to={'/add'}>Add a new Article...</Link></h2>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/add"><AddPage /></Route>
            <Route path="/edit/:id"><EditPage /></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;

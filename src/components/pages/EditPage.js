import React, { useState, useEffect, useCallback } from 'react';

import {
  useParams
} from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import EditContent from '../utils/EditContent.js'

import {SpinningIcon} from '../styled/icons'

async function submit(id, articleJson) {
  try {
    const response = await fetch(`//localhost:3000/articles/${id}`, {
      method: 'POST',
      body: JSON.stringify(articleJson),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('oh shit not ok')
      return;
    }

    const resJson = await response.json()
    if(!resJson.success) {
      console.error('oh shit not success')
      return
    }
  } catch (err) {
    console.error('oh shit error', {err})
    return;
  }
}

export default function Edit() {
  const { id } = useParams()
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const setArticleEditorState = useCallback((editorState) => {
    setArticle(article => ({ ...article, content: editorState }))
  }, [])

  const setArticleTitle = useCallback((title) => {
    setArticle(article => ({ ...article, title }))
  }, [])

  const setArticleHeaderImage = useCallback((headerImage) => {
    setArticle(article => ({ ...article, headerImage }))
  }, [])

  const saveArticle = useCallback((e) => {
    e.preventDefault()
    const articleJson = { ...article, content: convertToRaw(article.content.getCurrentContent()) }
    
    submit(id, articleJson)
  }, [id, article])

  useEffect(() => {
    setLoading(true)
    setArticle({})
    setError(null)

    const lookupValue = async () => {
      try {
        const response = await fetch(`//localhost:3000/articles/${id}`)

        if (!response.ok) {
          setError(response.statusText)
          setLoading(false)
          return;
        }
  
        const articleJson = await response.json()
        articleJson.content = articleJson.content ? EditorState.createWithContent(convertFromRaw(articleJson.content)) : EditorState.createEmpty()
        setArticle(articleJson)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
        return;
      }
    }
    lookupValue()
  }, [id])

  let displayed
  if (loading) {
    displayed = <SpinningIcon />
  } else {
    if (error) {
      displayed = <h2>there was an error! {error}</h2>
    } else {
      displayed = <EditContent
                    article={article}
                    setArticleEditorState={setArticleEditorState}
                    setArticleTitle={setArticleTitle}
                    setArticleHeaderImage={setArticleHeaderImage}
                    saveArticle={saveArticle}
                    />
    }
  }

  return (
    <>
      <h1>Edit Article</h1>
      { displayed }
    </>
  )
}
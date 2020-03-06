import React, { useState, useCallback } from 'react';

import {
  useHistory
} from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import EditContent from '../utils/EditContent.js'

// import {SpinningIcon} from '../styled/icons'

async function submit(articleJson) {

  try {
    const response = await fetch(`//localhost:3000/articles`, {
    method: 'PUT',
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

  return resJson.id
} catch (err) {
  console.error('oh shit error', {err})
  return;
}
}

export default function Add() {
  const history = useHistory()
  const [article, setArticle] = useState({
    title: "",
    headerImage: "",
    content: EditorState.createEmpty(),
  })
  
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

    const sub = async () => {
      const id = await submit(articleJson)
      history.push(`/edit/${id}`)
    }
    sub()
    
  }, [article, history])
  
  
  
  return (
    <>
      <h1>Create Article</h1>
      <EditContent
        article={article}
        setArticleEditorState={setArticleEditorState}
        setArticleTitle={setArticleTitle}
        setArticleHeaderImage={setArticleHeaderImage}
        saveArticle={saveArticle}
        />
    </>
  )
}
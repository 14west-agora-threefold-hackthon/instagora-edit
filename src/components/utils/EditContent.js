import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components'
// import {Spinner3 as Spinner} from 'styled-icons/evil'

const TextInput = styled.input`
  width: 100%;
`

const EditorContainer = styled.div`
  display: flex;
`

const WysiwygContainer = styled.div`
  width: 50%;
`

const StoryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`
const StoryRenderer = styled.div`
  position: fixed;
  top: 50vh; left: 75vw;
  transform: translate(-50%, -50%);
  max-width: 375px;
  height: 100%;
  max-height: 667px;
  background-color: white;
  border: 1px solid grey;
  border-radius: 15px;
`

const Padder = styled.div`
  padding: 1rem;
  & * {
    margin: 0rem;
  }
`
const StoryImage = styled.img`
  width: 75%;
  max-height: 300px;
  position: relative;
  top: 150px; left: 50%;
  transform: translate(-50%, -50%);
`

export default function EditContent({ article, setArticleTitle, setArticleEditorState, setArticleHeaderImage, saveArticle }) {
  function onEditorStateChange(editorState) {
    setArticleEditorState(editorState)
  }

  return (
    <form onSubmit={saveArticle}>
      {/* validate content on save (title is required) */}
      <TextInput type="text" value={article.title || ''} placeholder='your title here'  name="title" onChange={(e) => setArticleTitle(e.target.value)} />
      <br/>
      <TextInput type="text" value={article.headerImage || ''} placeholder='image link here'  name="headerImage" onChange={(e) => setArticleHeaderImage(e.target.value)} />
      <EditorContainer>
        <WysiwygContainer>
          <Editor
            editorState={article.content}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
          />
        </WysiwygContainer>
        <StoryContainer>
          <StoryRenderer>
            <Padder><h1>{article.title}</h1></Padder>
            <StoryImage src={article.headerImage}></StoryImage>
          </StoryRenderer>
        </StoryContainer>

      </EditorContainer>
      
      {/* TODO: Story Editor */}
      <button type="submit">Save Article</button>
    </form>
  )
}
import styled from "@emotion/styled"
import React, { FC, KeyboardEvent, useEffect, useState } from "react"

export const App: FC = () => {
  const [value, setValue] = useState<string>("")
  const [bufferIn, setBufferIn] = useState<string[]>([
    "worker",
    "and",
    "follower",
    "some",
    "content"
  ])
  const [bufferOut, setBufferOut] = useState<string[]>([])
  const [buffer, setBuffer] = useState<string>("")

  const onKeyDownHandler = (event: KeyboardEvent) => {
    const activeWord = bufferIn[0]

    if (event.code === "Backspace") {
      setBuffer(buffer.slice(0, -1))
    }

    if (event.key.length === 1) {
      setBuffer(buffer + event.key)
    }

    if (event.code === "Space" && buffer === activeWord) {
      setBuffer("")
      setBufferOut([...bufferOut, bufferIn.slice(0, 1)[0]])
      setBufferIn(bufferIn.slice(1))
    }
  }

  const getBufferInAsString = () => {
    const string = bufferIn.join(" ")
    for (let index = 0; index < string.length; index++) {
      const element = string[index]
      if (element !== buffer[index]) {
        return string.slice(index)
      }
    }
  }

  const getBufferOutAsString = () => {
    const string = bufferOut.join(" ")
    return string + buffer
  }

  return (
    <Center>
      <BufferTemplate>
        <EditableField
          value={value}
          onChange={x => x}
          onKeyDown={onKeyDownHandler}
        />
        <BufferIn>{getBufferOutAsString()}</BufferIn>
        <BufferOut>{getBufferInAsString()}</BufferOut>
      </BufferTemplate>
    </Center>
  )
}

const BufferIn = styled.div`
  text-align: right;
`

const BufferOut = styled.div``

const BufferTemplate = styled.div`
  display: grid;
  white-space: nowrap;
  grid-template: 1fr / 50% 50%;
  background: #eee;
  width: 80%;
  padding: 1rem 2rem;
  position: relative;
  font-size: 3rem;
`

const EditableField = styled.input`
  font-size: 3rem;
  background: transparent;
  border: none;
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`

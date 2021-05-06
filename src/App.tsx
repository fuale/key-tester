import styled from "@emotion/styled"
import { head, tail } from "ramda"
import React, { FC, KeyboardEvent, useEffect, useState } from "react"
import { CountTo } from "./CountTo"

export const App: FC = () => {
  const [value, setValue] = useState<string>("")
  const [bufferIn, setBufferIn] = useState<string[]>([
    "live",
    "in",
    "house",
    "near",
    "the",
    "mountains",
    "have",
    "two",
    "brothers",
    "and",
    "one",
    "sister",
    "and",
    "was",
    "born",
    "last",
    "father",
    "teaches",
    "mathematics",
    "and",
    "my",
    "mother",
    "is",
    "nurse",
    "at",
    "big",
    "hospital",
    "brothers",
    "are",
    "very",
    "smart",
    "and",
    "work",
    "hard",
    "school"
  ])

  const [startedIn, setStartedIn] = useState<number>(0)
  const [started, setStarted] = useState<boolean>(false)
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(0)
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
      setBufferOut([...bufferOut, head(bufferIn)!])
      setBufferIn(tail(bufferIn))
    } else if (event.code === "Space" && buffer.length !== 0) {
      setBuffer("")
      setBufferOut([...bufferOut, buffer])
      setBufferIn(tail(bufferIn))
    }
  }

  const getBufferInAsString = () => {
    const right = bufferIn.join(" ")

    for (let i = 0; i < right.length; i++) {
      if (right[i] !== buffer[i]) {
        return right.slice(i)
      }
    }
  }

  const getWrongSequence = () => {
    const input = bufferIn.join(" ")
    const wrongSequnce: string[] = []
    let wrongFlag = false

    for (let index = 0; index < buffer.length; index++) {
      if (buffer[index] !== input[index]) {
        wrongFlag = true
      }

      if (wrongFlag) {
        wrongSequnce.push(buffer[index])
      } else if (wrongSequnce.length !== 0) {
        break
      }
    }

    return wrongSequnce
  }

  const getBufferOutAsString = () => {
    const output = bufferOut.join(" ")
    const input = bufferIn.join(" ")

    for (let i = 0; i < input.length; i++) {
      if (input[i] !== buffer[i]) {
        return output + " " + buffer.slice(0, i)
      }
    }
  }

  useEffect(() => {
    if (bufferOut.length > 3) {
      setWordsPerMinute(
        bufferOut.length / ((Date.now() - startedIn) / 1000 / 60)
      )
    }
  }, [bufferOut])

  useEffect(() => {
    if (!started && bufferOut.length > 0) {
      setStartedIn(Date.now())
      setStarted(true)
    }
  }, [startedIn, bufferOut])

  return (
    <Center>
      <svg width={300} height={300}>
        <Guade
          x1={300 / 2}
          x2={0}
          y1={300}
          y2={300}
          style={{ transform: `rotate(${(wordsPerMinute / 140) * 180}deg)` }}
        />
      </svg>
      wpm: {Math.round(wordsPerMinute)}
      <BufferTemplate>
        <EditableField
          value={value}
          onKeyDown={onKeyDownHandler}
          onChange={() => null}
        />
        <LeftSide>
          <BufferOut>{getBufferOutAsString()}</BufferOut>
          <WrongBuffer>{getWrongSequence()}</WrongBuffer>
        </LeftSide>
        <BufferIn>{getBufferInAsString()}</BufferIn>
      </BufferTemplate>
    </Center>
  )
}

const Guade = styled.line`
  stroke: orange;
  stroke-width: 3px;
  transition: transform 174ms ease;
  transform-origin: bottom center;
`

const BufferOut = styled.div`
  color: rgba(0, 0, 0, 0.4);
`

const WrongBuffer = styled.div`
  position: relative;
  color: rgba(0, 0, 0, 0.4);

  &::before {
    content: "";
    top: 55%;
    height: 4px;
    position: absolute;
    background: orangered;
    width: 100%;
  }
`

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const BufferIn = styled.div``

const BufferTemplate = styled.div`
  display: grid;
  white-space: pre;
  grid-template: 1fr / 50% 50%;
  background: #eee;
  width: 80%;
  overflow: hidden;
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

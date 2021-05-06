import React, { FC, useEffect, useState } from "react"

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}

export const CountTo: FC<{ to: number; duration: number }> = ({
  to,
  duration
}) => {
  const [render, setRender] = useState<number>(0)

  useEffect(() => {
    const steps = (to - render) / duration
    let t = to - render
    for (let i = 0; i < steps; i++) {
      requestAnimationFrame(() => {
        setRender(render + t)
      })
    }
  }, [to, duration])

  return <div>{render}</div>
}

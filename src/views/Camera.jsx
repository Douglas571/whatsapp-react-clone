import { useState, forwardRef } from 'react'

const Camera = forwardRef((props, ref) => {
  return (
      <section ref={ref} className="bg-darkest">
        <h1>Camera</h1>
      </section>
    )
})

export default Camera
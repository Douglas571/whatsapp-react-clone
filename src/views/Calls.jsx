import { useState, forwardRef } from 'react'

const Calls = forwardRef((props, ref) => {
  return (
      <section ref={ref} className="bg-darkest">
        <h1>Calls</h1>
      </section>
    )
})

export default Calls
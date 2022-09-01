import { useState, forwardRef } from 'react'
import UploadPhoto from './UploadPhoto.jsx'

const Camera = forwardRef((props, ref) => {
  return (
      <section ref={ref} className="bg-darkest">
        <UploadPhoto/>
      </section>
    )
})

export default Camera
import * as React from 'react'
import { useCallback, useState } from 'react'
import ImagesZoom from './ImagesZoom'
import { backUrl } from '../../config/config'

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false)

  const onZoom = useCallback(() => {
    setShowImagesZoom(true)
  }, [])

  const onClose = useCallback(() => {
    setShowImagesZoom(false)
  }, [])

  if (images.length === 1) {
    return (
      <>
        <img src={`${backUrl}/${images[0].src}`} width="200px" onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img src={`${backUrl}/${images[0].src}`} width="100px" onClick={onZoom} />
          <img src={`${backUrl}/${images[1].src}`} width="100px" onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }
  return (
    <>
      <div>
        <img src={`${backUrl}/${images[0].src}`} width="100px" onClick={onZoom} />
        <div
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle'
          }}
          onClick={onZoom}
        >
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  )
}

export default PostImages
//

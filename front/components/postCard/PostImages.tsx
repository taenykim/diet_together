import * as React from 'react'
import { useCallback, useState } from 'react'
import ImagesZoom from './ImagesZoom'
import { backUrl } from '../../config/config'
import styled from 'styled-components'

const PostCardImageOne = styled.div``

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
        <div
          style={{
            height: '300px',
            padding: '10px 15px 30px 20px',
            overflow: 'hidden'
            // 얘는 왜 styled 안됐지?ㅠㅠ
          }}
        >
          <div>
            <img style={{ width: '100%' }} src={`${backUrl}/${images[0].src}`} onClick={onZoom} />
          </div>
        </div>
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

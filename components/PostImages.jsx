import { useState, useCallback } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import ImagesZoom from './ImagesZoom'

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false)

  const onClose = useCallback(() => {
    setShowImageZoom(false)
  })

  const onZoom = useCallback(() => {
    setShowImageZoom(true)
  }, [])

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }

  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          style={{ display: 'inline-block', width: '50%' }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{ display: 'inline-block', width: '50%' }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    )
  }

  return (
    <>
      <div>
        <img
          role="presentation"
          className="hi"
          style={{ display: 'inline-block', width: '50%' }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />

        <div
          role="presentation"
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  )
}

export default PostImages

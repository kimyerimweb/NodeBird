import PropTypes from 'prop-types'
import Link from 'next/link'

const PostCardContent = ({ postData }) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          )
        }

        return v
      })}
    </div>
  )
}
//해시태그는 어차피 순서가 도중에 바뀔 일은 없기 때문에 그냥 인덱스로 key값 넣어줘도 된다.

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
}

export default PostCardContent

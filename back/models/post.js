module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', //MYSQL에는 posts로 테이블 생성
    {
      //id는 mysql에서 자동으로 들어감
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //한글 저장+이모티콘을 위한 설정
    }
  )
  Post.associate = (db) => {
    db.Post.belongsTo(db.User)
    db.Post.hasMany(db.Comment)
    db.Post.hasMany(db.Image)
    db.Post.belongsToMany(db.Hashtag)
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' })
    db.Post.belongsTo(db.Post, { as: 'Reteet' })
  }
  return Post
}

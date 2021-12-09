module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment', //MYSQL에는 posts로 테이블 생성
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
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User)
    db.Comment.belongsTo(db.Post)
  }
  return Comment
}

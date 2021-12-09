module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'Hashtag', //MYSQL에는 posts로 테이블 생성
    {
      //id는 mysql에서 자동으로 들어감
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //한글 저장+이모티콘을 위한 설정
    }
  )
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' })
  }
  return Hashtag
}

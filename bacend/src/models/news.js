module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define("News", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    symptom_keywords: DataTypes.STRING,
    suggested_specialization: DataTypes.STRING
  });
  return News;
};

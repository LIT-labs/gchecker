module.exports = (sequelize, DataTypes) => {
  const Bubble = sequelize.define('bubble', {
    slug: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categories: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  Bubble.prototype.updateCategories = function updateCategories(categories) {
    this.set({
      categories
    });
    this.save();
  };
  return Bubble;
};

module.exports = (sequelize, DataTypes) => {
  const Proof = sequelize.define('proof', {
    checked_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valid_till: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return Proof;
};

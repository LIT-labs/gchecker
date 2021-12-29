module.exports = (sequelize, DataTypes) => {
  const Examinee = sequelize.define('examinee', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    checked_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valid_till: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
  Examinee.prototype.update = async function update(data) {
    this.set({
      firstname: data.firstname,
      lastname: data.lastname,
      category: data.category,
      status: data.status,
      checked_at: data.checked_at,
      checked_from: data.checked_from,
      valid_till: data.valid_till
    });
    this.save();
  };
  return Examinee;
};

"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn("post", "authorID", {
        type: DataTypes.Integer
        });// add altering commands here, calling 'done' when finished
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn("post", "authorID");// add reverting commands here, calling 'done' when finished
    done();
  }
};

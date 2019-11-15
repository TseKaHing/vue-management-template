const mongoose = require('mongoose');
var Schema = mongoose.Schema

const IpsSchema = new Schema({
  ip: { type: String, unique: true },
  port: { type: String },
  address: { type: String },
  isAnonymous: { type: String },
  type: { type: String },
  speed: { type: Number },
  connectTime: { type: Number },
  survivalTime: { type: String },
  verifyTime: { type: String }
})

Ips = mongoose.model('Ips', IpsSchema)

module.exports = Ips
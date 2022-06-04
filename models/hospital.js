const hospitalSchema = new mongoose.Schema({
    name:String,
    password:String
  });
  
  const Hospital = mongoose.model("Hospital" , hospitalSchema);
  
  module.exports = Hospital
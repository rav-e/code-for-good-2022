
const patientSchema = new mongoose.Schema({
  patientID: String,
  dob: Date,
  blood_group: String,
  weight: String,
  height: String,
  name: String
});

const Patient = mongoose.model("Patient" , patientSchema);

module.exports = Patient
const { Insurance } = require("../models")

const GetInsurances = async (req, res) => {
  try {
    const insurances = await Insurance.find({})
    res.send(insurances)
  } catch (error) {
    throw error
  }
}

const CreateInsurance = async (req, res) => {
  try {
    const insurances = await Insurance.create({ ...req.body })
    res.send(insurances)
  } catch (error) {
    throw error
  }
}

const InsuranceDetail = async (req, res) => {
  try {
    const insurance = await Insurance.findOne({ _id: req.params.insurance_id })
    res.send(insurance)
  } catch (error) {
    throw error
  }
}

const UpdateInsurance = async (req, res) => {
  try {
    const insurance = await Insurance.findByIdAndUpdate(
      { _id: req.params.insurance_id },
      { ...req.body }
    )
    res.send(insurance)
  } catch (error) {
    throw error
  }
}

const DeleteInsurance = async (req, res) => {
  try {
    await Insurance.deleteOne({ _id: req.params.insurance_id })
    res.send({ msg: "Post Deleted", payload: req.params.post_id, status: "Ok" })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetInsurances,
  CreateInsurance,
  InsuranceDetail,
  UpdateInsurance,
  DeleteInsurance,
}

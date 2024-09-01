import { Company } from './../models/company.model.js';

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body
    if (!companyName) {
      return res.status(400).json({
        message: "company name is required.",
        success: false
      })
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(409).json({
        message: "You can't create same company again.💡",
        success: false
      })
    }
    company = await Company.create({
      name: companyName,
      userId: req.id
    })
    return res.status(201).json({
      message: "Company registered successfully.👍",
      company,
      success: true
    })
  } catch (error) {
    console.log("👿" + error);
  }
}

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    let companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false
      })
    }
    return res.status(201).json({
      companies,
      success: true
    })
  } catch (error) {
    console.log("👿" + error);
  }
}

export const getCompanyById = async (req, res) => {
  try {
    const compnayId = req.params.id;
    const company = await Company.findById(compnayId);
    if (!company) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false
      })
    }
    return res.status(201).json({
      company,
      success: true
    })
  } catch (error) {
    console.log("👿" + error);
  }
}

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    console.log(req.file);
    
    let logoUrl = '';

    // Cloudinary upload if logo exists
    if (req.file) {
      const file = req.file;
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      // Update logo URL if file upload was successful
      if (cloudResponse) {
        logoUrl = cloudResponse.secure_url;
      }
    }

    const updateData = {
      name,
      description,
      website,
      location,
      logo: logoUrl 
    };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!company) {
      return res.status(400).json({
        message: "Company not found.",
        success: false
      });
    }

    return res.status(201).json({
      message: "Company information updated successfully.",
      success: true,
      company
    });
  } catch (error) {
    console.log("👿" + error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false
    });
  }
};
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Client } from "../models/Client.js";
import { ContractTemplate } from "../models/ContractTemplate.js";
import { Lead } from "../models/Lead.js";
import { Program } from "../models/Program.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createContractTemplate = catchAsyncError(
  async (req, res, next) => {
    let {
      program,
      description,
      dutiesOfConsultant,
      dutiesOfClient,
      agreementByClient,
      consultancyFeeAndSchedule,
      otherFees,
      note,
      refundPolicies,
      consent,
      date,
    } = req.body;

    if (
      !program ||
      !description ||
      !dutiesOfConsultant ||
      !dutiesOfClient ||
      !agreementByClient ||
      !consultancyFeeAndSchedule ||
      !otherFees ||
      !note ||
      !refundPolicies ||
      !consent ||
      !date
    ) {
      return next(new ErrorHandler("Please enter all fields", 401));
    }

    const selectedProgram = await Program.findById(program);
    const selectedUser = await User.findById(req.user._id);
    if (!selectedProgram || !selectedUser) {
      return next(new ErrorHandler("Program or User not found", 404));
    }

    dutiesOfConsultant = dutiesOfConsultant
      .split(",")
      .map((duty) => duty.trim());
    dutiesOfClient = dutiesOfClient.split(",").map((duty) => duty.trim());
    agreementByClient = agreementByClient
      .split(",")
      .map((agreement) => agreement.trim());
    refundPolicies = refundPolicies.split(",").map((policy) => policy.trim());

    if (typeof otherFees === "string") {
      otherFees = JSON.parse(otherFees);
    }

    const contractTemplate = await ContractTemplate.create({
      program: selectedProgram._id,
      title: `Service Agreement (${selectedProgram.title})`,
      description,
      dutiesOfConsultant,
      dutiesOfClient,
      agreementByClient,
      consultancyFeeAndSchedule,
      otherFees,
      note,
      refundPolicies,
      consent,
      createdAt: date,
      createdBy: selectedUser,
    });

    addUserLogs(
      selectedUser,
      date,
      `Service Agreement (${selectedProgram.title}) Contract Template Created`
    );

    await selectedUser.save();

    res.status(201).json({
      success: true,
      message: "Contract template created successfully",
    });
  }
);

export const getAllContractTemplates = catchAsyncError(
  async (req, res, next) => {
    const templates = await ContractTemplate.find()
      .populate("program")
      .populate("createdBy");

    res.status(200).json({
      success: true,
      templates,
    });
  }
);

export const getContractTemplateById = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const template = await ContractTemplate.findById(id)
      .populate("program")
      .populate("createdBy");

    res.status(200).json({
      success: true,
      template,
    });
  }
);

export const updateContractTemplate = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params; // Contract template ID from URL
    const {
      program,
      description,
      dutiesOfConsultant,
      dutiesOfClient,
      agreementByClient,
      consultancyFeeAndSchedule,
      otherFees,
      note,
      refundPolicies,
      consent,
      date,
    } = req.body;

    if (!id) {
      return next(new ErrorHandler("Contract Template ID is required", 400));
    }

    const contractTemplate = await ContractTemplate.findById(id);
    if (!contractTemplate) {
      return next(new ErrorHandler("Contract Template not found", 404));
    }

    let selectedProgram, selectedUser;
    if (program) {
      selectedProgram = await Program.findById(program);
      if (!selectedProgram) {
        return next(new ErrorHandler("Program not found", 404));
      }
    }

    if (req.user?._id) {
      selectedUser = await User.findById(req.user._id);
      if (!selectedUser) {
        return next(new ErrorHandler("User not found", 404));
      }
    }

    // Process fields
    const updatedFields = {};
    if (program) updatedFields.program = selectedProgram._id;
    if (description) updatedFields.description = description;

    if (dutiesOfConsultant) {
      updatedFields.dutiesOfConsultant = dutiesOfConsultant
        .split(",")
        .map((duty) => duty.trim());
    }

    if (dutiesOfClient) {
      updatedFields.dutiesOfClient = dutiesOfClient
        .split(",")
        .map((duty) => duty.trim());
    }

    if (agreementByClient) {
      updatedFields.agreementByClient = agreementByClient
        .split(",")
        .map((agreement) => agreement.trim());
    }

    if (refundPolicies) {
      updatedFields.refundPolicies = refundPolicies
        .split(",")
        .map((policy) => policy.trim());
    }

    if (consultancyFeeAndSchedule) {
      updatedFields.consultancyFeeAndSchedule = consultancyFeeAndSchedule;
    }

    if (otherFees) {
      updatedFields.otherFees =
        typeof otherFees === "string" ? JSON.parse(otherFees) : otherFees;
    }

    if (note) updatedFields.note = note;
    if (consent) updatedFields.consent = consent;

    const updatedTemplate = await ContractTemplate.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    addUserLogs(selectedUser, date, `${contractTemplate.title} updated`);
    await selectedUser.save();
    res.status(200).json({
      success: true,
      message: "Contract Template updated successfully",
    });
  }
);

export const deleteContractTemplate = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const { date } = req.query;
    const user = await User.findById(req.user._id);
    if (!id) {
      return next(new ErrorHandler("Contract Template ID is required", 400));
    }

    const contractTemplate = await ContractTemplate.findById(id);
    const clients = await Client.find({
      contractTemplate: contractTemplate._id,
    });

    if (!contractTemplate) {
      return next(new ErrorHandler("Contract Template not found", 404));
    }

    await ContractTemplate.deleteOne(contractTemplate._id);

    clients &&
      clients.length > 0 &&
      clients.map(async (c) => {
        const client = await Client.findById(c._id);
        await client.deleteOne();
      });

    addUserLogs(
      user,
      date,
      `${contractTemplate.title} Contract Template Deleted`
    );
    await user.save();
    res.status(200).json({
      success: true,
      message: "Contract Template deleted successfully",
    });
  }
);

export const getProgramContractTemplates = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const selectedLead = await Lead.findById(id);
    const selectedProgram = await Program.findById(selectedLead.program);

    if (!selectedProgram) {
      return next(new ErrorHandler("Program not found", 404));
    }

    const contractTemplates = await ContractTemplate.find({
      program: selectedProgram._id,
    }).populate("program");

    if (!contractTemplates) {
      return next(
        new ErrorHandler("Contract Templates for this program not found", 404)
      );
    }

    let options = contractTemplates.map((c) => ({
      value: c._id,
      label: `${c.program.country} ${c.title}`,
    }));

    res.status(200).json({
      success: true,
      templateOptions: options,
    });
  }
);

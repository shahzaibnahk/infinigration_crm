import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Program } from "../models/Program.js";
import { User } from "../models/User.js";
import { addUserLogs } from "../utils/addUserLogs.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createProgram = catchAsyncError(async (req, res, next) => {
  const {
    country,
    title,
    durationOfWorkPermit,
    currency,
    totalCost,
    deduction,
    processDuration,
    jobs,
    documents,
    requirements,
    benefits,
    timelineProcess,
    date,
  } = req.body;

  if (
    !country ||
    !title ||
    !durationOfWorkPermit ||
    !currency ||
    !totalCost ||
    !deduction ||
    !processDuration ||
    !jobs ||
    !documents ||
    !requirements ||
    !benefits ||
    !timelineProcess ||
    !date
  ) {
    return next(new ErrorHandler("Please enter all required fields", 401));
  }

  let program = await Program.findOne({ title: title });

  if (program) {
    return next(new ErrorHandler("Program already exists", 401));
  }
  program = await Program.create({
    country,
    title,
    durationOfWorkPermit,
    currency,
    totalCost,
    deduction,
    processDuration,
    jobs,
    documents,
    requirements,
    benefits,
    timelineProcess,
    createdBy: req.user._id,
    createdAt: date,
  });
  let user = await User.findById(req.user._id);
  addUserLogs(user, date, `${program.title} created`);
  await user.save();
  res.status(201).json({
    success: true,
    message: "Program created successfully",
  });
});

export const getAllPrograms = catchAsyncError(async (req, res, next) => {
  const programs = await Program.find();
  res.status(200).json({
    success: true,
    programs,
  });
});

export const getProgramById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const program = await Program.findById(id);

  if (!program) {
    return next(new ErrorHandler("Program not found", 404));
  }

  res.status(200).json({
    success: true,
    program,
  });
});

export const updateProgram = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {
    country,
    title,
    durationOfWorkPermit,
    currency,
    totalCost,
    deduction,
    processDuration,
    jobs,
    documents,
    requirements,
    benefits,
    timelineProcess,
    date,
  } = req.body;

  let program = await Program.findById(id);

  if (!program) {
    return next(new ErrorHandler("Program not found", 404));
  }

  if (country) program.country = country;
  if (title) program.title = title;
  if (durationOfWorkPermit) program.durationOfWorkPermit = durationOfWorkPermit;
  if (currency) program.currency = currency;
  if (totalCost) program.totalCost = totalCost;
  if (deduction) program.deduction = deduction;
  if (processDuration) program.processDuration = processDuration;
  if (jobs) program.jobs = jobs;
  if (documents) program.documents = documents;
  if (requirements) program.requirements = requirements;
  if (benefits) program.benefits = benefits;
  if (timelineProcess) program.timelineProcess = timelineProcess;

  await program.save();
  let user = await User.findById(req.user._id);
  addUserLogs(req.user, date, `${program.title} updated`);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Program updated successfully",
  });
});

export const getAllProgramAsOptions = catchAsyncError(
  async (req, res, next) => {
    const programs = await Program.find();

    let programOptions =
      programs.length > 0 &&
      programs.map((p) => ({
        value: p._id,
        label: p.country + "-" + p.title,
      }));

    res.status(200).json({
      success: true,
      programOptions,
    });
  }
);

export const changeProgramStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.body;
  const program = await Program.findById(id);
  program.status = program.status === "active" ? "disabled" : "active";
  let user = await User.findById(req.user._id);
  addUserLogs(user, date, `${program.title} created`);
  await user.save();
  await program.save();
  res.status(200).json({
    success: true,
    message: "Program status updated successfully",
  });
});

export const deleteProgram = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.query;
  const program = await Program.findById(id);

  if (!program) {
    return next(new ErrorHandler("Program not found", 404));
  }

  await program.deleteOne();
  let user = await User.findById(req.user._id);
  addUserLogs(req.user, date, `${program.title} deleted`);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Program deleted successfully",
  });
});

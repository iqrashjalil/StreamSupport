import Contact from "../models/Contact_Model";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import { ErrorHandler } from "../utils/error-handler";

const addContact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  const createContact = await Contact.create({
    name,
    email,
    message,
  });
  res.status(201).json({ success: true, message: "Message Sent Successfully" });
});

const deleteContact = catchAsyncError(async (req, res, next) => {
  const contactId = req.params.id;
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    return next(new ErrorHandler("Contact not found", 404));
  }
  res
    .status(200)
    .json({ success: true, message: "Message Deleted Successfully" });
});

export default { addContact, deleteContact };

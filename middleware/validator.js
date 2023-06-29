import { check } from "express-validator";

export const registerRules = [
    check("name", "Name is Required").notEmpty().trim().escape(),
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", "Password should be 6 or more characters").isLength({ min: 6 }),
];

export const loginRules = [
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
    check("password", "Password should be 6 or more characters").isLength({ min: 6 })
];

export const updateDetailsRules = [
    check("name", "Name is Required").notEmpty().trim().escape(),
    check("email", "Please give valid Email").isEmail().normalizeEmail(),
];

export const updatePasswordRules = [
    check("oldPassword", "Old password is required").notEmpty(),
    check("newPassword", "New password should be 6 or more characters").isLength({ min: 6 })
];

export const createToDoRules = [
    check("title", "Title is required").notEmpty().trim().escape(),
    check("description", "Description is required").notEmpty().trim().escape(),
];

export const updateTodoRules = [
    check("title", "Title is required").notEmpty().trim().escape(),
    check("description", "Description is required").notEmpty().trim().escape(),
    check("completed", "Completed is required")
];
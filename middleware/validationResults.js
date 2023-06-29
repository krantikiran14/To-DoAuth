import { validationResult as expressValidatorResult } from "express-validator";

export const validationResult = (req, res, next) =>{
    const errors = expressValidatorResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()[0].msg})
    }
    next();
}
export default validationResult;
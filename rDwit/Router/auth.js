import express from 'express';
import 'express-async-errors';
import * as authController from '../Controller/auth.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { isAUth } from '../middleware/auth.js';



const router = express.Router();

const signupValidate =
    [
        body('id').notEmpty().trim().isLength({ min: 2, max: 10 }).withMessage("2글자이상 10글자이하로 입력해주세요").matches(/^[a-z0-9_-]/).withMessage("소문자 영문 및 숫자만 사용해주세요."),
        body('password').notEmpty().trim().isLength({ min: 2, max: 10 }).withMessage("2글자이상 10글자이하로 입력해주세요"),
        body('name').notEmpty().trim().isLength({ min: 2, max: 20 }).withMessage("2글자이상 20글자이하로 입력해주세요"),
        body('username').notEmpty().trim().isLength({ min: 2, max: 20 }).withMessage("2글자이상 20글자이하로 입력해주세요"),
        body('email').isEmail().withMessage("email 형식을 확인해주세요"),

        validate
    ];

const loginValidate =
    [
        body('id').notEmpty().trim().isLength({ min: 2, max: 10 }).withMessage("2글자이상 10글자이하로 입력해주세요").matches(/^[a-z0-9_-]/).withMessage("소문자 영문 및 숫자만 사용해주세요."),
        body('password').notEmpty().trim().isLength({ min: 2, max: 10 }).withMessage("2글자이상 10글자이하로 입력해주세요")
    ]



router.post('/login', loginValidate, authController.Login);

router.post('/signup', signupValidate, authController.createAccount);

router.get('/me', isAUth, authController.me);




export function checkId(req, res, next) {
    const id = /[^a-z0-9]/g;
    const check = id.exec(req);

    if (check) {
        return res.status(400).withmessage("영문과 숫자만 사용가능합니다.");

    }
    return next();

}


export default router;



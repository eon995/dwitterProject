import * as authRepository from '../Data/auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config.js';


export async function createAccount(req, res) {
    const { id, password, name, username, email } = req.body;


    const found
        = await authRepository.findOverlap(id, username, email);

    if (found) {
        return res.status(409).json({ message: `${found}가 이미 있습니다.` });
    }
    const hashed = bcrypt.hashSync(password, config.bcrypt.saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
        }

        // Store hash in your password DB.
    });

    console.log(hashed);

    const account = await authRepository.createAccount({ id, password: hashed, name, username, email });

    const token = await createJwtToken(account.id);

    console.log(token);

    return res.status(201).json({ token, account });

}





export async function Login(req, res) {
    const { id, password } = req.body;

    const hashed = authRepository.findPasswordById(id);

    if (!hashed) {
        res.status(400).json({ message: '존재하지 않는 id 입니다.' });
    }

    const check = await bcrypt.compare(password, hashed, function (err, result) {
        // result == true or false
    });

    if (check) {
        res.status(401).json({ message: '비밀번호가 틀렸습니다.' })
    }



    const token = await createJwtToken(id);



    return res.status(200).json({ token, message: ' 로그인 성공' });
}

async function createJwtToken(id) {
    console.log(config.jwt.secretKey);

    const token = jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec }, function (err, token) {
        if (err) {
            console.log(err);
        } else {
            console.log(token);
        }
    });

    return token;
}

export async function me(req, res, next) {
    const user = await authRepository.checkId(req.userId);
    if (!user) {
        return res.status(404).json({ message: '유저없음' });
    }
    res.status(200).json({ token: req.token, id: user.id })
}


// export async function findOverlap(id, username, email, res, next) {

//     const checkId = authRepository.checkId(id);
//     const checkUsername = authRepository.checkUsername(username);
//     const checkEmail = authRepository.checkEmail(email);

//     if (checkId) {
//         res.status(400).message("중복된 id가 이미 있습니다.");
//     }
//     // else if (checkUsername) {
//     //     res.status(409).message("중복된 username가 이미 있습니다.");
//     // } else if (checkEmail) {
//     //     res.status(409).message("중복된 email이 이미 있습니다.");
//     // }

//     return next();

// }

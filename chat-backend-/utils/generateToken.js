import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},"secretkey",{
        expiresIn: "15d"
    })
    res.cookie("jwtToken",token,{
        maxAge: 15*24*60*60*1000,
        secure: true,
    })
    return token;
}

export default generateTokenAndSetCookie;
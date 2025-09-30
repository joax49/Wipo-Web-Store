import jwt from "jsonwebtoken";
export async function authController(req, res) {
    try {
        const { password } = req.body;
        console.log(password);
        if (password === process.env.ADMIN_KEY && typeof process.env.JWT_KEY === "string") {
            console.log(password);
            console.log(typeof password);
            console.log(process.env.ADMIN_KEY);
            const token = jwt.sign({ admin: true }, process.env.JWT_KEY, {
                expiresIn: "6h"
            });
            //Sending the token to the browser's cookie
            res
                .status(201)
                .cookie('access_token', token, {
                httpOnly: true, //Only accessile from the server
                sameSite: 'strict', //Only accessible from this domain
                maxAge: 6000 * 60 * 6 //Will only work for six hours
            })
                .send({ token });
        }
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=authController.js.map
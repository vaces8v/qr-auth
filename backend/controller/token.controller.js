import TokenModel from '../models/Token.js'

class TokenController {

   async generateToken(req, res) {
       const { token } = req.body;

       try {
           const newToken = await TokenModel.create({ token });
           res.status(201).send({ message: 'Token created', token: newToken.token });
       } catch (error) {
           res.status(400).send({ message: 'Error creating token', error });
       }
    }

    async authenticateToken(req, res) {
        const { token } = req.body;

        try {
            const existingToken = await TokenModel.findOne({ where: { token } });

            if (!existingToken) {
                return res.status(404).send({ message: 'Token not found' });
            }

            if (existingToken.isUsed) {
                return res.status(400).send({ message: 'Token already used' });
            }

            existingToken.isUsed = true;
            await existingToken.save();

            res.send({ success: existingToken });
        } catch (error) {
            res.status(500).send({ message: 'Error during authentication', error });
        }
    }

    async checkToken(req, res) {
        const { token } = req.body;

        try {
            const existingToken = await TokenModel.findOne({ where: { token } });

            if (!existingToken) {
                return res.status(404).send({ message: 'Token not found' });
            }

            if (existingToken.isUsed === true) {
                await TokenModel.destroy({ where: { token } });
                return res.status(200).send({ success: true });
            } else {
                return res.status(400).send({error:"Is not activate"})
            }

        } catch (e) {
            res.status(500).send({ error: 'Error during authentication', e });
        }
    }


}

export default new TokenController()
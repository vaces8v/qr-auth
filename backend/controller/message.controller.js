class Message {

		getMesseages(req, res) {
			res.status(200).json({
				message: "Hello test from 'API'"
			})
		}

}

export default new Message()
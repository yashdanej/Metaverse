const { messages } = require("../model/messages");

exports.addMessage = async (req, res) => {
    try {
        const {from, to, message} = req.body;
        const data = await messages.create({
            message: {text: message},
            users: [from, to],
            sender: from,
        });
        if(data) return res.json({msg: 'Message added successfully!!!'});
        return res.json({msg: 'Failed to add message to the database!!!'});
    } catch (error) {
        console.log(error);
    }
}

exports.getAllMessage = async (req, res) => {
    try {
        const { from, to } = req.body;
        console.log('From:', from);
        console.log('To:', to);

        const message = await messages.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 });

        console.log('Retrieved Messages:', message);

        const projectMessages = message.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                createdAt: msg.createdAt
            };
        });

        console.log('Project Messages:', projectMessages);

        res.json(projectMessages);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


const MessageModel = require("../model/MessageModel");
const messageModel = require("../model/MessageModel");



// module.exports.addMessage = async(req, res, next) => {
//     try {
//         const {from , to , message}=req.body;
//         const data = await MessageModel.create({
//             message:{text:message},
//             users:[from,to],
//             sender:from,
//         });
//         if(data) return res.json({msg:"Message added Successfully"});
//         return res.json({msg:"Failed to add Message to database"});
//     } catch (ex) {
//         next(ex);
//     }
// }

module.exports.addMessage = async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await MessageModel.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
  
      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  };

module.exports.getAllMessage = async(req, res, next) => {
try {
  const {from,to} = req.body;
  const messages= await messageModel.find({
    users:{
      $all: [from,to],
    },
  }).sort({updated:1});
  const projectMessages = messages.map((msg)=>{
    return{
      fromSelf:msg.sender.toString()===from,
      message:msg.message.text,
    }
  });
  res.json(projectMessages);
} catch (ex) {
  next(ex);
}

};
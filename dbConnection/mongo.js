const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true'

mongoose.connect(connectionURL, {useNewUrlParser: true}).then(() => {
    console.log('Connection successful!')
}).catch((e) => {
    console.log('Connection error: ', e)
})
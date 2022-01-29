const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeEach((done) => {
    mongoose.connect("mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
});

test('Successful request', async () => {
    const response = await request(app).post('/record/fetch').send({
        "startDate": "2016-12-12",
        "endDate": "2016-12-13",
        "minCount": 153,
        "maxCount": 153
    }).expect(200)
    expect(response.body).toEqual({
        code: 0,
        msg: "Success",
        records: [
            {
                key: "vFxMiAmY",
                createdAt: "2016-12-12T16:53:02.506Z",
                totalCount: 153
            }
        ]
    })
})


test('Missing parameters', async () => {
    const response = await request(app).post('/record/fetch').send({
    }).expect(400)

    expect(response.body.code).toEqual(1)
})

test('Missing parameter - maxCount', async () => {
    const response = await request(app).post('/record/fetch').send({
        "startDate": "2016-12-12",
        "endDate": "2016-12-13",
        "minCount": 153
    }).expect(400)

    expect(response.body.code).toEqual(1)
})

test('Missing parameter - minCount', async () => {
    const response = await request(app).post('/record/fetch').send({
        "startDate": "2016-12-12",
        "endDate": "2016-12-13",
        "maxCount": 153
    }).expect(400)

    expect(response.body.code).toEqual(1)

})

test('Missing parameter - startDate', async () => {
    const response = await request(app).post('/record/fetch').send({
        "endDate": "2016-12-13",
        "minCount": 153,
        "maxCount": 1530
    }).expect(400)

    expect(response.body.code).toEqual(1)
})

test('Missing parameter - endDate', async () => {
    const response = await request(app).post('/record/fetch').send({
        "startDate": "2016-12-12",
        "minCount": 153,
        "maxCount": 1530
    }).expect(400)

    expect(response.body.code).toEqual(1)
})

test('Wrong type of parameters -', async () => {
    const response = await request(app).post('/record/fetch').send({
        "startDate": 155,
        "endDate": "2016-12-13",
        "minCount": "abc",
        "maxCount": 1530
    }).expect(400)

    expect(response.body.code).toEqual(1)
})
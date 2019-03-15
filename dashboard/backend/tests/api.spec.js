const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const config = require('../config/config.json')['testing'];
const Click = require('../models/click.js');

const expect = chai.expect;

mongoose.connect(config.db.host, {useNewUrlParser: true});

chai.use(chaiHttp);

describe('Backend api routes', () => {

    const click1 = {
        "pageX" : 556,
        "pageY" : 490
    };
    const click2 = {
        "pageX" : 556,
        "pageY" : 490
    };
    const click3 = {
        "pageX" : 572,
        "pageY" : 490
    };

    const click4 = {
        "pageX" : 779,
        "pageY" : 1349
    };
    const click5 = {
        "pageX" : 527,
        "pageY" : 1329
    };

    describe('/click/count route', () => {

        it('should return 0 clicks if Click collection is empty', (done) => {

            Click.deleteMany({}, (err) => {
                chai.request(config.api.url)
                    .get('/click/count')
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.deep.equal({count: 0});
                        done();
                    });
            });

        });

        it('should return 3 clicks if we send 3 clicks', (done) => {

            sendClick(click1).then(() => {
                sendClick(click2).then(() => {
                    sendClick(click3).then(() => {
                        chai.request('http://localhost:3000')
                            .get('/click/count')
                            .end((err, res) => {
                                expect(err).to.be.null;
                                expect(res).to.have.status(200);
                                expect(res.body).to.deep.equal({count: 3});
                                done();
                            });
                    });
                });
            });


        });

        it('should return 5 clicks if we send 2 more clicks', (done) => {

            sendClick(click4).then(() => {
                sendClick(click5).then(() => {
                    chai.request('http://localhost:3000')
                        .get('/click/count')
                        .end((err, res) => {
                            expect(err).to.be.null;
                            expect(res).to.have.status(200);
                            expect(res.body).to.deep.equal({count: 5});
                            done();
                        });
                });
            });


        });

    });

    describe('/click/aggregate route', () => {

        it('should return a list of length 1 if clicks have the same timestamp', (done) => {

            chai.request(config.api.url)
                .get('/click/aggregate')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').that.is.lengthOf(1);
                    done();
                });

        });

    });

    describe('/click/heatmap route', () => {

        it('should return a list of 5 clicks', (done) => {

            chai.request(config.api.url)
                .get('/click/heatmap')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array').that.is.lengthOf(5);
                    expect(res.body).to.deep.equal([click1, click2, click3, click4, click5].map(click => {
                        return {x: click.pageX, y: click.pageY, value: 100}
                    }));
                    done();
                });

        });

    });

});

function sendClick(click) {
    return chai.request(config.api.url)
        .post('/click')
        .send(click);
}
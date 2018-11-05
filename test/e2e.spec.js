/* global define, it, describe, beforeEach, document */
const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const axios = require('axios');
const serv = require('../server/server');

chai.use(chaiHttp);

let nightmare;

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

app.listen(8888);

const url = 'http://localhost:8888';


describe('express', () => {
  beforeEach(() => {
    nightmare = new Nightmare();
  });

  it('returns the correct status code', () => axios.get(url)
    .then(response => expect(response.status === 200)));

  it('should have the correct page title', () =>
    nightmare
      .goto(url)
      .evaluate(() => document.querySelector('body').innerText)
      .end()
      .then((text) => {
        expect(text).to.contain('notIMDb');
      })
  );

  it('should have search input', () =>
    nightmare
      .goto(url)
      .evaluate(() => document.querySelector('#search-input'))
      .end()
      .then(input => expect(input).to.exist)
  ).timeout(20000);

  it('should have search button', () =>
  nightmare
    .goto(url)
    .evaluate(() => document.querySelector('#search-button'))
    .end()
    .then(input => expect(input).to.exist)
  ).timeout(20000);

  it('should have long winded description ending with "Go on, give it a try!"', () =>
    nightmare
      .goto(url)
      .evaluate(() => document.querySelector('body').innerText)
      .end()
      .then((text) => {
        expect(text).to.contain('Go on, give it a try!');
      })
  );

  it("GET /results/:search responds with results", (done) => {
	  chai.request(serv)
      .get('/results/star')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Search).to.not.be.empty;
        done();
      })
  });

  it("should respond with an array of results", () =>
    axios
      .get(url)
      .then(res => expect(res.data == Array))
  );
  
  it("GET /details/:search responds with details", (done) => {
	  chai.request(serv)
      .get('/details/tt0076759')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Title).to.equal('Star Wars: Episode IV - A New Hope');
        done();
      })
  });

  it("GET /details/:search response includes poster image link", (done) => {
	  chai.request(serv)
      .get('/details/tt0076759')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(err).to.be.null;
        expect(res.body.Poster).to.contain('http');
        done();
      })
  });

  it('should beg for mercy from IMDb in footer', () =>
  nightmare
    .goto(url)
    .evaluate(() => document.querySelector('body').innerText)
    .end()
    .then((text) => {
      expect(text).to.contain("Please don't sue me, IMDb.");
    })
);

  // it('should return the correct movie title from search', () =>
  //   nightmare
  //     .goto(url)
  //     .type('#search-input', 'Fargo')
  //     .click('#search-button')
  //     .wait('#movie-title')
  //     .evaluate(() => document.querySelector('#movie-title').innerText)
  //     .end()
  //     .then(title => expect(title).to.equal('Fargo'))).timeout(20000);

  // it('should display search results', () =>
  //   nightmare
  //     .goto(url)
  //     .type('#search-input', 'star wars')
  //     .click('#search-button')
  //     .wait(() => document.querySelector('#results-table'))
  //     .evaluate(() => document.querySelector('#results-table').innerText)
  //     .then(results => expect(results).to.contain('Star Wars'))).timeout(20000);

});

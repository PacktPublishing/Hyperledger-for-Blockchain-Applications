'use strict';

const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const { BusinessNetworkDefinition, CertificateUtil, IdCard } = require('composer-common');

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const chai = require('chai');
const expect = chai.expect;
const dirtyChai = require('dirty-chai');
chai.use(dirtyChai);

const namespace = 'org.landreg';
const adminUserName = 'admin';
const adminEnrollmentSecret = 'adminpw';

const fixtures = yaml.safeLoad(fs.readFileSync(__dirname + '/fixtures.yml', 'utf8'));

describe('Unit tests', () => {

    describe('Individual', () => {

        it('should create several individuals');
    });

    describe('LandTitle', () => {

        it('should create several landTitles');

        describe('unlockLandTitle', () => {

            it('should unlock locked landTitle');

            it('should not unlock unlocked landTitle');
        });

        describe('transferLandTitle', () => {

            it('should not transfer landTitle when newOwner is equal to current owner');

            it('should transfer unlocked landTitle');

            it('should not transfer locked landTitle');
        });
    });

    describe('Query', () => {

        it('should list ListLandTitlesBySize, and correctly filter by maximumArea');
    });
});

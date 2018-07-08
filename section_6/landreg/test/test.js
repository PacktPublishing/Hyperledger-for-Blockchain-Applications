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

# Test Harness for Todo App

This is Automated Test Harness for the [Todo App](https://github.com/airtasker/quality-tech-challenge). It includes tests for both the Backend REST API and the Frontend GUI.

## Setup

### Prerequisites

You'll need to have Node.js installed to run this code. If you don't have it installed, [download and install](https://nodejs.org/en/download/) from the Node.js website. 

### Installation

To download this repo and install the required dependencies, open up the terminal, and run the following commands:

```
git clone https://github.com/qaiser110/quality-tech-challenge-tests.git

cd quality-tech-challenge-tests && npm i
```  

## Running the tests

### Prerequisites

Since this test harness is testing the Todo App, you'll need to have the Todo App running or deployed somewhere when running these test. If you don't have it installed, look at the [Todo App repository](https://github.com/airtasker/quality-tech-challenge) for instructions.

Once you have the Todo App running, you can run the tests in multiple ways mentioned in the next few sections. 

**NOTE:** To run any of the commands below, you need to open up the terminal and go into the directory where this repo is installed

### Run API and UI tests

The following command will run both the API tests and the UI tests, and then open the test report for both tests:

```
npm run test
```  

### Running the API tests

To run only the API tests, run the following command:

```
npm run test:api
```  

To run the API tests, and keep watch for any changes (re-running the API tests on code change):

```
npm run test:api:watch
```  

### Running the UI tests

To run only the UI tests, run the following command:

```
npm run test:e2e:report
```  

To run the API tests, and keep watch for any changes (re-running the UI tests on code change):

```
npm run test:e2e:watch
```  


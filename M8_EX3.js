class Client {
  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
  }
}

class ClientRepository {
  constructor() {
    this.clientList = [];
    this.accountList = [];
  }
  saveClient(client) {
    this.clientList.push(client);
  }
  saveAccount(account) {
    this.accountList.push(account);
  }

  findClient(clientName, clientLastName) {
    let i = 0;
    let clientFound;

    while (i < this.clientList.length) {
      if (
        this.clientList[i].name === clientName &&
        this.clientList[i].lastName === clientLastName
      )
        clientFound = this.clientList[i];

      i++;
    }
    return clientFound;
  }
  findAccount(clientName, clientLastName) {
    let i = 0;
    let accountFound;

    while (i < this.accountList.length) {
      if (
        this.accountList[i].name === clientName &&
        this.accountList[i].lastName === clientLastName
      )
        accountFound = this.accountList[i];

      i++;
    }
    return accountFound;
  }
}

class Account {
  constructor(name, lastName, accountNumber) {
    this.name = name;
    this.lastName = lastName;
    this.accountNumber = accountNumber;
    this.accountBalance = 0;
  }
  makeDeposit(deposit) {
    this.accountBalance += deposit;
  }
  makeWithdrawal(withdrawal) {
    this.accountBalance -= withdrawal;
  }

  showAccountNumber() {
    alert(`La cuenta creada tiene por número ${this.accountNumber}`);
  }
}

let clientRepository = new ClientRepository();
let id = 0;

function addClient() {
  let clientName = document.getElementById("name").value;
  let clientLastName = document.getElementById("lastName").value;
  const client = new Client(clientName, clientLastName);
  clientRepository.saveClient(client);
  console.log(clientRepository);
}

function removeClient() {
  let clientName = document.getElementById("name").value;
  let clientLastName = document.getElementById("lastName").value;

  let indexClient = 0;
  let clientExist;
  while (
    indexClient < clientRepository.clientList.length &&
    clientExist === undefined
  ) {
    if (
      clientRepository.clientList[indexClient].name == clientName &&
      clientRepository.clientList[indexClient].lastName == clientLastName
    ) {
      clientExist = clientRepository.clientList[indexClient];
      clientRepository.clientList.splice(indexClient, 1);
    }
    indexClient++;
  }

  let indexAccount = 0;
  let accountExist;
  while (
    indexAccount < clientRepository.accountList.length &&
    accountExist === undefined
  ) {
    if (
      clientRepository.accountList[indexAccount].name == clientName &&
      clientRepository.accountList[indexAccount].lastName == clientLastName
    ) {
      accountExist = clientRepository.accountList[indexAccount];
      clientRepository.accountList.splice(indexAccount, 1);
    }
    indexAccount++;
  }

  return clientExist
    ? alert(`el cliente ha sido eliminado `)
    : alert(`el cliente NO se encuentra en la base de datos`);
}
function addAccount() {
  let clientName = document.getElementById("name").value;
  let clientLastName = document.getElementById("lastName").value;
  const clientExist = clientRepository.findClient(clientName, clientLastName);
  if (clientExist) {
    let account = new Account(clientName, clientLastName, id);
    clientRepository.saveAccount(account);
    account.showAccountNumber();
    id++;
  }
  if (!clientExist)
    return alert(`el cliente no existe, no es posible crear una cuenta`);
  console.log(clientRepository);
}

function addMoney() {
  let clientName = document.getElementById("name").value;
  let clientLastName = document.getElementById("lastName").value;
  let euros =parseFloat(document.getElementById("euros").value)
  const accountExist = clientRepository.findAccount(clientName, clientLastName);
  if (accountExist) {
    accountExist.makeDeposit(euros);
  }
  if (!accountExist) {
    return alert(`No hay cuenta asociada para realizar esta operacion`);
    
  }
  console.log(clientRepository);
}

function extractMoney() {
    let clientName = document.getElementById("name").value;
    let clientLastName = document.getElementById("lastName").value;
    let euros =parseFloat(document.getElementById("euros").value)
    const accountExist = clientRepository.findAccount(clientName, clientLastName);
    if (accountExist) {
      accountExist.makeWithdrawal(euros);
    }
    if (!accountExist) {
      return alert(`No hay cuenta asociada para realizar esta operacion`);
      
    }
    console.log(clientRepository);
  }

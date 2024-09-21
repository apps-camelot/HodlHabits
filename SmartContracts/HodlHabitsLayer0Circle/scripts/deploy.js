// scripts/deploy.js
async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const MyOApp = await ethers.getContractFactory("MyOApp");
    const myOApp = await MyOApp.deploy();
  
    console.log("HodlHabit myOApp contract deployed to address:", myOApp.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  
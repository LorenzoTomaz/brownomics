const { expect } = require("chai");
import { ethers } from "hardhat";

describe("ModelMarketplace", function () {
  let ModelMarketplace;
  let owner: any;
  let marketplaceOwner: any;
  let endUser: any;
  let modelMarketplace: any;

  beforeEach(async function () {
    [owner, marketplaceOwner, endUser] = await ethers.getSigners();

    ModelMarketplace = await ethers.getContractFactory(
      "ModelMarketplace",
      marketplaceOwner
    );
    await owner.sendTransaction({
      to: marketplaceOwner.address,
      value: ethers.parseEther("10.0"),
    });
    await owner.sendTransaction({
      to: endUser.address,
      value: ethers.parseEther("10.0"),
    });
    modelMarketplace = await ModelMarketplace.deploy();
    await modelMarketplace.waitForDeployment();
  });
  it("Should list all models available in the market place", async function () {
    const models = await modelMarketplace.getListedModels();
    expect(models.length).to.eq(1);
    const baseModelName = "Optimal control model";
    const baseModelPrice = ethers.parseEther("0.001");
    expect(models[0].name).to.equal(baseModelName);
    expect(models[0].price).to.equal(baseModelPrice);
  });
  it("Should add and purchase a model", async function () {
    const baseModelName = "Optimal control model";
    const baseModelId = 0;
    const baseModelPrice = ethers.parseEther("0.001");
    const modelName = "Sample Model";
    const modelId = 1;
    const modelPrice = ethers.parseEther("1.0");
    // Add a model
    await modelMarketplace.addModel(modelName, modelPrice);
    const baseModel = await modelMarketplace.models(baseModelId);
    expect(baseModel.name).to.equal(baseModelName);
    expect(baseModel.price).to.equal(baseModelPrice);
    const model = await modelMarketplace.models(modelId);
    expect(model.name).to.equal(modelName);
    expect(model.price).to.equal(modelPrice);
    const marketplaceOwnerBalance = await ethers.provider.getBalance(
      marketplaceOwner.address
    );
    const endUserBalance = await ethers.provider.getBalance(endUser.address);
    // Purchase the model
    const initialBalance = await ethers.provider.getBalance(endUser.address);
    await modelMarketplace
      .connect(endUser)
      .purchaseModel(modelId, { value: modelPrice });
    await modelMarketplace
      .connect(endUser)
      .purchaseModel(baseModelId, { value: baseModelPrice });
    const userModels = await modelMarketplace.listUserModels(endUser.address);
    expect(userModels.length).to.eq(2);
    const user1OwnsModel = await modelMarketplace.userHasModel(
      endUser.address,
      modelId
    );
    expect(user1OwnsModel).to.equal(true);

    // Check user2's balance after the purchase
    const finalEndUserBalance = await ethers.provider.getBalance(
      endUser.address
    );
    expect(finalEndUserBalance).to.lt(endUserBalance);
    const finalMarketplaceOwnerBalance = await ethers.provider.getBalance(
      marketplaceOwner.address
    );
    expect(finalMarketplaceOwnerBalance).to.gt(marketplaceOwnerBalance);
  });
  it("Should add, purchase a model and list all models", async function () {
    const baseModelName = "Optimal control model";
    const baseModelId = 0;
    const baseModelPrice = ethers.parseEther("0.001");
    const modelName = "Sample Model";
    const modelName2 = "Sample Model2";
    const modelPrice = ethers.parseEther("1.0");

    // Add a model
    await modelMarketplace.addModel(modelName, modelPrice);
    await modelMarketplace.addModel(modelName2, modelPrice);
    const baseModel = await modelMarketplace.models(baseModelId);
    expect(baseModel.name).to.equal(baseModelName);
    expect(baseModel.price).to.equal(baseModelPrice);
    const model = await modelMarketplace.models(1);
    expect(model.name).to.equal(modelName);
    expect(model.price).to.equal(modelPrice);
    const marketplaceOwnerBalance = await ethers.provider.getBalance(
      marketplaceOwner.address
    );
    const endUserBalance = await ethers.provider.getBalance(endUser.address);
    // Purchase the model
    await modelMarketplace
      .connect(endUser)
      .purchaseModel(1, { value: modelPrice });
    await modelMarketplace
      .connect(endUser)
      .purchaseModel(0, { value: modelPrice });

    // Check ownership
    const userModels = await modelMarketplace.listUserModels(endUser.address);
    expect(userModels.length).to.eq(2);

    // Check user2's balance after the purchase
    const finalEndUserBalance = await ethers.provider.getBalance(
      endUser.address
    );
    expect(finalEndUserBalance).to.lt(endUserBalance);
    const finalMarketplaceOwnerBalance = await ethers.provider.getBalance(
      marketplaceOwner.address
    );
    expect(finalMarketplaceOwnerBalance).to.gt(marketplaceOwnerBalance);
  });
});

import { BigInt } from "@graphprotocol/graph-ts"
import { Factory, Abc, CreateNewCampaign } from "../generated/Factory/Factory"
import {MultipleCampaign} from "../generated/templates/Campaign/Campaign"
import { ExampleEntity, AbcEntity, CreateNewCampaignEntity, MultipleCampaignEntity } from "../generated/schema"
import {Campaign} from "../generated/templates";

export function handleAbc(event: Abc): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = AbcEntity.load(event.transaction.hash.toHex()+event.block.number.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new AbcEntity(event.transaction.hash.toHex()+event.block.number.toHex())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.length = event.params.length

  // Entity fields can be set based on event parameters
  // entity.length = event.params.length

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.abc(...)
  // - contract.count(...)
  // - contract.deployedCampaign(...)
}

export function handleCreateNewCampaign(event: CreateNewCampaign): void {
  Campaign.create(event.params.campaign)
  let entity = CreateNewCampaignEntity.load(event.transaction.hash.toHex()+event.block.number.toHex())
  if(!entity){
    entity = new CreateNewCampaignEntity(event.transaction.hash.toHex()+event.block.number.toHex())
  }
  entity.aNumber = event.params.aNumber
  entity.bAddress = event.params.bAddress
  entity.campaign = event.params.campaign
  entity.save()
}

export function handleMultipleCampaign(event: MultipleCampaign): void {
  let entity = MultipleCampaignEntity.load(event.transaction.hash.toHex()+event.block.number.toHex())
  // let entity = MultipleCampaignEntity.load(event.address.toHex())
  if(!entity){
    entity = new MultipleCampaignEntity(event.transaction.hash.toHex()+event.block.number.toHex())
    // entity = new MultipleCampaignEntity(event.address.toHex())
  }
  entity.aNumber = event.params.aNumber
  entity.kNumber = event.params.kNumber
  entity.resNumber = event.params.resNumber
  entity.save()
}


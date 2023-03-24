import { NFTMarket, NFTTransfer } from "../generated/NFTMarket/NFTMarket";
import { NFT } from "../generated/schema";

export function handleNFTTransfer(event: NFTTransfer): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let nft = new NFT(event.params.tokenID.toString());
  nft.to = event.params.to;
  nft.from = event.params.from;
  nft.price = event.params.price;

  const nftMatket = NFTMarket.bind(event.address);
  const tokenURI = nftMatket.tokenURI(event.params.tokenID);
  nft.tokenURI = tokenURI;
  // Entities can be written to the store with `.save()`
  nft.save();

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
  // - contract.balanceOf(...)
  // - contract.getApproved(...)
  // - contract.isApprovedForAll(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.ownerOf(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenURI(...)
}

// export function handleApprovalForAll(event: ApprovalForAll): void {}

// export function handleNFTTransfer(event: NFTTransfer): void {}

// export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

// export function handleTransfer(event: Transfer): void {}
